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


namespace DAL
{
  public static class LeadDAL
  {
    public static List<OptionSet> GetOptionSetAll()
    {
      StateResultSP stateResultSP = new StateResultSP();
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        //var parameters = new DynamicParameters();
        List<OptionSet> Res = new List<OptionSet>();

        Res = Con.Query<OptionSet>
         ("[dbo].[GetOptionSet]",
         param: null,
         commandType: System.Data.CommandType.StoredProcedure).ToList();

        Con.Close();
        return Res;
      } 
    }

    public static List<OptionSet> GetOptionSetByName(string name)
    {
      StateResultSP stateResultSP = new StateResultSP();
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var parameters = new DynamicParameters();
        parameters.Add("Description", name);
        List<OptionSet> Res = new List<OptionSet>();

        Res = Con.Query<OptionSet>
         ("[dbo].[GetOptionSetByName]",
         param: parameters,
         commandType: System.Data.CommandType.StoredProcedure).ToList();

        Con.Close();
        return Res;
      }
    }

  }
}
