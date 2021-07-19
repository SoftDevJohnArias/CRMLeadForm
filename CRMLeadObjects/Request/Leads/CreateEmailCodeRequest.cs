using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Request.Leads
{
  public class CreateEmailCodeRequest
  {
    public string email { get; set; }
    public bool? sendEmail { get; set; } = false;
    public string LanguageEmail { get; set; } = "es";
    public int? ValidityTime { get; set; } = 1;
  }
}
