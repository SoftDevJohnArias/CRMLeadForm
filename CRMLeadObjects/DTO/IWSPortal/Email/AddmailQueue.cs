using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.Email
{
    public class AddmailQueue
    {
        public string CustomerId { get; set; }
        public string CompanyId { get; set; }
        public string OrderNumber { get; set; }
        public Dictionary<string, string> EndCustomerEmails { get; set; }
    }
}
