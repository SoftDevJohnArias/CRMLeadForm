using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using DAL;
using CRMLeadObjects.DTO.IWSPortal;
using CRMLeadObjects.DTO.TraxUser;
using Newtonsoft.Json;
using TraxServices.TraxProcess;
using ExternalServices;
using Resorces = CRMLeadObjects.Resources;

namespace BLL
{
    public class UserInfo
    {

        DAL.TraxUser Get = new DAL.TraxUser();
        WSTraxProdClass trax = new WSTraxProdClass();

        public LoginResponse Login(Login login)
        {
            try
            {
                var res = trax.Login(login.User, login.Password).login2_results;
                if (res.wsResult[0].ErrorNo == 0)
                {
                    CRMLeadObjects.DTO.TraxUser.UserInfo UserData = GetUser(login.User);
                    return new LoginResponse(0, res.Login[0].SessionId.ToString(), UserData);
                }
                else
                {
                    return new LoginResponse(res.wsResult[0].ErrorNo, Error: res.wsResult[0].Description.ToString());
                }
            }
            catch (TimeoutException e)
            {
                return new LoginResponse(500, Error: e.Message);
            }
            catch (Exception e)
            {
                return new LoginResponse(501, Error: e.Message);
            }
        }

        public CRMLeadObjects.DTO.TraxUser.UserInfo GetUser(string Id)
        {
            var responseGetWebuser = trax.getWebuser(Id).UserInfo?.FirstOrDefault();
            return new CRMLeadObjects.DTO.TraxUser.UserInfo(responseGetWebuser.USER_ID, responseGetWebuser.e_mail, responseGetWebuser.custid, responseGetWebuser.NAME, (bool)responseGetWebuser.ACTIVE, (bool)responseGetWebuser.admin);
        }

        public string getprafs31sd(string localRecno, string sesionId)
        {
            return trax.getprafs31sd(localRecno, sesionId);
        }
        public UserActiveDirectory SignActiveDirectory(Login objLogin, string group, ref string error)
        {
            UserActiveDirectory objUserActiveDirectory = null;
            string urlActiveDirectory = ConfigurationManager.AppSettings["UrlActiveDirectory"];
            if (string.IsNullOrEmpty(urlActiveDirectory) || string.IsNullOrEmpty(group))
                throw new ArgumentNullException("config Activie Directory Null");

            ActiveDirectoryConnection objActiveDirectoryConnection = new ActiveDirectoryConnection(urlActiveDirectory);

            var loginUser = objActiveDirectoryConnection.GetUser(objLogin.User, objLogin.Password, ref error);
            if (!string.IsNullOrEmpty(error))
            {
                error = error.Equals("-2147023570") ? Resorces.Account.Login.UserOrPassWord : Resorces.General.General.GeneralError;
                return null;
            }

            if (!string.IsNullOrEmpty(loginUser))
            {
                var groups = objActiveDirectoryConnection.GetGroups(loginUser, objLogin.User, objLogin.Password, group);
                if (!string.IsNullOrEmpty(groups))
                {
                    objUserActiveDirectory = new UserActiveDirectory
                    {
                        UserName = loginUser,
                        Groups = groups,
                        User = objLogin.User
                    };
                }
                else
                {
                    error = Resorces.Account.Login.ErrorAccessDenied;
                }
            }


            return objUserActiveDirectory;
        }

        public CRMLeadObjects.DTO.TraxUser.UserInfo GetCustomerByUserName(string userName)
        {
            return GetUser(userName);
        }
        public CRMLeadObjects.DTO.TraxUser.TraxUser GetInfoTraxAuth(string email)
        {
            var responseAuth = MulesoftProcessApi.GetInfoTraxAuth(email);
            return JsonConvert.DeserializeObject<CRMLeadObjects.DTO.TraxUser.TraxUser>(responseAuth); ;
        }
    }
}
