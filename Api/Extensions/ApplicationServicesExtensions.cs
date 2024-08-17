using Api.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<StoreContext>(op =>
                op.UseSqlite(config.GetConnectionString("DefaultConnection"))
            );


            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));   // lifetime of this scope of the http request as an http request comes in, it goes to our controller or whatever we're injecting the service into. and then it creates a new intance of this service. once the request is finished, the class that's using the service is disposed of, and also the service will be disposable as well
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());   // this will go ahead and look inside our current domain assemnbly . And register the mapping profiles when our application starts up.
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionCotext =>
                {
                    var errors = actionCotext.ModelState
                                .Where(e => e.Value.Errors.Count > 0)
                                .SelectMany(x => x.Value.Errors)
                                .Select(x => x.ErrorMessage).ToArray();
                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            return services;
        }
    }
}
