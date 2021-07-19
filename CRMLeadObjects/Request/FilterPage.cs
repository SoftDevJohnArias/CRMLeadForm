using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IWSPortalObjects.Request
{
  public class FilterPage
  {
    public int actualPage { get; set; }
    public int cantByPage { get; set; }
  }

  public class FilterRequest
  {
    public FilterPage filterPage;
    public String filter { get; set; }
    public int? total_records { get; set; } = null;
    public String company_id { get; set; }
    public String customerId { get; set; }

  }

}
