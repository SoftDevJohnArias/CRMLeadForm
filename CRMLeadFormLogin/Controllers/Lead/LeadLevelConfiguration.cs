using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRMLeadFormLogin.Controllers.Lead
{
  public class Level
  {
    public int levelId { get; set; }
    public string tableSQL { get; set; }
    public int nextLevel { get; set; }
    public string levelReference { get; set; }
  }

  public class LevelConfiguration
  {
    public string companyId { get; set; }
    public List<Level> level { get; set; }
  }
}