using Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace Api.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public List<BasketItemDto> Items { get; set; } = [];
        public int? DeliveryMetodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        public AppCoupon? Coupon { get; set; }
    }
}
