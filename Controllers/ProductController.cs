using Microsoft.AspNetCore.Mvc;

namespace OST_Ecommerce.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Checkout()
        {
            return View();
        }
    }
}
