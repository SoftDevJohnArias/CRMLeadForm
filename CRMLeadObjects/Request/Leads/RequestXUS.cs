using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.Request.Leads
{
  public class RequestXUS
  {
    public string companyname { get; set; }
    public string ph_companyidentification { get; set; }
    public string address1_name { get; set; }
    public string country_id { get; set; }
    public string address1_postalcode { get; set; }
    public string emailaddress1 { get; set; }
    public string telephone1 { get; set; }
    public int ph_purchaseintention { get; set; }
    public string firstname { get; set; }
    public string mobilephone { get; set; }
    public string ownerid { get; set; } = "XUS";
    public string lastname { get; set; } 
    public int ph_voluntarydeclarationfundsource { get; set; } = 881980000;
  }
}
