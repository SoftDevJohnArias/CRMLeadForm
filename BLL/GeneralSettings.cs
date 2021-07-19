using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BLL
{
    public static class GeneralSettings
    {
        public static CultureInfo setCulture(string locale)
        {
            CultureInfo culture = null;
            switch (locale)
            {
                case "en":
                    culture = CultureInfo.CreateSpecificCulture("en-US");
                    break;
                case "pt":
                    culture = CultureInfo.CreateSpecificCulture("pt-BR");
                    break;
                default:
                    culture = CultureInfo.CreateSpecificCulture("es-CO");
                    break;
            }
            CultureInfo.DefaultThreadCurrentCulture = culture;
            CultureInfo.DefaultThreadCurrentUICulture = culture;
            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = culture;
            return culture;
        }

    }

}

