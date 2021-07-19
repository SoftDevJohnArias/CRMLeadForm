using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.Email
{
    public class GetProductKeyForOrderResult
    {
        public string LinkUrl { get; set; }
        public string ProductKey { get; set; }
        public string CustomerOrderNumber { get; set; }
    }
}