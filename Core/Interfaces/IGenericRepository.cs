using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity // here base entity beacuse only our entities can be used with our generic repository, if we attempted to use our products controller with this, then we would get an error
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpacification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpacification<T> spec);
    }
}
