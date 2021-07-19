using Dapper;
using CRMLeadObjects.DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Processes
{
  public static class ProcessesDAL
  {
    public static void CreateProcesses(string Description)
    {
      var queryComplete = @"insert into Processes (Description) values('" + Description + "')";
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        SPQueryResult<string> res = new SPQueryResult<string>();
        Con.Query(queryComplete);
        Con.Close();

      }
    }

    public static void ConsultarProcoPorCliente(string CustomerId)
    {
      var queryComplete =
          @"select * from Processes where CustomerId=@CustomerId and Status = 'a'";
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var respuesta = Con.Query<string>(queryComplete, param: new { CustomerId = CustomerId }).ToList();
        Con.Close();
        //return res;
      }
    }
  }
}
