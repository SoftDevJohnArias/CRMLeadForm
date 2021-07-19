using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using CRMLeadFormLogin.ActionFilters;
using CRMLeadFormLogin.Models;
using System.Web.Routing;
using CRMLeadObjects.DTO.IWSPortal.NavigationMenu;
using BLL;
using CRMLeadObjects.DTO.Utils;

namespace CRMLeadFormLogin.Controllers
{
  [NoCacheAttribute()]
  public class MainController : Controller
  {
    protected override void OnActionExecuting(ActionExecutingContext filterContext)
    {
      //throw new HttpException(404, "Are you sure you're in the right place?");


      string controller = (string)this.RouteData.Values["controller"];
      string action = (string)this.RouteData.Values["action"];
      if (User.Identity.IsAuthenticated)
      {
        var menu = new NavigationMenuBLL().GetOptionsMenu(MenuType.NavigationMenu);
        if ((action != "Login" && controller != "Account") &&
            (action != "NavigationMenu" && controller != "Home"))
        {


          if (controller != "LeadRegister" && (menu.Where(x => x.Accion == action && x.Controlador == controller).Count() < 1))
          {
            filterContext.Result = RedirectToAction("Error404", "PageError");

            throw new HttpException(404, "Are you sure you're in the right place?");
          }
        }
      }

      if (!ValidarIdioma((string)this.RouteData.Values["language"]))
      {
        throw new HttpException(404, "Are you sure you're in the right place?");
        //filterContext.Result = new HttpStatusCodeResult(404);
      }
      else
      {
        MapaRutaURL ObjMapaRutaURL = new MapaRutaURL((string)this.RouteData.Values["language"], controller, action);

                GeneralSettings.setCulture(ObjMapaRutaURL.currentLanguageId);

                //CultureInfo culture = null;
                //switch (ObjMapaRutaURL.currentLanguageId)
                //{
                //  case "en":
                //    culture = CultureInfo.CreateSpecificCulture("en-US");
                //    break;
                //  case "pt":
                //    culture = CultureInfo.CreateSpecificCulture("pt-BR");
                //    break;
                //  default:
                //    culture = CultureInfo.CreateSpecificCulture("es-CO");
                //    break;
                //}
                //CultureInfo.DefaultThreadCurrentCulture = culture;
                //CultureInfo.DefaultThreadCurrentUICulture = culture;
                //Thread.CurrentThread.CurrentCulture = culture;
                //Thread.CurrentThread.CurrentUICulture = culture;
            }



    }

    public bool ValidarIdioma(string idioma)
    {
      if (idioma != null)
      {
        if (idioma.Equals("en") || idioma.Equals("pt") || idioma.Equals("es"))
        {
          return true;
        }
        else
        {
          return false;
        }
      }
      else
      {
        return true;
      }
    }
  }
}
