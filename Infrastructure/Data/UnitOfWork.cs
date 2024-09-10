using Core.Entities;
using Core.Interfaces;
using System.Collections;

namespace Infrastructure.Data
{
    public class UnitOfWork(StoreContext storeContext): IUnitOfWork
    {
        private readonly StoreContext _storeContext = storeContext;

        private Hashtable _repositories;
        public async Task<int> Complete()
        {
            return await _storeContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _storeContext.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            _repositories ??= [];
            var type = typeof(TEntity).Name;
            if(!_repositories.ContainsKey(type)) 
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(
                    repositoryType.MakeGenericType(typeof(TEntity)),
                    _storeContext
                );
                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>)_repositories[type];
        }
    }
}
