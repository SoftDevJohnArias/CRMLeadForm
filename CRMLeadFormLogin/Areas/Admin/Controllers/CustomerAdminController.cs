using BLL;
using CRMLeadFormLogin.Controllers;
using CRMLeadFormLogin.Models;
using CRMLeadFormLogin.Utils;
using CRMLeadObjects.DTO.TraxUser;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Resources = CRMLeadObjects.Resources;
using CRMLeadFormLogin.ContextApp;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using CRMLeadObjects.Utils;

namespace CRMLeadFormLogin.Areas.Admin.Controllers
{
  [AllowAnonymous]
  public class CustomerAdminController : Controller
  {
    static readonly double sessionTime = Convert.ToDouble(ConfigurationManager.AppSettings["SessionTime"].ToString());
    static readonly double ExpiresCookie = Convert.ToDouble(ConfigurationManager.AppSettings["ExpiresCookie"].ToString());

    private const string _AccessToken = "access-token";
    [HttpGet]
    public JsonResult GetSimulateCustomer(string customer, string language)
    {
      try
      {
        var user = new BLL.UserInfo().GetCustomerByUserName(customer);
        if (user == null)
        {
          return Json(new
          {
            success = false,
            messagge = "No se encontro el customer",
          }, JsonRequestBehavior.AllowGet);
        }

        //Obtenemos la session del directorioactivo
        UserActiveDirectory dataActiveDirectory = new UserActiveDirectory();
        if (Session["userActiveDirectoy"] != null)
        {
          dataActiveDirectory = (UserActiveDirectory)Session["userActiveDirectoy"];

        }

        SettingsCustomerBLL settingsCustomerBLL = new SettingsCustomerBLL();

        var customerInfo = settingsCustomerBLL.GetCustomerById(customer);
        var customerSettings = settingsCustomerBLL.SetDictSettings(settingsCustomerBLL.GetCustomerSettings(customer));
        if (customerInfo.Customer.Status != "a")
        {
          return Json(new
          {
            success = false,
            messagge = "El cliente no se encuentra activo",
          }, JsonRequestBehavior.AllowGet);
        }

        CustomPrincipalSerialize SerializeModel = new CustomPrincipalSerialize()
        {
          Email = user.e_mail,
          FirtName = user.NAME,
          UserId = customerInfo.Customer.CustomerId,
          LoginActiveDirectory = dataActiveDirectory.User,
          GroupsActiveDirectory = dataActiveDirectory.Groups,
          CompanyId = customerInfo?.Customer?.CompanyId,
          ApiKey = customerInfo.Customer.ApiKey,
          CurrencyId = customerInfo.Customer.CurrencyId,
          ValueSetting = customerSettings
        };


        JavaScriptSerializer serializer = new JavaScriptSerializer();
        //string jsonObject = serializer.Serialize(SerializeModel);
        var jsonObject = JsonConvert.SerializeObject(SerializeModel);


        FormsAuthenticationTicket Authticket = new FormsAuthenticationTicket(
            1,
            user.NAME,
            DateTime.Now,
            DateTime.Now.AddMinutes(sessionTime),
            false,
            jsonObject);
        string EncriptedTicket = FormsAuthentication.Encrypt(Authticket);
        HttpCookie Cookie = new HttpCookie(FormsAuthentication.FormsCookieName, EncriptedTicket);
        Response.Cookies.Add(Cookie);

        //token
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

        return Json(new
        {
          success = true,
          messagge = "Get customer successfully",
          urlRedirect = Url.Action("Index", "AdminHome", new { language, area = string.Empty })
        }, JsonRequestBehavior.AllowGet);
      }
      catch (Exception ex)
      {
        return Json(new
        {
          success = false,
          messagge = Resources.Account.Login.UserNotFound,
        }, JsonRequestBehavior.AllowGet);

      }
    }
  }
}