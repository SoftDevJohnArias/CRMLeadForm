using Dapper;
using CRMLeadObjects.DTO;
using CRMLeadObjects.DTO.Email;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class EmailDAL
    {
        public static void CreateEmailQueue(long? RecordId, string XlstName, bool HasBeenSentStore, string ApplicationName, string RequestBody, string EmailTo, string EmailFrom, string Bcc, string EmailSubject, int? smtpId, ref string Rpt, ref bool? success)
        {

            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                var parameters = new DynamicParameters();

                parameters.Add("RecordId", RecordId);
                parameters.Add("XlstName", XlstName);
                parameters.Add("HasBeenSentStore", HasBeenSentStore);
                parameters.Add("ApplicationName", ApplicationName);
                parameters.Add("RequestBody", RequestBody);
                parameters.Add("EmailTo", EmailTo);
                parameters.Add("EmailFrom", EmailFrom);
                parameters.Add("Bcc", Bcc);
                parameters.Add("EmailSubject", EmailSubject);
                parameters.Add("smtpId", smtpId);
                
                parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
                parameters.Add("Rpt", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

                Con.Query("[CreateEmailQueue]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                success = parameters.Get<bool>("@success");
                Rpt = parameters.Get<string>("@Rpt");


            }

        }

        public static List<SmtpCredentialsDTO> GetSmtpCredentials(int id)
        {
            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                List<SmtpCredentialsDTO> Res = new List<SmtpCredentialsDTO>();
                var parameters = new DynamicParameters();
                parameters.Add("id", id);
                Res = Con.Query<SmtpCredentialsDTO>
                    ("[dbo].[GetSmtpCredentials]",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure).ToList();
                Con.Close();
                return Res;
            }
        }

        public static List<EmailInfo> GetEmailQueue()
        {
            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                List<EmailInfo> Res = new List<EmailInfo>();
                var parameters = new DynamicParameters();
                Res = Con.Query<EmailInfo>
                    ("[dbo].[GetEmailQueue]",
                    param: parameters,
                    commandType: System.Data.CommandType.StoredProcedure).ToList();
                Con.Close();
                return Res;
            }
        }

        public static StateResultSP UpdateEmailQueue(int Id)
        {
            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                var parameters = new DynamicParameters();
                parameters.Add("Id", Id);        
                parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
                parameters.Add("Rpt", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

                Con.Query("[UpdateEmailQueue]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

                return new StateResultSP
                {
                    Success = parameters.Get<bool>("@success"),
                    Message = parameters.Get<string>("@Rpt")
                };
            }
        }

        public static string getEmailCustomer(string CustomerId)
        {
            using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
            {
                Con.Open();
                var parameters = new DynamicParameters();
                parameters.Add("CustomerId", CustomerId);
                parameters.Add("Email", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);             
                Con.Query("[getEmailCustomer]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);
                return parameters.Get<string>("Email");
            }
        }

    }
}
