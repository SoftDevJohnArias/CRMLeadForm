using Dapper;
using System;
using System.Configuration;
using System.Data.SqlClient;

namespace DAL
{
    public class ApiLogDAL
    {
        public CRMLeadObjects.DTO.StateResultSP CreateApiLog(string httpMethod,
          string request, string requestOperation, string requestBody, string host,
          string clientIp, string statusCode, string response, string apiVersion,
          string customerID, string orderNumber, string localSku, string controller,
          string cacheValue, string exception, Guid reference, string userAgent)
        {         

            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                var parameters = new DynamicParameters();

                parameters.Add("httpMethod", httpMethod);
                parameters.Add("request", request);
                parameters.Add("requestOperation", requestOperation);
                parameters.Add("requestBody", requestBody);
                parameters.Add("host", host);
                parameters.Add("clientIp", clientIp);
                parameters.Add("statusCode", statusCode);
                parameters.Add("response", response);
                parameters.Add("apiVersion", apiVersion);
                parameters.Add("customerID", customerID);
                parameters.Add("orderNumber", orderNumber);
                parameters.Add("localSku", localSku);
                parameters.Add("controller", controller);
                parameters.Add("cacheValue", cacheValue);
                parameters.Add("exception", exception);
                parameters.Add("reference", reference);
                parameters.Add("userAgent", userAgent);                

                parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
                parameters.Add("CallId", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

                Con.Query("[CreateApiLog]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                return new CRMLeadObjects.DTO.StateResultSP
                {
                    Success = parameters.Get<bool>("@success"),
                    Message = parameters.Get<string>("@CallId")
                };
            }
        }
    }
}
