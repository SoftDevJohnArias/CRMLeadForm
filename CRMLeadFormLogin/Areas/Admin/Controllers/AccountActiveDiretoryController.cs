using BLL;
using CRMLeadFormLogin.Controllers;
using CRMLeadFormLogin.Models;
using CRMLeadObjects.Controllers;
using CRMLeadObjects.DTO.IWSPortal;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace CRMLeadFormLogin.Areas.Admin.Controllers
{
  public class AccountActiveDiretoryController : MainController
  {


    // GET: Admin/Account
    public ActionResult Login()
    {
      return View();
    }

    /// <summary>
    /// Valida la informacion del usuario al loguearse
    /// </summary>
    /// <param name="userRequest">Request SigIn Active Directory</param>
    /// <returns></returns>
    [HttpPost]
    public JsonResult SignIn(FormCollection form)
    {
      Login userRequest = new Login
      {
        User = form["User"],
        Password = form["Password"]
      };
      try
      {

        string groupActiveDirectory = WebConfigurationManager.AppSettings["GroupsActiveDirectory"];
        string error = string.Empty;
        var objUserActiveDirectory = new UserInfo().SignActiveDirectory(userRequest, groupActiveDirectory, ref error);

        if (!string.IsNullOrEmpty(error))
        {
          return Json(new
          {
            success = false,
            messagge = error,
          });
        }
        if (objUserActiveDirectory == null)
        {
          return Json(new
          {
            success = false,
            messagge = CRMLeadObjects.Resources.General.General.GeneralError,
          });

        }
        /// filter group active directory
        objUserActiveDirectory.Groups = objUserActiveDirectory.Groups.Split('|').First(item => item == groupActiveDirectory);
        Session["userActiveDirectoy"] = objUserActiveDirectory;
        return Json(new
        {
          success = true,
          user = objUserActiveDirectory,
          messagge = "Login succesfully",
        });

      }
      catch (Exception ex)
      {
        //if (ex is System.DirectoryServices.DirectoryServicesCOMException)
        //{

        //}
        return Json(new
        {
          success = false,
          messagge = "err" /*ex.ErrorCode == -2147023570? : ex.Message*/,
        });

      }
    }
  }
}