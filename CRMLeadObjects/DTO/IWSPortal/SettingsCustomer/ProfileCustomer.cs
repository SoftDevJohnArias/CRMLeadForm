using CRMLeadObjects.DTO.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.SettingsCustomer
{
    public class ProfileCustomer
    {
        public string CustomerId { get; set; }
        public string Description { get; set; }
        public string CompanyId { get; set; }
        public string Status { get; set; }
        public bool Active
        {
            get { return this.Status == StatusCustomer.a.ToString(); }

        }
        public string Afiliate
        {
            get { return $"{this.CompanyId} {this.Alias}"; }

        }
        public Guid AccessKey { get; set; }
        public Guid ApiKey { get; set; }
        public string Alias { get; set; }
        public string CustomerType { get; set; }
        public string ValueSettings { get; set; }
        public string CurrencyId { get; set; }
        public Dictionary<string, string> ValueSetting { get; set; }

    }

}
