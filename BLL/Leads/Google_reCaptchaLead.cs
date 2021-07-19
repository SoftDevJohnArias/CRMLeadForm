using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;

namespace BLL.Leads
{
  public static class Google_reCaptchaLead
  {
    public static bool ValidateTokenCaptcha(string token) 
    {
      try
      {
        using (var client = new HttpClient())
        {

          var url = System.Configuration.ConfigurationManager.AppSettings["reCaptchaUrl"];

          var values = new Dictionary<string, string>
        {
          { "secret", System.Configuration.ConfigurationManager.AppSettings["reCaptchaSecretKey"]},
          { "response" , token}
        };

          var content = new FormUrlEncodedContent(values);
          var verifyUrl = client.PostAsync(url, content).Result;
          var captchaResponseContent = verifyUrl.Content;
          string captchaResult = captchaResponseContent.ReadAsStringAsync().Result;

          JObject json = JObject.Parse(captchaResult);

          return (bool)json["success"];
        }
      }
      catch (Exception ex)
      {
        return false;
      }

    }

  }
}
