using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices
{
    public class ResponseWebUser
    {
        public bool IsSuccess { get; set; }
        public ExternalServices.WSTraxProd.getWebuser_tweb_userRow[] UserInfo { get; set; }
    }
}
