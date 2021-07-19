using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.TraxUser
{
    public class UserInfo
    {
        public UserInfo()
        {

        }
        public UserInfo(string USER_ID, string e_mail, string custid, string NAME, bool ACTIVE, bool admin)
        {
            this.USER_ID = USER_ID;
            this.e_mail = e_mail;
            this.custid = custid;
            this.NAME = NAME;
            this.ACTIVE = ACTIVE;
            this.admin = admin;
        }

        public string USER_ID { get; set; }
        public string e_mail { get; set; }
        public string custid { get; set; }
        public string NAME { get; set; }
        public bool ACTIVE { get; set; }
        public bool admin { get; set; }
    }
}
