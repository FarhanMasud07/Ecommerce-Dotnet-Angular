using Api.Dtos;
using Api.Errors;
using Api.Extensions;
using Api.SignalR;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stripe;

namespace Api.Controllers
{
    public class PaymentsController(
        IPaymentService paymentService ,
        ILogger<PaymentsController> logger,
        IHubContext<NotificationHub> hubContext,
        IMapper mapper
    ) : BaseApiController
    {
        private readonly IMapper _mapper = mapper;
        private readonly ILogger<PaymentsController> _logger = logger;
        private readonly IPaymentService _paymentService = paymentService;
        private const string WhSecret = "whsec_072b61c7a91bf49565bf3ec7d3a56f09ce964406b90238aff387f2fe10f5e37a";

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400, "Probelm with your basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);
                await HandlePaymentIntent(stripeEvent);

                return Ok();
            }
            catch (StripeException ex)
            {
                logger.LogError(ex, "Stripe webhook error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An unexpected error occurred");
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred");
            }

        }

        private async Task HandlePaymentIntent(Event stripeEvent)
        {
            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded ", intent.Id);
                    // TODO: update the order wit new status
                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id, intent.Amount);

                    // connection to signalR
                    var connectionId = NotificationHub.GetConnectionIdByEmail(order.BuyerEmail);
                    if(!string.IsNullOrEmpty(connectionId))
                    {
                        
                        await hubContext.Clients.Client(connectionId)
                            .SendAsync("OrderCompleteNotification",order.ToDto());
                    }

                    _logger.LogInformation("Order updated to payment recieved ", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed ", intent.Id);
                    // TODO: update the order wit new status
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Order updated to payment failed ", order.Id);
                    break;
            }
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],WhSecret);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct stripe event");
                throw new StripeException("Invalid signature");
            }
        }
    }
}
