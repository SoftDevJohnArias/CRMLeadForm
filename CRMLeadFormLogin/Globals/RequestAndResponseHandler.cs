using BLL;
using CRMLeadObjects.DTO.IWSPortal.Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace CRMLeadFormLogin.Globals
{
    public class RequestAndResponseHandler : DelegatingHandler
    {
        ApiLog BLLApiLog = new ApiLog();
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var uri = request.RequestUri;
            var host = uri.Host;
            var method = request.Method;
            var requestOperation = "AddmailQueue";
            var requestBodyTxt = await request.Content.ReadAsStringAsync();
            var requestBody = new JavaScriptSerializer().Deserialize<AddmailQueue>(requestBodyTxt);
            var context = System.Web.HttpContext.Current;
            var clientIp = context.Request.ServerVariables["REMOTE_ADDR"];
            var response = await base.SendAsync(request, cancellationToken);
            var statusCode = response.StatusCode.ToString();
            var responseTxt = await response.Content.ReadAsStringAsync();
            var apiVersion = typeof(RequestAndResponseHandler).Assembly.GetName().Version.ToString(); ;
            var customerId = requestBody.CustomerId;
            var orderNumber = requestBody.OrderNumber;
            var localSku = "";
            var controller = "MailRest";
            var cacheValue = "";
            var exception = "";
            Guid reference = new Guid();
            var userAgent = context.Request.UserAgent;
            BLLApiLog.CreateApiLog(method.ToString(), uri.AbsoluteUri, requestOperation,
                requestBodyTxt, host, clientIp, statusCode, responseTxt, apiVersion, customerId, orderNumber,
                localSku, controller, cacheValue, exception, reference, userAgent);
            return response;
        }
    }
}