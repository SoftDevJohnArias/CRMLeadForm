using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExternalServices
{
    public class ActiveDirectoryConnection
    {
        private string UrlActiveDirectory;
        public ActiveDirectoryConnection(string urlActiveDirectory)
        {
            this.UrlActiveDirectory = urlActiveDirectory;
        }

        public string GetUser(string userName, string password, ref string error)
        {
            DirectoryEntry entry = null;
            try
            {
                entry = new DirectoryEntry(this.UrlActiveDirectory, userName, password, AuthenticationTypes.Secure);
                using (DirectorySearcher objDirectorySearcher = new DirectorySearcher(entry))
                {
                    //objDirectorySearcher.Filter = $"(SAMAccountName={userName})";
                    //        objDirectorySearcher.PropertiesToLoad.Add("cn");
                    //      SearchResult result = objDirectorySearcher.FindOne();


                    //    return (string)result?.Properties["cn"][0];
                    return null;
                }

            }
            catch (System.DirectoryServices.DirectoryServicesCOMException ex)
            {
                error = ex.ErrorCode.ToString();
                return null;
            }
            finally
            {
                if (entry != null)
                {
                    entry.Close();
                    entry.Dispose();
                }
            }
        }

        public string GetGroups(string displayName, string userName, string password, string groups)
        {
            DirectoryEntry entry = null;

            try
            {
                var validGroups = groups.Split(',');
                StringBuilder groupNames = new StringBuilder();
                entry = new DirectoryEntry(this.UrlActiveDirectory, userName, password, AuthenticationTypes.Secure);
                using (DirectorySearcher search = new DirectorySearcher(entry))
                {
                    search.Filter = "(cn=" + displayName + ")";
                    search.PropertiesToLoad.Add("memberOf");
                    SearchResult result = search.FindOne();

                    for (int i = 0; i < result.Properties["memberOf"].Count; i++)
                    {
                        string memberOf = (string)result.Properties["memberOf"][i];

                        var equalsIndex = memberOf.IndexOf("=", 1);
                        var commaIndex = memberOf.IndexOf(",", 1);

                        groupNames.Append(memberOf.Substring((equalsIndex + 1), (commaIndex - equalsIndex) - 1));
                        groupNames.Append("|");
                    }
                }
                return validGroups.Any(gr => groupNames.ToString().Contains(gr)) ? groupNames.ToString() : string.Empty;
            }
            catch (System.DirectoryServices.DirectoryServicesCOMException ex)
            {
                throw ex;
            }
            finally
            {
                if (entry != null)
                {
                    entry.Close();
                    entry.Dispose();
                }
            }
        }
    }
}
