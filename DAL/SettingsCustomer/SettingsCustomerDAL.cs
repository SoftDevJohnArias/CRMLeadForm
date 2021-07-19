using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Configuration;
using System.Data;
using CRMLeadObjects.DTO.IWSPortal;
using CRMLeadObjects.DTO.Utils;

namespace DAL.SettingsCustomer
{
  public class SettingsCustomerDAL
  {
    public CRMLeadObjects.DTO.IWSPortal.SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.ProfileCustomer> GetCustomerById(string customerById, string SettingId)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
                CRMLeadObjects.DTO.IWSPortal.SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.ProfileCustomer> Res 
                    = new SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.ProfileCustomer>();
        var parameters = new DynamicParameters();
        parameters.Add("CustomerId", customerById);
        parameters.Add("SettingId", SettingId);

        Res.ListResults = Con.Query<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.ProfileCustomer>
            ("[GetCustomerById]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();
        Res.TotalResults = Res.ListResults.Count;
        Con.Close();
        return Res;
      }

    }

    public CRMLeadObjects.DTO.StateResultSP UpdateToken(Guid token, string customerId, TypeToken typeToken)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var parameters = new DynamicParameters();
        parameters.Add("CustomerId", customerId);
        parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
        parameters.Add("Message", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

        if (typeToken == TypeToken.ApiToken)
          parameters.Add("ApiKey", token.ToString());
        else
          parameters.Add("AccessKey", token);

        Con.Query("[UpdateCustomerToken]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

        return new CRMLeadObjects.DTO.StateResultSP
        {
          Success = parameters.Get<bool>("@success"),
          Message = parameters.Get<string>("@Message")
        };
      }
    }

    public SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsOptions.SettingsOptionModel> GetSettingsOptionsById(string id)
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsOptions.SettingsOptionModel> Res = new SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsOptions.SettingsOptionModel>();
        var parameters = new DynamicParameters();
        parameters.Add("Id", id);

        Res.ListResults = Con.Query<CRMLeadObjects.DTO.IWSPortal.SettingsOptions.SettingsOptionModel>
            ("[GetSettingsOptionsById]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();
        Res.TotalResults = Res.ListResults.Count;
        Con.Close();
        return Res;
      }
    }

    public CRMLeadObjects.DTO.StateResultSP UpdateCustomerSettings(CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel customerSettings )
    {
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
        var parameters = new DynamicParameters();
        parameters.Add("CustomerId", customerSettings.CustomerId);
        parameters.Add("SettingId", customerSettings.SettingId);
        parameters.Add("UpdatedBy", customerSettings.UpdatedBy);
        parameters.Add("Value", customerSettings.Value);
        parameters.Add("success", dbType: System.Data.DbType.Boolean, direction: System.Data.ParameterDirection.Output);
        parameters.Add("Message", dbType: System.Data.DbType.String, direction: System.Data.ParameterDirection.Output, size: 50);

        Con.Query("[UpdateCustomerSettings]", param: parameters, commandType: System.Data.CommandType.StoredProcedure);

        return new CRMLeadObjects.DTO.StateResultSP
        {
          Success = parameters.Get<bool>("@success"),
          Message = parameters.Get<string>("@Message")
        };
      }
    }

    public SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel> GetCustomerSettings(string customerById, string SettingId)
    {
      SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel> Res = new SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel>();
      using (SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["IwsPortal"].ConnectionString))
      {
        Con.Open();
       
        var parameters = new DynamicParameters();
        parameters.Add("CustomerId", customerById);
        parameters.Add("CustomerSettingId", CreateDatatable(SettingId).AsTableValuedParameter("dbo.CustomerSettingId"));
        //parameters.Add("SettingId", SettingId);

        Res.ListResults = Con.Query<CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel>
            ("[GetCustomerSettings]",
            param: parameters,
            commandType: System.Data.CommandType.StoredProcedure).ToList();
        Con.Close();
       
      }
      return Res;
    }

    public static DataTable CreateDatatable(string data)
    {

      var dt = new DataTable();
      dt.Columns.Add("SettingId", typeof(string));

      if (data.Equals(""))
        return dt;

      var items = data.Split(',');
      foreach (var item in items)
      {
        dt.Rows.Add(item);
      }
      return dt;
    }


  }
}

