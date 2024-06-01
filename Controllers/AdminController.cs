using Microsoft.AspNetCore.Mvc;

namespace OST_Ecommerce.Controllers
{
	public class AdminController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
