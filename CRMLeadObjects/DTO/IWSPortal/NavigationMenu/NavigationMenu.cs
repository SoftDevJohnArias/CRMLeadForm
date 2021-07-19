using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMLeadObjects.DTO.IWSPortal.NavigationMenu
{
    public class NavigationMenu
    {
        public string IdRecurso { get; set; }
        public string Controlador { get; set; }
        public string Accion { get; set; }
        public string Icono { get; set; }
        public string Texto { get; set; }
        public int Id { get; set; }
        public int? IdPadre { get; set; }
        public int OrdenRenderizado { get; set; }


    }
}
