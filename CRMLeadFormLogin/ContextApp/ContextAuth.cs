using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRMLeadFormLogin.ContextApp
{
  public class ContextAuth
  {
    public static ContextAuth Instance { get; private set; }

    public string jwt { get; set; }

    private ContextAuth(string jwt)
    {
      this.jwt = jwt;
      /* … */
    }

    public static void Init(string jwt)
    {
      Instance = new ContextAuth(jwt);
    }


    public static void Clear()
    {
      Instance = null;
    }


  }
}