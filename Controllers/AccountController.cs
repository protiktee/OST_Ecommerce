using Microsoft.AspNetCore.Mvc;

namespace OST_Ecommerce.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }


        public IActionResult Dashboard()
        {
            return View();
        }
        

    }
}
