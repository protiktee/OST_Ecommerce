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
            List<Account> lstUsers = Account.ListUsers();
            bool status = false;
            Account objModel = new Account();
            foreach (Account obj in lstUsers)
            {
                if (!status) 
                {
                    if (ModelAccount.UserName == obj.UserName && ModelAccount.Password == obj.Password)
                    {
                        objModel = obj;
                        status = true;
                    }
                }
                
            }
            if (status)
            {
                return Ok(new { LoginStatus = 1, Msg = "Successfully Authorized",data= objModel });
            }
            else
                return Unauthorized(new { LoginStatus = 0, Message = "Unauth access",data = objModel });
        }
    }
}
