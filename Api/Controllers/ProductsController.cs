using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(
        IGenericRepository<Product> productsRepository,
        IGenericRepository<ProductBrand> productBrandsRepository,
        IGenericRepository<ProductType> productTypesRepository
    ) : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepository = productsRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepository = productBrandsRepository;
        private readonly IGenericRepository<ProductType> _productTypesRepository = productTypesRepository;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productsRepository.ListAsync(spec);
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepository.GetEntityWithSpec(spec);
            return Ok(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
            => Ok(await _productBrandsRepository.ListAllAsync());


        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
            => Ok(await _productTypesRepository.ListAllAsync());

    }
}
