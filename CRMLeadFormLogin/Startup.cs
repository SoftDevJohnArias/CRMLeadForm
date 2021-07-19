using System;
using System.Configuration;
using Microsoft.Owin;
using Owin;


[assembly: OwinStartup(typeof(CRMLeadFormLogin.Startup))]

namespace CRMLeadFormLogin
{
  public partial class Startup
  {
    static readonly string singleSignOnActive = ConfigurationManager.AppSettings["singleSignOnActive"];
    public void Configuration(IAppBuilder app)
    {
      if (Convert.ToBoolean(singleSignOnActive))
        ConfigureAuth(app);
      // Any connection or hub wire up and configuration should go here
      //app.MapSignalR();
    }  
  }
}
