using Api.Dtos;
using Api.Errors;
using Api.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ProductsController(
        IMapper mapper,
        IGenericRepository<Product> productsRepository,
        IGenericRepository<ProductType> productTypesRepository,
        IGenericRepository<ProductBrand> productBrandsRepository
    ) : BaseApiController
    {
        private readonly IMapper _mapper = mapper;
        private readonly IGenericRepository<Product> _productsRepository = productsRepository;
        private readonly IGenericRepository<ProductType> _productTypesRepository = productTypesRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepository = productBrandsRepository;

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagintion<ProductToReturnDto>>> GetProducts(
            [FromQuery] ProductSpecParams productSpecParams
        )
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productSpecParams);
            
            var countSpec = new ProductsWithFiltersForCountSpecification(productSpecParams);

            var totalItems = await _productsRepository.CountAsync(countSpec);

            var products = await _productsRepository.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            
            return Ok(new Pagintion<ProductToReturnDto>(productSpecParams.PageIndex, productSpecParams.PageSize,totalItems,data));
      
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _productsRepository.GetEntityWithSpec(spec);

            if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
            => Ok(await _productBrandsRepository.ListAllAsync());

        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
            => Ok(await _productTypesRepository.ListAllAsync());

    }
}
