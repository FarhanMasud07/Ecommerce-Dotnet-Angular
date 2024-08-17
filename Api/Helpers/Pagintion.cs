namespace Api.Helpers
{
    public class Pagintion<T>( 
        int pageIndex, 
        int pageSize, 
        int count,
        IReadOnlyList<T> data
    ) where T: class
    {
        public int PageSize { get; set; } = pageSize;
        public int PageItem { get; set; } = pageIndex;
        public int Count { get; set; } = count;
        public IReadOnlyList<T> Data { get; set; } = data;
    }
}
