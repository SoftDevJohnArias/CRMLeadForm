using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRMLeadObjects.DTO.IWSPortal;
using BLL;
using System.Web.Security;
using System.Web.Script.Serialization;
using System.Configuration;
using Microsoft.Owin.Security;
using System.IO;
using CRMLeadFormLogin.Utils;

using System.Net.Http;
using System.Net;
using Microsoft.Ajax.Utilities;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security.Cookies;
using System.Threading.Tasks;
using Microsoft.Owin.Security.Notifications;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using CRMLeadFormLogin.ContextApp;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Newtonsoft.Json;
using System.Threading;
using CRMLeadObjects.Controllers;
using CRMLeadFormLogin;
using CRMLeadFormLogin.Models;
using CRMLeadObjects.Utils;

namespace CRMLeadFormLogin.Controllers
{

    public class AccountController : MainController
    {
        static readonly double sessionTime = Convert.ToDouble(ConfigurationManager.AppSettings["SessionTime"].ToString());
        static readonly double ExpiresCookie = Convert.ToDouble(ConfigurationManager.AppSettings["ExpiresCookie"].ToString());
        static readonly string singleSignOnActive = ConfigurationManager.AppSettings["singleSignOnActive"];

        private const string _AccessToken = "access-token";
        public void SignUpSignIn(string redirectUrl)
        {
            redirectUrl = redirectUrl ?? "/";

            //redirectUrl = redirectUrl ?? Thread.CurrentThread.CurrentUICulture.Name.Substring(0, 2) + "/AdminHome/Index";

            // Use the default policy to process the sign up / sign in flow
            HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = redirectUrl });
            return;
        }


        public ActionResult Login()
        {
            try
            {



                Session["error"] = "";

                var jwt = ContextAuth.Instance?.jwt; //((System.Security.Claims.ClaimsIdentity)User.Identity).FindFirst("JWT");

                var email = ((System.Security.Claims.ClaimsIdentity)User.Identity).FindFirst("emails");

                if (jwt == null || email == null)
                {
                    return View();
                }

                HttpCookie authCookieT = Request.Cookies[_AccessToken];

                var userResult = new UserInfo().GetInfoTraxAuth(email.Value);
                string customerId = userResult?.data.user.user_id;
                customerId = "XCBSOL4005";
                if (!string.IsNullOrEmpty(customerId))
                {
                    SettingsCustomerBLL settingsCustomerBLL = new SettingsCustomerBLL();
                    var user = new BLL.UserInfo().GetCustomerByUserName(customerId);
                    var customerInfo = settingsCustomerBLL.GetCustomerById(customerId);
                    var customerSettings = settingsCustomerBLL.SetDictSettings(settingsCustomerBLL.GetCustomerSettings(customerId));


                    if (authCookieT == null || authCookieT.Expires < DateTime.UtcNow)
                    {
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        string userData = serializer.Serialize(new
                        {
                            accesToken = jwt,
                            Email = user.e_mail,
                            FirtName = user.NAME,
                            UserId = customerInfo.Customer.CustomerId,
                            LoginActiveDirectory = string.Empty,
                            GroupsActiveDirectory = string.Empty,
                            CompanyId = customerInfo?.Customer?.CompanyId,
                            ApiKey = customerInfo.Customer.ApiKey,
                            CurrencyId = customerInfo.Customer.CurrencyId,
                            ValueSetting = customerSettings,
                            SessionId = string.Empty
                        });

                        HttpCookie Cookie = new HttpCookie(_AccessToken, userData);
                        Cookie.Expires = DateTime.Now.AddMinutes(ExpiresCookie);
                        Response.Cookies.Add(Cookie);
                    }
                }
                else
                {
                    Session["error"] = "No se pudo obtener el customer del usuario";
                }

            }
            catch (Exception ex)
            {

                Session["error"] = "Ocurrió un error:" + "-" + ex.Message;
            }
            return RedirectToAction("Index", "AdminHome");
            //HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            //if (authCookie == null)
            //{
            //  return View();
            //}
            //else
            //{
            //  FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            //  if (authTicket.Expired)
            //  {
            //    return View();
            //  }
            //  else
            //  {
            //    return RedirectToAction("Index", "AdminHome");
            //  }

            //}
        }

        public void ResetPassword()
        {
            // Let the middleware know you are trying to use the reset password policy (see OnRedirectToIdentityProvider in Startup.Auth.cs)
            HttpContext.GetOwinContext().Set("Policy", Startup.ResetPasswordPolicyId);

            // Set the page to redirect to after changing passwords
            var authenticationProperties = new AuthenticationProperties { RedirectUri = "/" };
            HttpContext.GetOwinContext().Authentication.Challenge(authenticationProperties);

            return;
        }

        /// <summary>
        /// Valida la informacion del usuario al loguearse
        /// </summary>
        /// <param name="userRequest">Request Modelo de datos de ingreso de logueo</param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ValidateUser(Login userRequest)
        {

            UserInfo userInfo = new UserInfo();
            LoginResponse user = userInfo.Login(userRequest);

            if (user.SessionId == null)
            {
                //ViewData["Auntentication"] = false;
                ViewBag.error = CRMLeadObjects.Resources.Account.Login.UserOrPassWord;
                //return RedirectToAction("Login", "Account");
                //return View("Login");

                //return Json(new
                //{
                //  success= false,
                //  message = "User not found"

                //});

                //ViewData["Auntentication"] = false;
                ViewBag.error = CRMLeadObjects.Resources.Account.Login.UserOrPassWord;
                //return RedirectToAction("Login", "Account");
                return View("Login");
            }

            SettingsCustomerBLL settingsCustomerBLL = new SettingsCustomerBLL();
            var customerInfo = settingsCustomerBLL.GetCustomerById(user.UserData.USER_ID);
            var customerSettings = settingsCustomerBLL.SetDictSettings(settingsCustomerBLL.GetCustomerSettings(customerInfo.Customer.CustomerId));

            var userModel = new CustomPrincipalSerialize()
            {
                SessionId = user.SessionId,
                Email = user.UserData.e_mail,
                FirtName = user.UserData.NAME,
                UserId = user.UserData.custid,
                LoginActiveDirectory = string.Empty,
                GroupsActiveDirectory = string.Empty,
                ApiKey = customerInfo.Customer.ApiKey,
                CurrencyId = customerInfo.Customer.CurrencyId,
                ValueSetting = customerSettings,
                CompanyId = customerInfo.Customer.CompanyId
            };

            var jsonObject = JsonConvert.SerializeObject(userModel);


            FormsAuthenticationTicket Authticket = new FormsAuthenticationTicket(
                1,
                user.UserData.NAME,
                DateTime.Now,
                DateTime.Now.AddMinutes(sessionTime),
                false,
              jsonObject);
            string EncriptedTicket = FormsAuthentication.Encrypt(Authticket);
            HttpCookie Cookie = new HttpCookie(FormsAuthentication.FormsCookieName, EncriptedTicket);
            Response.Cookies.Add(Cookie);


            List<Claim> infoUser = new List<Claim>() {
          new Claim("user", jsonObject.ToString()),
      };

            var token = JwtManager.GenerateTokenIws(infoUser);

            var objJson = JsonConvert.SerializeObject(new
            {
                accesToken = token,
            });



            HttpCookie CookieToken = new HttpCookie(_AccessToken, objJson);
            Cookie.Expires = DateTime.Now.AddMinutes(ExpiresCookie);
            Response.Cookies.Add(CookieToken);

            //return Json(new
            //{
            //  success = true,
            //  messagge = "Login successfully",
            //  urlRedirect = Url.Action("index", "AdminHome"),
            //  token
            //});

            return RedirectToAction("Index", "AdminHome");
        }

        [HttpGet]
        public ActionResult Logout()
        {

            HttpCookie myCookie = new HttpCookie(_AccessToken);
            myCookie.Expires = DateTime.UtcNow.AddDays(-1);
            HttpContext.Request.Cookies.Clear();
            bool.TryParse(singleSignOnActive, out var isSingleSignOn);

            ContextAuth.Clear();
            if (!isSingleSignOn)
            {
                FormsAuthentication.SignOut();

                if (Session["userActiveDirectoy"] != null)
                {
                    Session["userActiveDirectoy"] = null;
                    return RedirectToAction("Login", "AccountActiveDiretory", new { Area = "Admin" });
                }
                else
                    return RedirectToAction("Login", "Account");

            }
            else
            {
                HttpContext.GetOwinContext().Authentication.SignOut(
                    new AuthenticationProperties { RedirectUri = CRMLeadFormLogin.Utils.Globals.RedirectUriLogout },
                    OpenIdConnectAuthenticationDefaults.AuthenticationType,
                    CookieAuthenticationDefaults.AuthenticationType);

                return RedirectToAction("Login", "Account");
            }


        }

        public async Task EndSession()
        {
            // If AAD sends a single sign-out message to the app, end the user's session, but don't redirect to AAD for sign out.
            //HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            await MsalAppBuilder.ClearUserTokenCache();
            IEnumerable<AuthenticationDescription> authTypes = HttpContext.GetOwinContext().Authentication.GetAuthenticationTypes();
            HttpContext.GetOwinContext().Authentication.SignOut(authTypes.Select(t => t.AuthenticationType).ToArray());
            Request.GetOwinContext().Authentication.GetAuthenticationTypes();

        }

    }
}
