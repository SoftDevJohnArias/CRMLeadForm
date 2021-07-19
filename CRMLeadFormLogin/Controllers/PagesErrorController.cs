using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRMLeadFormLogin.Controllers
{
    public class PagesErrorController : Controller
    {
        // GET: PagesError
        public ActionResult Error404()
        {
            return View();
        }        
    }
}
