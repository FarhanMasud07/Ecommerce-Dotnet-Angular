using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams)
            : base(p => (!productSpecParams.BrandId.HasValue || p.ProductBrandId == productSpecParams.BrandId) &&
                        (!productSpecParams.TypeId.HasValue || p.ProductTypeId == productSpecParams.TypeId)
        )
        {
                
        }
    }
}
