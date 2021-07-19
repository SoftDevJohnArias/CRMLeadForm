using CRMLeadObjects.Response.Leads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using System.Net;

namespace CRMLeadFormLogin.Controllers.Lead
{
  public class Google_reCaptcha : ApiController
  {
    //[AllowAnonymous]
    //[Route("api/Google_reCaptcha/{token}")]
    //[HttpGet]
    //public HttpResponseMessage ValidateToken(string token)
    //{
    //  try
    //  {
    //    var responseValidate = Token(token);


    //    return Request.CreateResponse(HttpStatusCode.InternalServerError, "ok");
    //  }
    //  catch (Exception ex)
    //  {

    //    return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
    //  }
    //}

    //private async Task<Google_reCaptchaResponse> Token(string token) 
    //{

    //  Google_reCaptchaResponse myData = new Google_reCaptchaResponse
    //  {
    //    response = token,
    //    secret = System.Configuration.ConfigurationManager.AppSettings["reCaptchaSecretKey"]
    //  };

    //  HttpClient client = new HttpClient();

    //  var response = await client.GetStringAsync($"https://www.google.com/recaptcha/api/siteverify?secret={myData.secret}&response={myData.response}");

    //  return JsonConvert.DeserializeObject<Google_reCaptchaResponse>(response);
    //} 

  }
}