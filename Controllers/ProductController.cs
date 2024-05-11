using Microsoft.AspNetCore.Mvc;
using OST_Ecommerce.Models;

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
        //public IActionResult SingleProduct()
        //{
        //    //if (Request.QueryString[""] != null)
        //    //{
        //    //    //ProductId = Convert.ToInt16(Request.QueryString["ProductID"]);
        //    //}
        //    ViewBag.ProductId = 0;
        //    return View();
        //}
        public IActionResult SingleProduct(int id)
        {
            //if (Request.QueryString[""] != null)
            //{
            //    //ProductId = Convert.ToInt16(Request.QueryString["ProductID"]);
            //}
            ViewBag.ProductId = id;
            return View();
        }
        public IActionResult CategoryProduct()
        {  
            return View();
        }
    }
}
