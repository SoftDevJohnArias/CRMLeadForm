using CRMLeadObjects.DTO;
using System;
using DAL;

namespace BLL
{
    public class ApiLog
    {
        public StateResultSP CreateApiLog(string httpMethod,
            string request, string requestOperation, string requestBody, string host,
            string clientIp, string statusCode, string response, string apiVersion,
            string customerID, string orderNumber, string localSku, string controller,
            string cacheValue, string exception, Guid reference, string userAgent)
        {
            return new ApiLogDAL().CreateApiLog(httpMethod,
                  request, requestOperation, requestBody, host,
             clientIp, statusCode, response, apiVersion,
             customerID, orderNumber, localSku, controller,
             cacheValue, exception, reference, userAgent);
        }

    }
}
