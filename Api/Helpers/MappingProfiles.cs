using Api.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Api.Helpers
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(destination => destination.ProductBrand, o => o.MapFrom(source => source.ProductBrand.Name))
                .ForMember(destination => destination.ProductType, o => o.MapFrom(source => source.ProductType.Name))
                .ForMember(destination => destination.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(destination => destination.DeliveryMethod, o => o.MapFrom(source => source.DeliveryMethod.ShortName))
                .ForMember(destination => destination.ShippingPrice, o => o.MapFrom(source => source.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(destination => destination.ProductId, o => o.MapFrom(source => source.ItemOrdered.ProductItemId))
                .ForMember(destination => destination.ProductName, o => o.MapFrom(source => source.ItemOrdered.ProductName))
                .ForMember(destination => destination.PictureUrl, o => o.MapFrom(source => source.ItemOrdered.PictureUrl))
                .ForMember(destination => destination.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());

        }
    }
}
