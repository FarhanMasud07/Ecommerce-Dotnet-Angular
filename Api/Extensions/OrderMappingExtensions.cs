using Api.Dtos;
using Core.Entities.OrderAggregate;

namespace Api.Extensions
{
    public static class OrderMappingExtensions
    {
        public static OrderToReturnDto ToDto(this Order order)
        {
            return new OrderToReturnDto
            {
                Id = order.Id,
                BuyerEmail = order.BuyerEmail,
                OrderDate = order.OrderDate,
                ShipToAddress = order.ShipToAddress,
                DeliveryMethod = order.DeliveryMethod.Description,
                ShippingPrice = order.DeliveryMethod.Price,
                OrderItems = order.OrderItems.Select(x => x.ToDto()).ToList(),
                Subtotal = order.Subtotal,
                Total = order.GetTotal(),
                Status = order.Status.ToString(),
            };
        }

        public static OrderItemDto ToDto(this OrderItem orderItem)
        {
            return new OrderItemDto
            {
                ProductId = orderItem.ItemOrdered.ProductItemId,
                ProductName = orderItem.ItemOrdered.ProductName,
                PictureUrl = orderItem.ItemOrdered.PictureUrl,
                Price = orderItem.Price,
                Quantity = orderItem.Quantity
            };
        }
    }

}
