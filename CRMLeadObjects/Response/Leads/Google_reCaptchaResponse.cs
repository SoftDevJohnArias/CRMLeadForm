using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Response.Leads
{
  public class Google_reCaptchaResponse
  {
    public string token { get; set; }
  }

  public class Google_response
  {
    public bool success { get; set; }
    public double score { get; set; }
    public string action { get; set; }
    public DateTime challenge_ts { get; set; }
    public string hostname { get; set; }
  }


}
