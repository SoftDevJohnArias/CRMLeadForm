using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Request.Leads
{
  public class ValidateEmailCodeRequest
  {
    public string Email { get; set; }
    public Guid HiddenGeneratedCode { get; set; }
    public string InputLeadCode { get; set; }
    public DateTime CurrentDate { get; set; }
  }
}
