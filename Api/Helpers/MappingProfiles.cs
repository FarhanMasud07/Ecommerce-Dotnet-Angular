using Api.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

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
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}
