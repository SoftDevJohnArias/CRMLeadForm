using System.Configuration;
using System.Web.Mvc;

namespace CRMLeadFormLogin.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
               name: "Admin_default",
               url: "Admin/{controller}/{action}/{id}",
               defaults: new
               {
                   language = ConfigurationManager.AppSettings["DefaultLanguage"],
                   controller = "AccountActiveDiretory",
                   action = "Index",
                   id = UrlParameter.Optional,
                   area = "Admin"
               },
                namespaces: new string[] { "CRMLeadFormLogin.Areas.Admin.Controllers" }


           );


            context.MapRoute(
                      name: "Admin_language",
                      url: "{language}/Admin/{controller}/{action}/{id}",
                      defaults: new
                      {
                          language = ConfigurationManager.AppSettings["DefaultLanguage"],
                          controller = "AccountActiveDiretory",
                          action = "Index",
                          id = UrlParameter.Optional,
                          area = "Admin"
                      },
                       namespaces: new string[] { "CRMLeadFormLogin.Areas.Admin.Controllers" },
                       constraints: new { language = @"^[a-z]{2}$" }

                  );

        }
    }
}