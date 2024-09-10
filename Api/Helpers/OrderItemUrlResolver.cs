using Api.Dtos;
using AutoMapper;
using Core.Entities.OrderAggregate;

namespace Api.Helpers
{
    public class OrderItemUrlResolver(
        IConfiguration configuration
    ) : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _configuration = configuration;
        public string Resolve(
            OrderItem source,
            OrderItemDto destination,
            string destMember, 
            ResolutionContext context
        )
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return _configuration["ApiUrl"] + source.ItemOrdered.PictureUrl;
            }

            return null;
        }
    }
}
