using CRMLeadObjects.DTO.TraxUser;
using System;
using System.Security.Principal;


namespace CRMLeadFormLogin.Models
{
    public class CustomPrincipal : IPrincipal
    {
        public IIdentity Identity { get; private set; }
        public bool IsInRole(string role) { return false; }
        public CustomPrincipal(string name)
        {
            this.Identity = new GenericIdentity(name);
        }


        public string SessionId { get; set; }
        public string FirtName { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public string LoginActiveDirectory { get; set; }
        public string GroupsActiveDirectory { get; set; }
        public Guid ApiKey;
        public string CurrencyId { get; set; }
        public string CompanyId { get; set; }





    }
}