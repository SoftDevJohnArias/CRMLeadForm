using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CRMLeadFormLogin
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                     name: "Default",
                     url: "{controller}/{action}",
                     defaults: new { language = ConfigurationManager.AppSettings["DefaultLanguage"], controller = "Account", action = "Login" }
                 );
            routes.MapRoute(
                name: "Default_language",
                url: "{language}/{controller}/{action}",
                 defaults: new { language = ConfigurationManager.AppSettings["DefaultLanguage"], controller = "Account", action = "Login" },
                  constraints: new
                  {
                      language = @"^[a-z]{2}$"
                  }
            );
            routes.MapRoute(
              name: "ValidateUserPath",
              url: "{language}/{controller}/ValidateUser",
              defaults: new { language = ConfigurationManager.AppSettings["DefaultLanguage"], id = UrlParameter.Optional, },
              namespaces: new string[]
              {
                               "CRMLeadFormLogin.Controllers"
              }
              );
        }
    }
}
