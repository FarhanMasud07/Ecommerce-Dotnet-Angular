using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.SeedData;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(op => 
    op.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));   // lifetime of this scope of the http request as an http request comes in, it goes to our controller or whatever we're injecting the service into. and then it creates a new intance of this service. once the request is finished, the class that's using the service is disposed of, and also the service will be disposable as well
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());   // this will go ahed and look inside our current domain assemnbly . And register the mapping profiles when our application starts up.


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
}catch(Exception ex)
{
    logger.LogError(ex, "An error occured during migration");
}

app.Run();
