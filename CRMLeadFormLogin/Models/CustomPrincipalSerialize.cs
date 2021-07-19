using CRMLeadObjects.DTO.TraxUser;
using System;
using System.Collections.Generic;

namespace CRMLeadFormLogin.Models
{
  public class CustomPrincipalSerialize
  {
    public string SessionId { get; set; }
    public string FirtName { get; set; }
    public string Email { get; set; }
    public string UserId { get; set; }
    public string LoginActiveDirectory { get; set; }
    public string GroupsActiveDirectory { get; set; }
    public string CompanyId { get; set; }
    public Guid ApiKey { get; set; }
    public string CurrencyId { get; set; }
    public Dictionary<string,string> ValueSetting{ get; set; }
  }
}