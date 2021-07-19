using BLL.Leads;
using CRMLeadObjects.Request.Leads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CRMLeadFormLogin.Controllers.Lead
{
  [AllowAnonymous]
  public class ValidateCodeLeadApiController : ApiController
  {

    [Route("api/CreateEmailCode")]
    [HttpPost]
    public HttpResponseMessage CreateEmailCode(CreateEmailCodeRequest createEmailCodeRequest)
    {
      try
      {
        var result = ValidateCodeLead.CreateEmailCode(createEmailCodeRequest.email, (bool)createEmailCodeRequest.sendEmail, createEmailCodeRequest.LanguageEmail, createEmailCodeRequest.ValidityTime);
        return Request.CreateResponse(HttpStatusCode.OK, result);
      }
      catch (Exception ex)
      {
        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
      }
    }

    [Route("api/VerifyEmailCode")]
    [HttpPost]
    public HttpResponseMessage VerifyEmailCode(ValidateEmailCodeRequest validateEmailCodeRequest)
    {
      try
      {
        var result = ValidateCodeLead.VerifyEmailCode(validateEmailCodeRequest);
        return Request.CreateResponse(HttpStatusCode.OK, result);
      }
      catch (Exception ex)
      {
        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
      }
    }

    [Route("api/ValidateEmail")]
    [HttpPost]
    public HttpResponseMessage ValidateEmail(string email)
    {
      try
      {
        var result = true;
        return Request.CreateResponse(HttpStatusCode.OK, result);
      }
      catch (Exception ex)
      {
        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
      }
    }

  }
}
