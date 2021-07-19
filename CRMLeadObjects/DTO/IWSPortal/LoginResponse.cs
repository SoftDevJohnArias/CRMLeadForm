using CRMLeadObjects.DTO.TraxUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal
{
    public class LoginResponse
    {
        public EnumResponses ResponseStatus { get; } = EnumResponses.UnKnownError;
        public string SessionId { get; } = null;
        public UserInfo UserData { get; } = null;
        public string ErrorDescription { get; } = null;

        public LoginResponse(int status, string SessionId = null, UserInfo UserData = null, string Error = null)
        {
            switch (status)
            {
                case 0:
                    ResponseStatus = EnumResponses.LoginOk;
                    this.SessionId = SessionId;
                    this.UserData = UserData;

                    break;
                case 21:
                    ResponseStatus = EnumResponses.InvalidUser;
                    this.ErrorDescription = Error;
                    break;
                case 22:

                    ResponseStatus = EnumResponses.InvalidPassword;
                    this.ErrorDescription = Error;
                    break;
                case 23:
                    ResponseStatus = EnumResponses.UserInactive;
                    this.ErrorDescription = Error;
                    break;
                case 500:
                    ResponseStatus = EnumResponses.TimeOut;
                    break;

                default:
                    this.ErrorDescription = Error;
                    break;
            }
        }
    }
}
