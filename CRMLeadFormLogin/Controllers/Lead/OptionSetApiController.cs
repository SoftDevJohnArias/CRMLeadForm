using BLL.Leads;
using CRMLeadFormLogin.Controllers.Lead;
using CRMLeadObjects.DTO.Leads;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CRMLeadObjects.Controllers.Lead
{
  public class OptionSetApiController : ApiController
  {

    //[AllowAnonymous] // se debe borrar
    //[Route("api/GetOptionSetByName")]
    //[HttpGet]
    //public HttpResponseMessage GetOptionSetByName()
    //{
    //  try
    //  {

    //    //string CompanyID = this.getCookieValue("CompanyId", "property").ToString();
    //    string CompanyID = "XCB";
    //    var response = GetOptionSetByDescription(CompanyID + "ph_companytypeid");
    //    string jsonConvert = JsonConvert.SerializeObject(response.ValueData, Formatting.Indented);
    //    JObject o = JObject.Parse(response.ValueData);

    //    return Request.CreateResponse(HttpStatusCode.OK, jsonConvert);
    //  }
    //  catch (Exception ex)
    //  {
    //    return Request.CreateResponse(HttpStatusCode.InternalServerError);

    //  }
    //}

    private OptionSet GetOptionSetByDescription(string name)
    {
      List<Option> optionsSet = new List<Option>();
      var OptionSet = LeadBLL.GetOptionSetAll().Where(x => x.Description == name).FirstOrDefault();
      return OptionSet;
    }
  }
}
