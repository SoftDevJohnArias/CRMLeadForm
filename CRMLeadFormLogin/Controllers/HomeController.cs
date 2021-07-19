using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using BLL;
using CRMLeadObjects.DTO.IWSPortal.NavigationMenu;
using CRMLeadObjects.DTO.Utils;

namespace CRMLeadFormLogin.Controllers
{
  public class HomeController : MainController
  {
    [Authorize]
    public ActionResult Index()
    {
      return View();
    }

    public ActionResult About()
    {
      ViewBag.Message = "Your application description page.";

      return View();
    }

    public ActionResult Contact()
    {
      ViewBag.Message = "Your contact page.";

      return View();
    }

    public ActionResult Diseno()
    {
      //ViewBag.Message = "Your contact page.";

      //return View();
      //   return  RedirectToAction((string)this.RouteData.Values["action"], (string)this.RouteData.Values["controller"]);
      //return RedirectToAction ("hola/EditEvent", new { id = 1 });
      try
      {
        //throw new HttpException(404, "Are you sure you're in the right place?");
        return View();

      }
      catch
      {
        throw;
      }
      // return HttpNotFound();
    }

    public ActionResult Orders()
    {
      return View();

    }

    //[OutputCache(CacheProfile = "CacheMenuLeft")] // Para las vistas parciales no admite OutputCache
    [OutputCache(Duration = 1200, VaryByParam = "lang")]
    public PartialViewResult NavigationMenu(string lang)
    {
      var menu = new NavigationMenuBLL().GetMenu(MenuType.NavigationMenu);
      //Session["menuOptions"] = menu;
      return PartialView("_NavigationMenu", menu);
    }

    public PartialViewResult AccountMenu()
    {
      var menu = new NavigationMenuBLL().GetMenu(MenuType.AccountMenu);
      return PartialView("_AccountMenu", menu);
    }


  }
}