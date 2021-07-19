using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRMLeadFormLogin.Models
{
    public class MapaRutaURL
    {
        public string currentLanguageId { get; set; }
        public string currentController { get; set; }
        public string currentAction { get; set; }

        public MapaRutaURL()
        {

        }

        public MapaRutaURL(string currentLanguageId, string currentController, string currentAction)
        {
            this.currentLanguageId = currentLanguageId;
            this.currentController = currentController;
            this.currentAction = currentAction;
        }
    }
}