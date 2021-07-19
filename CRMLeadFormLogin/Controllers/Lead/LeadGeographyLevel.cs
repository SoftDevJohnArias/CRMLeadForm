using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRMLeadFormLogin.Controllers.Lead
{
  public class Options
  {
    public int optionId { get; set; }
    public string optionGuid { get; set; }
    public string optionValue { get; set; }
    public int parentOption { get; set; }
    public string levelReference { get; set; }
  }

  public class Companies
  {
    public string companyId { get; set; }
    public List<Options> options { get; set; }
  }

  public class GeographyLevel
  {
    public int levelId { get; set; }
    public List<Companies> companies { get; set; }
  }


}