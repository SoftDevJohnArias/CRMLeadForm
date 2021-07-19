using CRMLeadObjects.DTO.IWSPortal;
using CRMLeadObjects.DTO.TraxUser;
using System;
using System.Web.Configuration;
using Resources = CRMLeadObjects.Resources;

namespace DAL
{
    public class ActiveDirectoryDAL
    {
    /*    public UserActiveDirectory SigInActiveDirectory(Login objLogin, string group, ref string error)
        {
            UserActiveDirectory objUserActiveDirectory = null;
            string urlActiveDirectory = WebConfigurationManager.AppSettings["UrlActiveDirectory"];
          

            if (string.IsNullOrEmpty(urlActiveDirectory) || string.IsNullOrEmpty(group))
                throw new ArgumentNullException("config Activie Directory Null");

            ActiveDirectoryConnection objActiveDirectoryConnection = new ActiveDirectoryConnection(urlActiveDirectory);

            var loginUser = objActiveDirectoryConnection.GetUser(objLogin.User, objLogin.Password, ref error);
            if (!string.IsNullOrEmpty(error))
            {
                error = error.Equals("-2147023570") ? Resources.Account.Login.UserOrPassWord : Resources.General.General.GeneralError;
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
                    error = Resources.Account.Login.ErrorAccessDenied;
                }
            }


            return objUserActiveDirectory;
        }*/
    }
}
