using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Notifications;
using Microsoft.Owin.Security.OpenIdConnect;
using Owin;
using System;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using CRMLeadFormLogin.Utils;
using System.Configuration;
using BLL;
using Microsoft.Ajax.Utilities;
using CRMLeadObjects.DTO.TraxUser;
using System.Web;
using Microsoft.Owin;
using CRMLeadFormLogin.ContextApp;
using System.Threading;

namespace CRMLeadFormLogin
{
    public partial class Startup
    {

        // App config settings
        public static string ClientId = ConfigurationManager.AppSettings["ida:ClientId"];
        public static string WellKnownMetadata = ConfigurationManager.AppSettings["ida:MetadataEndpoint"];
        public static string RedirectUri = ConfigurationManager.AppSettings["ida:RedirectUri"];

        // B2C policy identifiers
        public static string SignUpSignInPolicyId = ConfigurationManager.AppSettings["ida:SignUpSignInPolicyId"];
        public static string EditProfilePolicyId = ConfigurationManager.AppSettings["ida:EditProfilePolicyId"];
        public static string ResetPasswordPolicyId = ConfigurationManager.AppSettings["ida:ResetPasswordPolicyId"];

        public static string DefaultPolicy = SignUpSignInPolicyId;


        // The OWIN middleware will invoke this method when the app starts
        public void ConfigureAuth(IAppBuilder app)
        {
            // Required for Azure webapps, as by default they force TLS 1.2 and this project attempts 1.0
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {
                    // Generate the metadata address using the tenant and policy information
                    MetadataAddress = WellKnownMetadata,

                    // These are standard OpenID Connect parameters, with values pulled from web.config
                    ClientId = ClientId,
                    RedirectUri = RedirectUri,
                    PostLogoutRedirectUri = RedirectUri,

                    // Specify the callbacks for each type of notifications
                    Notifications = new OpenIdConnectAuthenticationNotifications
                    {
                        RedirectToIdentityProvider = OnRedirectToIdentityProvider,
                        AuthenticationFailed = OnAuthenticationFailed,
                        AuthorizationCodeReceived = OnAuthorizationCodeReceived,
                        SecurityTokenReceived = OnSecurityTokenReceived
                    },

                    // Specify the claim type that specifies the Name property.
                    TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "name",
                        ValidateIssuer = false
                    },

                    // Specify the scope by appending all of the scopes requested into one string (separated by a blank space)
                    Scope = OpenIdConnectScope.OpenIdProfile
                }
            );
        }

        /*
        *  On each call to Azure AD B2C, check if a policy (e.g. the profile edit or password reset policy) has been specified in the OWIN context.
        *  If so, use that policy when making the call. Also, don't request a code (since it won't be needed).
        */
        private Task OnRedirectToIdentityProvider(RedirectToIdentityProviderNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> notification)
        {
            var isAuthenticationReq = notification.ProtocolMessage.RequestType == OpenIdConnectRequestType.Authentication;
            if (isAuthenticationReq && IsAjaxRequest(notification.Request))
            {
                notification.HandleResponse();
            }
            else
            {
                var policy = notification.OwinContext.Get<string>("Policy");

                if (!string.IsNullOrEmpty(policy) && !policy.Equals(DefaultPolicy))
                {
                    notification.ProtocolMessage.Scope = OpenIdConnectScope.OpenId;
                    notification.ProtocolMessage.ResponseType = OpenIdConnectResponseType.IdToken;
                    notification.ProtocolMessage.IssuerAddress = notification.ProtocolMessage.IssuerAddress.ToLower().Replace(DefaultPolicy.ToLower(), policy.ToLower());
                }
            }
            notification.ProtocolMessage.UiLocales = Thread.CurrentThread.CurrentUICulture.Name.Substring(0, 2);
            return Task.FromResult(0);
        }

        /*
         * Catch any failures received by the authentication middleware and handle appropriately
         */
        private Task OnAuthenticationFailed(AuthenticationFailedNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> notification)
        {
            notification.HandleResponse();

            // Handle the error code that Azure AD B2C throws when trying to reset a password from the login page
            // because password reset is not supported by a "sign-up or sign-in policy"
            if (notification.ProtocolMessage.ErrorDescription != null && notification.ProtocolMessage.ErrorDescription.Contains("AADB2C90118"))
            {
                // If the user clicked the reset password link, redirect to the reset password route
                notification.Response.Redirect("/Account/ResetPassword");
            }
            else if (notification.Exception.Message == "access_denied")
            {
                notification.Response.Redirect("/");
            }
            else
            {
                notification.Response.Redirect("/Account/Login");
            }

            return Task.FromResult(0);
        }

        private Task OnAuthorizationCodeReceived(AuthorizationCodeReceivedNotification notification)
        {
            try
            {



                ContextAuth.Init(notification.JwtSecurityToken.RawData);

                //IConfidentialClientApplication confidentialClient = MsalAppBuilder.BuildConfidentialClientApplication(new ClaimsPrincipal(notification.AuthenticationTicket.Identity));

                notification.Response.Redirect("/Account/Login");
                return Task.FromResult(0);
                /*
                         The `MSALPerUserMemoryTokenCache` is created and hooked in the `UserTokenCache` used by `IConfidentialClientApplication`.
                         At this point, if you inspect `ClaimsPrinciple.Current` you will notice that the Identity is still unauthenticated and it has no claims,
                         but `MSALPerUserMemoryTokenCache` needs the claims to work properly. Because of this sync problem, we are using the constructor that
                         receives `ClaimsPrincipal` as argument and we are getting the claims from the object `AuthorizationCodeReceivedNotification context`.
                         This object contains the property `AuthenticationTicket.Identity`, which is a `ClaimsIdentity`, created from the token received from
                         Azure AD and has a full set of claims.
                         //*/

                //   // Upon successful sign in, get & cache a token using MSAL
                // AuthenticationResult result = await confidentialClient.AcquireTokenByAuthorizationCode(CRMLeadFormLogin.Utils.Globals.Scopes, notification.Code).ExecuteAsync();
                //   var response = new UserInfo().GetInfoUser("");

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    ReasonPhrase = $"Unable to get authorization code {ex.Message}."
                });
            }
        }

        private Task OnSecurityTokenReceived(SecurityTokenReceivedNotification<OpenIdConnectMessage, OpenIdConnectAuthenticationOptions> notification)
        {
            try
            {

                //var claim = new System.Collections.Generic.List<Claim>
                //{
                //  new Claim("JWT",notification.ProtocolMessage.IdToken)
                //};

                //ClaimsIdentity claimsIdentity = new ClaimsIdentity();
                //claimsIdentity.AddClaims(claim);

                //notification.Response.Context.Authentication.User.AddIdentity(claimsIdentity);
                //notification.OwinContext.Authentication.User.AddIdentity(claimsIdentity);
                //notification.OwinContext.Response.Headers.Append("JWT1", notification.ProtocolMessage.IdToken);


                //System.Web.HttpContext.Current.Application.Add("JWT", notification.ProtocolMessage.IdToken);

                ContextAuth.Init(notification.ProtocolMessage.IdToken);


                notification.Response.Redirect("/Account/Login");
                return Task.FromResult(0);


                //var co = System.Web.HttpContext.Current.GetOwinContext();
                //co.Authentication.User.AddIdentity(claimsIdentity);
                //co.Response.Headers.Append("JWT1", notification.ProtocolMessage.IdToken);


            }
            catch (Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    ReasonPhrase = $"Unable to get authorization code {ex.Message}."
                });
            }
        }


        private static bool IsAjaxRequest(IOwinRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }



            IHeaderDictionary headers = request.Headers;

            if (headers != null)
            {

                var contentType = headers["Content-Type"];

                if (contentType != null)
                {

                    return true;
                    //var ct = contentType.ToLowerInvariant();

                    //return (ct == "application/json" || ct == "text/json" || ct == "application/xml" || ct == "text/xml" || headers["X-Requested-With"] == "XMLHttpRequest");
                }

            }

            return false;
        }
    }
}