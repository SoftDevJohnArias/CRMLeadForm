using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Configuration;
using CRMLeadObjects.DTO.IWSPortal.NavigationMenu;
using CRMLeadObjects.DTO.Utils;
using CRMLeadObjects.DTO;

namespace DAL.NavigationMenuDAL
{
  public class NavigationMenuDAL
  {
    public SPQueryResult<NavigationMenu> GetNavigationMenu(MenuType menuType)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        SPQueryResult<NavigationMenu> Res = new SPQueryResult<NavigationMenu>();
        var parameters = new DynamicParameters();
        parameters.Add("TypeMenu", menuType.ToString());
        Res.ListResults = Con.Query<NavigationMenu>
            ("[GetMVCNavigationMenu]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();
        Res.TotalResults = Res.ListResults.Count;
        Con.Close();
        return Res;
      }

    }
  }
}
