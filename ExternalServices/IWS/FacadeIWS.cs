using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web;

namespace TraxServices.IWS
{

    public enum IWSCatalogStatus
    {
        Unknown,
        Active,
        Successfull,
        Error,
    }
    public static class FacadeIWS
    {
        static readonly HttpClient client = new HttpClient();
        static readonly string urlAdminapi = WebConfigurationManager.AppSettings["UrlAdminapi"];


     }
       
    
}
