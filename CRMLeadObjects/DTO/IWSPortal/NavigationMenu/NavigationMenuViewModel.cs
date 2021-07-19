using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.NavigationMenu
{
    public class NavigationMenuViewModel
    {
        public string IdRecurso { get; set; }
        public string Text { get; set; }
        public string Controller { get; set; }
        public string Action { get; set; }
        public string Icon { get; set; }
        public ICollection<NavigationMenuViewModel> Children { get; set; }
    }
}
