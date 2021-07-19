using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace CRMLeadObjects.DTO.Utils
{
  public enum StatusCustomer
  {
    a,//active
    i//inactive
  }

  public enum TypeToken
  {
    AccessToken,
    ApiToken
  }

  public enum OptionsSettings
  {
    [Description("products.catalog.source")]
    Catalog = 0

  }
  public enum MenuType
  {
    NavigationMenu,
    AccountMenu
  }

  public enum OrderSearchCatalog
  {
    sku,
    priceAsc,
    priceDesc,
    available
  }
}

