using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Response.Leads
{
  public class Datum
  {
    public string http_code { get; set; }
    public string message { get; set; }
    public string parameter { get; set; }
    public string result { get; set; }
    public List<string> status_code { get; set; }
  }

  public class LeadExistenceResponse
  {
    public string cid { get; set; }
    public string status { get; set; }
    public string code { get; set; }
    public DateTime timestamp { get; set; }
    public List<Datum> data { get; set; }
    public List<object> error { get; set; }
  }
}
