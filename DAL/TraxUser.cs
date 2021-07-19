using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMLeadObjects.DTO;
using CRMLeadObjects.DTO.IWSPortal;
using CRMLeadObjects.DTO.TraxUser;


namespace DAL
{
    public class TraxUser
    {
        /*     WSTraxProdClass trax = new WSTraxProdClass();
             public LoginResponse Login(Login login)
             {
                 try
                 {
                     var res = trax.Login(login.User, login.Password).login2_results;
                     if (res.wsResult[0].ErrorNo == 0)
                     {
                         UserInfo UserData = GetUser(login.User);
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
             public UserInfo GetUser(string Id)
             {
                 var a = trax.getWebuser(Id).UserInfo;
                 var User = TinyMapper.Map<UserInfo>(a[0]);
                 return User;
             }

             public string getprafs31sd(string localRecno, string sesionId)
             {
                return trax.getprafs31sd(localRecno, sesionId);

             }
    */     }
    
}