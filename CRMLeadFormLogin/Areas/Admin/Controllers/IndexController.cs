using CRMLeadFormLogin.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRMLeadFormLogin.Areas.Admin.Controllers
{
    public class IndexController : MainController
    {
        // GET: Admin/Index
        public ActionResult Index()
        {
            return View();
        }
    }
}