using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;

namespace Api.Helpers
{
    public class CachedAttribute(int timeToLiveSeconds) : Attribute, IAsyncActionFilter
    {
        private readonly int _timeToLiveSeconds = timeToLiveSeconds;

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheService =  context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();

            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);

            var cacheResponse = await cacheService.GetCachedResponse(cacheKey);

            if(!string.IsNullOrEmpty(cacheResponse))
            {
                var contentResult = new ContentResult 
                {
                    Content = cacheResponse,
                    ContentType = "application/json",
                    StatusCode = 200,
                };
                context.Result = contentResult;
                return;
            }

            var executedContext = await next(); // move to controller;

            if(executedContext.Result is OkObjectResult okObjectResult) 
            {
                await cacheService.CacheResponseAsync(
                    cacheKey, 
                    okObjectResult.Value,
                    TimeSpan.FromSeconds(_timeToLiveSeconds)
                );
            }
        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var keyBuilder = new StringBuilder();
            keyBuilder.Append($"{request.Path}");

            foreach ( var (key, value) in request.Query.OrderBy(x => x.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            }

            return keyBuilder.ToString();
        }
    }
}
