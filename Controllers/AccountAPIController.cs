using Microsoft.AspNetCore.Mvc;
using OST_Ecommerce.Models;

namespace OST_Ecommerce.Controllers
{
    public class AccountAPIController : Controller
    {
        //AccountAPI/VerifyUser?UserName=protik&Password=123456
        [HttpPost]
        public IActionResult VerifyUser(Account ModelAccount)
        {
            if (ModelAccount.UserName == "protik" && ModelAccount.Password == "123456")
            {
                return Ok("Successfully Authorized");
            }
            else
                return Unauthorized(new { Message = "Unauth access" });
            
        }
    }
}
