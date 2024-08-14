using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpacification<T>
    {
        public BaseSpecification()
        {
                
        }

        public BaseSpecification(Expression<Func<T, bool>> critaria)
        {
                Criteria = critaria;
        }
        public Expression<Func<T, bool>> Criteria { get; }

        public List<Expression<Func<T, object>>> Includes { get; } = [];

        protected void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }
    }
}
