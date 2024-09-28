using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Issuing;

namespace Infrastructure.Services
{
    public class PaymentService(
        IBasketRepository basketRepository,
        IUnitOfWork unitOfWork,
        IConfiguration configuration
    ) : IPaymentService
    {
        private readonly IBasketRepository _basketRepository = basketRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IConfiguration _configuration = configuration;

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);

            if (basket == null) return null;

            var shippingPrice = await GetShippingPriceAsync(basket) ?? 0;

            foreach(var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Core.Entities.Product>()
                                .GetByIdAsync(item.Id) ?? throw new Exception("Problem getting product in basket");
                if(item.Price != productItem.Price)
                {
                    item.Price = productItem.Price;
                }
            }

            var subtotal = CalculateSubtotal(basket);

            if (basket.Coupon != null)
            {
                subtotal = await ApplyDiscountAsync(basket.Coupon, subtotal);
            }

            var total = subtotal + shippingPrice;

            var service = new PaymentIntentService();

            PaymentIntent intent;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = total,
                    Currency = "usd",
                    PaymentMethodTypes = ["card"]
                };
                intent = await service.CreateAsync(options);
                basket.PaymentIntentId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            } 
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = total,
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }

            await _basketRepository.UpdateBasketAsync(basket);
            return basket;

        }

        private async Task<long?> GetShippingPriceAsync(CustomerBasket basket)
        {
            if (basket.DeliveryMetodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>()
                                      .GetByIdAsync((int)basket.DeliveryMetodId)
                                           ?? throw new Exception("Problem with delivery method");

                return (long)deliveryMethod.Price * 100;
            }

            return null;
        }

        private async Task<long> ApplyDiscountAsync(AppCoupon appCoupon, long amount)
        {
            var couponService = new Stripe.CouponService();

            var coupon = await couponService.GetAsync(appCoupon.CouponId);

            if(coupon.AmountOff.HasValue)
            {
                amount -= (long)coupon.AmountOff * 100;
            }

            if(coupon.PercentOff.HasValue)
            {
                var discount = amount * (coupon.PercentOff.Value / 100);
                amount -= (long)discount;
            }

            return amount;
        }

        private long CalculateSubtotal(CustomerBasket basket)
        {
            return (long)basket.Items.Sum(
                i => i.Quantity * (i.Price * 100)
            );
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            order.Status = OrderStatus.PaymentFailed;
            await _unitOfWork.Complete();

            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId, long intentAmount)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            var orderTotalInCents = (long)Math.Round(
                order.GetTotal() * 100, 
                MidpointRounding.AwayFromZero
            );

            if(orderTotalInCents != intentAmount)
            {
                order.Status = OrderStatus.PaymentMismatch;

            } else
            {
                order.Status = OrderStatus.PaymentReceived;
            }

            await _unitOfWork.Complete();

            return order;
        }
    }
}
