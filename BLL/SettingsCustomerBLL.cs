using DAL.SettingsCustomer;
using CRMLeadObjects.DTO;
using CRMLeadObjects.DTO.IWSPortal;
using CRMLeadObjects.DTO.IWSPortal.SettingsCustomer;
using CRMLeadObjects.DTO.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
  public class SettingsCustomerBLL
  {

    public SettingsCustomerViewModel GetCustomerById(string customerId)
    {
      var result = new SettingsCustomerDAL().GetCustomerById(customerId, OptionsSettings.Catalog.GetDescription());
      
      return new SettingsCustomerViewModel
      {
        Customer = result.ListResults.FirstOrDefault()

      };
    }

    public StateResultSP UpdateToken(string customerId, TypeToken typeToken, out Guid token)
    {
      token = Guid.NewGuid();
      return new SettingsCustomerDAL().UpdateToken(token, customerId, typeToken);
    }

    public CRMLeadObjects.DTO.IWSPortal.SPQueryResult<CRMLeadObjects.DTO.IWSPortal.SettingsOptions.SettingsOptionModel> GetSettingsOptionsProductCatalog()
    {
      return new SettingsCustomerDAL().GetSettingsOptionsById(OptionsSettings.Catalog.GetDescription());
    }

    public StateResultSP UpdateCustomerSettings(CRMLeadObjects.DTO.IWSPortal.SettingsCustomer.CustomerSettingsModel customerSettings)
    {
      return new SettingsCustomerDAL().UpdateCustomerSettings(customerSettings);
    }

    public List<CustomerSettingsModel> GetCustomerSettings(string customerId)
    {
      string configSetting = ConfigurationManager.AppSettings.Get("ConfigSetting");
      var result = new SettingsCustomerDAL().GetCustomerSettings(customerId, configSetting);
      return result.ListResults;
    }
    private string CustomerKeysSetting()
    {

      string[] settarray = ConfigurationManager.AppSettings.Get("ConfigSetting").Split(',');
      string settingIds = "";
      foreach (string elm in settarray)
      {
        settingIds += "'" + elm + "',";
      }

      return settingIds.Substring(0, settingIds.Length - 1);
    }

    public Dictionary<string, string> SetDictSettings(List<CustomerSettingsModel> customerSettingsModels)
    {
      return customerSettingsModels.ToDictionary(x => x.SettingId, x => x.Value);
    }
  }
}
