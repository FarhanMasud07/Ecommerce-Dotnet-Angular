using Api.Dtos;
using AutoMapper;
using Core.Entities;

namespace Api.Helpers
{
    public class ProductUrlResolver(
        IConfiguration configuration   
    ) : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _configuration = configuration;

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _configuration["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
