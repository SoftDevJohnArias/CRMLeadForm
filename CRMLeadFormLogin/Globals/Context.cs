using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace CRMLeadFormLogin.Globals
{
    public class Context : IContext
    {
        public HttpRequestMessage Request { get; set; }
        public Guid? CallId { get; set; }
        public string ClientIp { get; set; }
        public string CacheValue { get; set; }
        public Exception Exception { get; set; }
        public Guid? Reference { get; set; }


        public Context(HttpRequestMessage request)
        {
            Request = request;

        }

        internal static Context GetCurrentContext(HttpRequestMessage requestToLoadIfUnavailable)
        {
            Context context = null;

            if (HttpContext.Current != null && HttpContext.Current.Items.Contains("Context") && HttpContext.Current.Items["Context"] != null)
            {
                context = (Context)HttpContext.Current.Items["Context"];
            }
            else if (requestToLoadIfUnavailable != null)
            {
                context = new Context(requestToLoadIfUnavailable);
                HttpContext.Current.Items["Context"] = context;
            }

            return context;
        }

        internal static Context GetCurrentContext() => GetCurrentContext(null);

    }
}