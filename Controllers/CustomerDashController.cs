using Microsoft.AspNetCore.Mvc;

namespace OST_Ecommerce.Controllers
{
	public class CustomerDashController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
