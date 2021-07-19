using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMLeadObjects.DTO.Leads;

namespace DAL
{
  public static class RestCallLogDAL
  {
    public static void CreateCallLog(RestCallLog objRestCallLog, ref string Rpt, ref bool? success)
    {

      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var parameters = new DynamicParameters();

        parameters.Add("RestService", objRestCallLog.RestService);
        parameters.Add("RelatedIwsCallId", objRestCallLog.RelatedIwsCallId);
        parameters.Add("Host", objRestCallLog.Host);
        parameters.Add("ClientIp", objRestCallLog.ClientIp);
        parameters.Add("HttpMethod", objRestCallLog.HttpMethod);
        parameters.Add("Request", objRestCallLog.Request);
        parameters.Add("RequestHeaders", objRestCallLog.RequestHeaders);
        parameters.Add("RequestBody", objRestCallLog.RequestBody);
        parameters.Add("SuccessIn", objRestCallLog.Success);
        parameters.Add("ResponseStatusCode", objRestCallLog.ResponseStatusCode);
        parameters.Add("Response", objRestCallLog.Response);
        parameters.Add("StartTimeStamp", objRestCallLog.StartTimeStamp);
        parameters.Add("EndTimeStamp", objRestCallLog.EndTimeStamp);
        parameters.Add("ElapsedTime", objRestCallLog.ElapsedTime);
        parameters.Add("CompanyId", objRestCallLog.CompanyId);



        parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
        parameters.Add("Rpt", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

        Con.Query("[CreateRestCallLog]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

        success = parameters.Get<bool>("@success");
        Rpt = parameters.Get<string>("@Rpt");


      }

    }
  }
}
