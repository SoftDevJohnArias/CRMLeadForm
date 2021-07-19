using CRMLeadFormLogin.Controllers;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRMLeadObjects.Controllers.Lead
{

  public class LeadRegisterController : MainController
  {
   // GET: Lead
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult LeadXUS()
    {
      return View("LeadXUS");
    }
  }
}