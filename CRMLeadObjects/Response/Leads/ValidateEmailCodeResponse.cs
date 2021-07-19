using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Response.Leads
{
  public class ValidateEmailCodeResponse
  {
    public bool Success { get; set; }
    public Guid? HiddenGeneratedCode { get; set; }
  }
}
