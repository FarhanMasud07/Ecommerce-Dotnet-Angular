using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserdAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any(x => x.UserName == "admin@test.com"))
            {
                var user = new AppUser
                {
                    DisplayName = "admin",
                    UserName = "admin@test.com",
                    Email = "admin@test.com",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Street = "18/19 Gulshan",
                        City = "Dhaka",
                        State = "Dhaka",
                        Zipcode = "1209"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}
