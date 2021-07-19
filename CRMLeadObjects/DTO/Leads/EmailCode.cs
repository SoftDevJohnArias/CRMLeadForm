using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.Leads
{
  public class EmailCode
  {
    //public string CompanyId { get; set; }
    public Guid HiddenGeneratedCode { get; set; }
    public string Email { get; set; }
    public string VisibleGeneratedCode { get; set; }
    public string InputLeadCode { get; set; }
    public DateTime GenerateDate { get; set; }
    public bool IsConfirmed { get; set; }
    public DateTime? ConfirmationDate { get; set; }
    public string Language { get; set; } = "es";
    public int? ValidityTime { get; set; } = 1;

  }
}
