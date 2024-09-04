using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserdAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Farhan",
                    Email = "farhan@test.com",
                    UserName = "farhan@test.com",
                    Address = new Address
                    {
                        FirstName = "Farhan",
                        LastName = "Masud",
                        Street = "18/19 Gulshan",
                        City = "Dhaka",
                        State = "Dhaka",
                        Zipcode = "1209"
                    }
                };

                await userManager.CreateAsync(user, "1qazZAQ!");
            }
        }
    }
}
