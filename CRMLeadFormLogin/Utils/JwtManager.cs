using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace CRMLeadObjects.Utils
{
    public static class JwtManager
    {

        private static byte[] secret = null;

        static JwtManager()
        {
            var hmac = new HMACSHA512();
            secret = hmac.Key;

        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                string policyId = ConfigurationManager.AppSettings["ida:SignUpSignInPolicyId"];
                string myTenant = ConfigurationManager.AppSettings["ida:TenantId"]; //"a31370ef-f387-4d13-8c70-b3d4f386e680";
                var audience = ConfigurationManager.AppSettings["ida:ClientId"]; /// "71a7eec8-95d3-4e30-b8ca-d488790de1d5";
                var issuer = ConfigurationManager.AppSettings["Issuer"]; //"https://intcomexb2c.b2clogin.com/tfp/7e5b95fd-b8c9-4ef0-9516-fc6dd5d8c980/b2c_1_siginv2/v2.0/"; ////
                var secret = ConfigurationManager.AppSettings["ida:ClientSecret"]; // "9mqj-3M.t2rMa0psNzT6J~emQ_To_iq6s_";
                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
                var stsDiscoveryEndpoint = String.Format(CultureInfo.InvariantCulture, "https://intcomexb2c.b2clogin.com/intcomexb2c.onmicrosoft.com/{0}/.well-known/openid-configuration?p={1}", myTenant, policyId);
                var configManager = new ConfigurationManager<OpenIdConnectConfiguration>(stsDiscoveryEndpoint, new OpenIdConnectConfigurationRetriever());
                var config = configManager.GetConfigurationAsync().ContinueWith(t => t.Result);
                config.Wait();

                var tokenHandler = new JwtSecurityTokenHandler();

                var validationParameters = new TokenValidationParameters
                {
                    ValidAudience = audience,
                    ValidIssuer = issuer,
                    IssuerSigningKeys = config.Result.SigningKeys,
                    IssuerSigningKey = securityKey,
                    ValidateLifetime = true,
                    LifetimeValidator = CustomLifetimeValidator,
                    RequireExpirationTime = true,
                };

                var validatedToken = (SecurityToken)new JwtSecurityToken();

                // Throws an Exception as the token is invalid (expired, invalid-formatted, etc.)  
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return principal;

            }

            catch (Exception ex)
            {
                return null;
            }
        }

        private static bool CustomLifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken tokenToValidate, TokenValidationParameters @param)
        {
            if (expires != null)
            {
                return expires > DateTime.UtcNow;
            }
            return false;
        }


        /// <summary>
        /// /Gnerate jwt
        /// </summary>
        /// <param name="infoUser"></param>
        /// <param name="expireMinutes"></param>
        /// <returns></returns>
        public static string GenerateTokenIws(IEnumerable<Claim> infoUser, int expireMinutes = 60)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(infoUser),

                Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(secret),
                    SecurityAlgorithms.HmacSha256Signature),

            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        /// <summary>
        /// validate token iws
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static ClaimsPrincipal ValidateTokenIws(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(secret)
                };

                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

                return principal;
            }
            catch (Exception)
            {
                //should write log
                return null;
            }
        }
    }
}
