using System.Web;
using System.Web.Optimization;

namespace CRMLeadFormLogin
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            //* Inicio bundles Script *//

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));


            bundles.Add(new ScriptBundle("~/bundles/GeneralSite").Include(
                   "~/Scripts/AccountMenu/AccountMenu.js",
                   "~/Scripts/Layout/Language.js",
                   "~/Scripts/Session.js"
                   ));

            bundles.Add(new ScriptBundle("~/bundles/ComponentSite").Include(
        "~/Scripts/umd/popper.min.js",
         "~/Scripts/latest/moment.min.js",
         "~/Scripts/daterangepicker/daterangepicker.min.js",
         "~/Scripts/awesomplete/awesomplete.min.js"
         ));

            //* Inicio bundles style *//

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/ComponentSitecss").Include(
                 "~/Content/daterangepicker/daterangepicker.css",
                 "~/Content/awesomplete/awesomplete.min.css",
                 "~/Content/login/style.css"));



#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
                        // Code removed for clarity.
                        BundleTable.EnableOptimizations = true;
#endif

        }
    }




}
