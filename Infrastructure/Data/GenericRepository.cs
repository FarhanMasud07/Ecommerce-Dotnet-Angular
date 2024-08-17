using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T>(
        StoreContext context    
    ) : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context = context;

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync( id );
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
           return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityWithSpec(ISpacification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        public async Task<IReadOnlyList<T>> ListAsync(ISpacification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        public async Task<int> CountAsync(ISpacification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        private IQueryable<T> ApplySpecification(ISpacification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}
