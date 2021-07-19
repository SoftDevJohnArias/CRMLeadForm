using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.TraxUser
{
    public enum EnumResponses
    {
        LoginOk = 0,
        InvalidUser = 21,
        InvalidPassword = 22,
        UserInactive = 23,
        TimeOut = 500,
        UnKnownError = 501
    }
}
