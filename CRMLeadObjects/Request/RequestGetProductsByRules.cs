using IWSPortalObjects.DTO.IWSPortal.CatalogConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IWSPortalObjects.Request
{
  public class RequestGetProductsByRules
  {
    public List<RulesDTO> lstRules;
    public int PageNumber { get; set; } = 1;
    public string IdClient { get; set; }
  }
}
