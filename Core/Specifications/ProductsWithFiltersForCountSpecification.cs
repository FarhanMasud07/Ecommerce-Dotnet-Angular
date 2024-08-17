using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams)
            : base(p => (string.IsNullOrEmpty(productSpecParams.Search) || p.Name.ToLower().Contains(productSpecParams.Search)) && 
                        (!productSpecParams.BrandId.HasValue || p.ProductBrandId == productSpecParams.BrandId) &&
                        (!productSpecParams.TypeId.HasValue || p.ProductTypeId == productSpecParams.TypeId)
        )
        {
                
        }
    }
}
