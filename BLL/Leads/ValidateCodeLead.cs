using DAL.Leads;
using CRMLeadObjects.DTO;
using CRMLeadObjects.DTO.Leads;
using CRMLeadObjects.Request.Leads;
using CRMLeadObjects.Response.Leads;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
//using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using CRMLeadObjects.Common;
using DAL;

namespace BLL.Leads
{
  public class ValidateCodeLead
  {
    public static ValidateEmailCodeResponse CreateEmailCode(string email, bool sendEmail, string language, int? validityTime)
    {

      Guid hiddenCode = Guid.NewGuid();
      EmailCode emailCode = new EmailCode
      {

        Email = email,
        VisibleGeneratedCode = GenerateCodeRandom(6),
        HiddenGeneratedCode = hiddenCode,
        Language=language,
        ValidityTime=validityTime

      };

      var result = ValidateCodeLeadDAL.CreateEmailCode(emailCode);
      ValidateEmailCodeResponse validateEmailCodeResponse = new ValidateEmailCodeResponse
      {
        Success = result.Success,
        HiddenGeneratedCode = result.Success ? hiddenCode : (Guid?)null
      };


      ///send email code
      ///
      if (sendEmail)
      {
        const int IdTemplate = 4;
        var credenciales = EmailDAL.GetSmtpCredentials(IdTemplate).FirstOrDefault();
        string templateHtml = credenciales.TemplateBody.Replace("@code", emailCode.VisibleGeneratedCode);
        EmailBLL.SendEmail(email, templateHtml, IdTemplate);
      }
      return validateEmailCodeResponse;
    }
    public static StateResultSP VerifyEmailCode(ValidateEmailCodeRequest validateEmailCode)
    {
      string company = "XCB";
      var response = ValidateCodeLeadDAL.GetEmailCode(validateEmailCode.HiddenGeneratedCode);

      if (response != null
          && response.HiddenGeneratedCode == validateEmailCode.HiddenGeneratedCode
          && response.VisibleGeneratedCode == validateEmailCode.InputLeadCode
          && !ExpiratedCode(response.GenerateDate, company))
      {

        ValidateCodeLeadDAL.ComfirmCodeLead(response);
        return new StateResultSP
        {
          Message = "success validation",
          Success = true,
        };
      }

      return new StateResultSP
      {
        Success = false,
        Message = "Lo sentimos, el código que ingresaste es incorrecto o ha caducado",
      };
    }
    private static bool ExpiratedCode(DateTime generateDate, string company = "XCB")
    {
      var timeExpiration = ConfigurationManager.AppSettings["timeExpirendCode"];
      Enum.TryParse(company, out StandartTimeEnumByCompany zone);
      var standarTime = zone.GetDescription();

      if (string.IsNullOrEmpty(timeExpiration))
      {
        throw new ArgumentOutOfRangeException("key timeExpirendCode null ");
      }

      //var difference = DateTime.UtcNow.ConvertDateToLocalTime(standarTime).Subtract(generateDate.AddHours(-1));
      var difference = DateTime.UtcNow.ConvertDateToLocalTime(standarTime).Subtract(generateDate);

      double.TryParse(timeExpiration, out double timeMinutes);
      return timeMinutes < difference.TotalMinutes;
    }

    private static string GenerateCodeRandom(int size)
    {
      const string src = "0123456789";
      var sb = new StringBuilder();
      Random RNG = new Random();
      for (var i = 0; i < size; i++)
      {
        var c = src[RNG.Next(0, src.Length)];
        sb.Append(c);
      }

      return sb.ToString();
    }
  }
}
