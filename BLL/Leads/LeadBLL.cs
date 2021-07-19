using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMLeadObjects.DTO.Leads;
using CRMLeadObjects.DTO.Utils;

namespace BLL.Leads
{
  public static class LeadBLL
  {
    private static CacheConfig<List<OptionSet>> _cacheOption = new CacheConfig<List<OptionSet>>();
    public static List<OptionSet> GetOptionSetAll()
    {
      return LeadDAL.GetOptionSetAll();
    }

  }
}
