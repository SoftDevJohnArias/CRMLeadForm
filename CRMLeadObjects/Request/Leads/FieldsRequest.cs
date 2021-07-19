using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Request.Leads
{
  public class fieldsShow
  {
    public int step { get; set; }
    public int section { get; set; }
    public int field { get; set; }
  }

  public class FieldsRequest
  {
    public string companyId { get; set; }
    public List<fieldsShow> fieldsShow { get; set; }
  }
}