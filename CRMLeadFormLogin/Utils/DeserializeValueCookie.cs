using CRMLeadFormLogin.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace CRMLeadFormLogin.Utils
{
  public static class DeserializeValueCookie
  {

    public static CustomPrincipalSerialize Deserialize(string valueCookie)
    {

      string singleSignOnActive = ConfigurationManager.AppSettings["singleSignOnActive"];
      bool.TryParse(singleSignOnActive, out var isSingleSignOn);

      System.Web.Script.Serialization.JavaScriptSerializer serializer = new JavaScriptSerializer();

      if (isSingleSignOn)
        return serializer.Deserialize<CustomPrincipalSerialize>(valueCookie);
      else
      {
        var valueCookieDecrypt = System.Web.Security.FormsAuthentication.Decrypt(valueCookie);
        return serializer.Deserialize<CustomPrincipalSerialize>(valueCookieDecrypt.UserData);
      }

    }

  }
}