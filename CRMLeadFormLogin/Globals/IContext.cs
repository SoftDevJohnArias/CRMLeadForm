using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace CRMLeadFormLogin.Globals
{
    public interface IContext
    {
        HttpRequestMessage Request { get; set; }
        Guid? CallId { get; set; }
        string ClientIp { get; set; }
        string CacheValue { get; set; }
        Exception Exception { get; set; }
        Guid? Reference { get; set; }
    }
}