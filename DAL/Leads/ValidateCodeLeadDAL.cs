using Dapper;
using CRMLeadObjects.DTO;
using CRMLeadObjects.DTO.Leads;
using CRMLeadObjects.Request.Leads;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Leads
{
  public class ValidateCodeLeadDAL
  {
    public static StateResultSP CreateEmailCode(EmailCode emailcode)
    {
      StateResultSP stateResultSP = new StateResultSP();
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var parameters = new DynamicParameters();

        //parameters.Add("CompanyId", emailcode.CompanyId);
        parameters.Add("Email", emailcode.Email);
        parameters.Add("VisibleGeneratedCode", emailcode.VisibleGeneratedCode);
        parameters.Add("HiddenGeneratedCode", emailcode.HiddenGeneratedCode);
        parameters.Add("LanguageEmail", emailcode.Language);
        parameters.Add("ValidityTime", emailcode.ValidityTime);
        parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
        parameters.Add("Message", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

        Con.Query("[dbo].[CreateEmailCode]", param: parameters, commandType: System.Data.CommandType.StoredProcedure, buffered: true, commandTimeout: 200);

        stateResultSP.Success = parameters.Get<bool>("@success");
        stateResultSP.Message = parameters.Get<string>("@Message");
        Con.Close();
      }
      return stateResultSP;
    }

    public static EmailCode GetEmailCode(Guid HiddenGeneratedCode)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();

        var parameters = new DynamicParameters();
        //parameters.Add("CompanyId", companyId);
        parameters.Add("HiddenGeneratedCode", HiddenGeneratedCode);

        var objEmailCode = Con.Query<EmailCode>
            ("[dbo].[GetEmailCode]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();

        Con.Close();

        return objEmailCode.FirstOrDefault();
      }
    }

    public static StateResultSP ComfirmCodeLead(EmailCode objEmailCode)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        StateResultSP stateResultSP = new StateResultSP();
        Con.Open();
        var parameters = new DynamicParameters();
       // parameters.Add("CompanyId", objEmailCode.CompanyId);
        parameters.Add("Email", objEmailCode.Email);
        parameters.Add("VisibleGeneratedCode", objEmailCode.VisibleGeneratedCode);
        parameters.Add("HiddenGeneratedCode", objEmailCode.HiddenGeneratedCode);
        parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
        parameters.Add("Message", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

        Con.Query("[dbo].[ComfirmCodeLead]", param: parameters, commandType: System.Data.CommandType.StoredProcedure, buffered: true, commandTimeout: 200);

        stateResultSP.Success = parameters.Get<bool>("@success");
        stateResultSP.Message = parameters.Get<string>("@Message");
        Con.Close();

        return stateResultSP;
      }

    }

  }
}
