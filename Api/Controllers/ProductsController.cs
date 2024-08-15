using Api.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(
        IMapper mapper,
        IGenericRepository<Product> productsRepository,
        IGenericRepository<ProductType> productTypesRepository,
        IGenericRepository<ProductBrand> productBrandsRepository
    ) : ControllerBase
    {
        private readonly IMapper _mapper = mapper;
        private readonly IGenericRepository<Product> _productsRepository = productsRepository;
        private readonly IGenericRepository<ProductType> _productTypesRepository = productTypesRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepository = productBrandsRepository;

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await _productsRepository.ListAsync(spec);

            return  Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
      
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _productsRepository.GetEntityWithSpec(spec);

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
            => Ok(await _productBrandsRepository.ListAllAsync());


        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
            => Ok(await _productTypesRepository.ListAllAsync());

    }
}
