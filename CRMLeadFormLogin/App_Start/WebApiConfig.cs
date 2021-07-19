using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Dispatcher;

namespace CRMLeadFormLogin
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Filters.Add(new AuthorizeAttribute());
            List<DelegatingHandler> listaHandlers = new List<DelegatingHandler>();
            listaHandlers.Add(new Globals.RequestAndResponseHandler());

            config.MapHttpAttributeRoutes();


            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.Routes.MapHttpRoute(
                name: "LoggedApi",
                routeTemplate: "api/AddmailQueue",
                defaults: new
                {
                    controller = "MailRest",
                    action = "AddmailQueue"
                },
                handler: HttpClientFactory.CreatePipeline(
                    new HttpControllerDispatcher(config),
                    listaHandlers),
                constraints: null);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
