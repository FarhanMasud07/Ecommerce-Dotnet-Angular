﻿namespace Core.Entities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
            
        }

        public CustomerBasket(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = [];
        public int? DeliveryMetodId { get; set; }
        public string ClientSecret  { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
        public AppCoupon? Coupon { get; set; }
    }
}
