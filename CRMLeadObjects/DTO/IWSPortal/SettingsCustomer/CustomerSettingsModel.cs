using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.SettingsCustomer
{
    public class CustomerSettingsModel
    {
        public string CustomerId { get; set; }
        public string SettingId { get; set; }
        public string Value { get; set; }
        public DateTime LastUpdated { get; set; }
        public string UpdatedBy { get; set; }
    }
}
