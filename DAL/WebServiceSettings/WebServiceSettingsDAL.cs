using Dapper;
using CRMLeadObjects.DTO.WebServiceSettings;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.WebServiceSettings
{
  public static class WebServiceSettingsDAL
  {

    public static List<WebServiceSettingsDTO> GetWebServiceSettings(string IdServiceSettings)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        List<WebServiceSettingsDTO> Res = new List<WebServiceSettingsDTO>();
        var parameters = new DynamicParameters();
        parameters.Add("IdServiceSettings", IdServiceSettings);
        Res = Con.Query<WebServiceSettingsDTO>
            ("[GetWebServiceSettings]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();
        Con.Close();
        return Res;
      }
    }
  }
}
