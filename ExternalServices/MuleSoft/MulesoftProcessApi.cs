using CRMLeadObjects.Common;
using CRMLeadObjects.Request.Leads;
using CRMLeadObjects.Response.Leads;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using ExternalServices.WSTraxProd;
using DAL.WebServiceSettings;
using CRMLeadObjects.DTO.Leads;


namespace TraxServices.TraxProcess
{
    public static class MulesoftProcessApi
    {
        public static string GetInfoTraxAuth(string email)
        {
            email = "anjey.lobas+sv@vaimo.com";
            Object requestBody = (new
            {
                email
            });
            string urlApiAuth = WebServiceSettingsDAL.GetWebServiceSettings("ApiAuthProcess")?.First().Value;
            return SendPostMulesoft(requestBody, urlApiAuth, "IsBasicApiAuthProcess", "GetInfoTraxAuth").resultContent;
        }

         public static ResponseMulesoft CreateLead(Object obj, string CompanyId)
        {
            string ApiMule = ConfigurationManager.AppSettings["ApiMuleProd"];
            return SendPostMulesoft(obj, ApiMule, "IsBasicCreateLead", "CreateLead", CompanyId);
        }
        public static ResponseMulesoft CreateLeadXUS(Object obj, string CompanyId)
        {
            string ApiMule = ConfigurationManager.AppSettings["ApiMuleProd"];
            return SendPostMulesoft(obj, ApiMule, "IsBasicCreateLead", "CreateLead", CompanyId);
        }
     
        public static string leadExistence(LeadExistence leadExistence)
        {
            string url = ConfigurationManager.AppSettings["ApiLeadExistence2"];
            string totalUrl = url + "emailaddress1=" + leadExistence.emailaddress1 + "&ph_companyidentification=" + leadExistence.ph_companyidentification + "&ph_identification=" + leadExistence.ph_identification + "&emailaddress2=" + leadExistence.emailaddress2;
            return SendGetMulesoft("leadExistence", totalUrl);
        }
        public static string SendGetMulesoft(string RestService, string url, string IdServiceSettings = null)
        {
            string resultContent = string.Empty;
            string Rpt = "";
            bool? success = false;
            DateTime StartTimeStamp = DateTime.Now;

            var IsAuthHeaders = false;
            if (IdServiceSettings != null)
            {
                bool.TryParse(WebServiceSettingsDAL.GetWebServiceSettings(IdServiceSettings)?.First().Value, out IsAuthHeaders);
            }

            ResponseMulesoft ResponseMulesoftob = new ResponseMulesoft();

            using (var client = new HttpClient())
            {
                if (IsAuthHeaders)
                {
                    client.DefaultRequestHeaders.Add("Client_id", WebServiceSettingsDAL.GetWebServiceSettings("mule.Client_id")?.First().Value);
                    client.DefaultRequestHeaders.Add("Client_secret", WebServiceSettingsDAL.GetWebServiceSettings("mule.Client_secret")?.First().Value);
                }

                client.Timeout = TimeSpan.FromMinutes(6);
                var response = client.GetAsync(new Uri(url)).Result;
                resultContent = response.Content.ReadAsStringAsync().Result;

                ResponseMulesoftob.resultContent = response.Content.ReadAsStringAsync().Result;
                RestCallLog RestCallLogobj = new RestCallLog(RestService, null, null, null, "Get", url, client.DefaultRequestHeaders.ToString(), null, response.IsSuccessStatusCode, response.StatusCode.ToString(), ResponseMulesoftob?.resultContent?.ToString(), StartTimeStamp, DateTime.Now, (DateTime.Now - StartTimeStamp).ToString(), null);
                DAL.RestCallLogDAL.CreateCallLog(RestCallLogobj, ref Rpt, ref success);

            }
            return resultContent;
        }
        public static ResponseMulesoft SendPostMulesoft(Object requestBody, string url, string IdServiceSettings, string RestService, string CompanyId = null)
        {

            string Rpt = "";
            bool? success = false;
            DateTime StartTimeStamp = DateTime.Now;


            var IsBasicApiAuthProcess = true;
            bool.TryParse(WebServiceSettingsDAL.GetWebServiceSettings(IdServiceSettings)?.First().Value, out IsBasicApiAuthProcess);

            string resultContent = string.Empty;
            var jsonData = JsonConvert.SerializeObject(requestBody);
            var stringContent = new StringContent(jsonData, UnicodeEncoding.UTF8, "application/json");

            ResponseMulesoft ResponseMulesoftob = new ResponseMulesoft();

            using (HttpClient client = new HttpClient())
            {
                if (IsBasicApiAuthProcess)
                {
                    client.DefaultRequestHeaders.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes($"{WebServiceSettingsDAL.GetWebServiceSettings("mule.UserBasicAuth")?.First().Value}:{WebServiceSettingsDAL.GetWebServiceSettings("mule.PasswordBasicAuth")?.First().Value}")));
                }
                else
                {
                    client.DefaultRequestHeaders.Add("Client_id", WebServiceSettingsDAL.GetWebServiceSettings("mule.Client_id").First().Value);
                    client.DefaultRequestHeaders.Add("Client_secret", WebServiceSettingsDAL.GetWebServiceSettings("mule.Client_secret").First().Value);
                }
                client.Timeout = TimeSpan.FromMinutes(6);
                var response = client.PostAsync(url, stringContent).Result;
                ResponseMulesoftob.response = response;
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    // ResponseMulesoftob.resultContent = response.ToString();
                    ResponseMulesoftob.resultContent = response.Content.ReadAsStringAsync().Result;
                    RestCallLog RestCallLogobj = new RestCallLog(RestService, null, null, null, "Post", url, client.DefaultRequestHeaders.ToString(), jsonData.ToString(), false, response.StatusCode.ToString(), ResponseMulesoftob?.resultContent?.ToString(), StartTimeStamp, DateTime.Now, (DateTime.Now - StartTimeStamp).ToString(), CompanyId);

                    DAL.RestCallLogDAL.CreateCallLog(RestCallLogobj, ref Rpt, ref success);

                }
                else
                {
                    ResponseMulesoftob.resultContent = response.Content.ReadAsStringAsync().Result;
                    RestCallLog RestCallLogobj = new RestCallLog(RestService, null, null, null, "Post", url, client.DefaultRequestHeaders.ToString(), jsonData?.ToString(), true, response.StatusCode.ToString(), ResponseMulesoftob?.resultContent?.ToString(), StartTimeStamp, DateTime.Now, (DateTime.Now - StartTimeStamp).ToString(), CompanyId);

                    DAL.RestCallLogDAL.CreateCallLog(RestCallLogobj, ref Rpt, ref success);
                }
            }
            return ResponseMulesoftob;
        }
        public static bool ValidateExistingEmail(string email)
        {
            return true;
        }

    }
}
