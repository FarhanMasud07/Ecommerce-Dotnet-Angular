using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    // Fallback name much match to Fallback in program.cs
    public class FallbackController : Controller
    {
        public IActionResult Index() // Index name must match to Index in program.cs
        {
            return PhysicalFile(
                Path.Combine(
                    Directory.GetCurrentDirectory(), 
                    "wwwroot",
                    "index.html"
                )
                ,"text/HTML"
            );
        }
    }
}
