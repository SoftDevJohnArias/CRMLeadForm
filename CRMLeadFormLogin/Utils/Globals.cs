using System.Configuration;

namespace CRMLeadFormLogin.Utils
{
	public static class Globals
    {
        // App config settings
        public static string ClientId = ConfigurationManager.AppSettings["ida:ClientId"];
        public static string ClientSecret = ConfigurationManager.AppSettings["ida:ClientSecret"];
        public static string AadInstance = ConfigurationManager.AppSettings["ida:AadInstance"];
        public static string Tenant = ConfigurationManager.AppSettings["ida:Tenant"];
		public static string TenantId = ConfigurationManager.AppSettings["ida:TenantId"];
		public static string RedirectUri = ConfigurationManager.AppSettings["ida:RedirectUri"];
        public static string ServiceUrl = ConfigurationManager.AppSettings["api:TaskServiceUrl"];

        // B2C policy identifiers
        public static string SignUpSignInPolicyId = ConfigurationManager.AppSettings["ida:SignUpSignInPolicyId"];
        public static string EditProfilePolicyId = ConfigurationManager.AppSettings["ida:EditProfilePolicyId"];
        public static string ResetPasswordPolicyId = ConfigurationManager.AppSettings["ida:ResetPasswordPolicyId"];

        public static string DefaultPolicy = SignUpSignInPolicyId;
        public static string RedirectUriLogout = ConfigurationManager.AppSettings["ida:RedirectUriLogout"];

    // API Scopes
    public static string ApiIdentifier = ConfigurationManager.AppSettings["api:ApiIdentifier"];
        public static string ReadTasksScope = ApiIdentifier + ConfigurationManager.AppSettings["api:ReadScope"];
        public static string WriteTasksScope = ApiIdentifier + ConfigurationManager.AppSettings["api:WriteScope"];
        public static string[] Scopes = new string[] { ReadTasksScope, WriteTasksScope };

        // OWIN auth middleware constants
        public const string ObjectIdElement = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

    // Authorities
    public static string B2CAuthority = string.Format(AadInstance, Tenant, DefaultPolicy); //"https://intcomexb2c.b2clogin.com/intcomexb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_siginv2";
        public static string WellKnownMetadata = $"{AadInstance}/v2.0/.well-known/openid-configuration";

    }
}