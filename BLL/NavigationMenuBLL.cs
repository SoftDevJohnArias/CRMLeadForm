using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMLeadObjects.DTO.IWSPortal.NavigationMenu;
using CRMLeadObjects.DTO.Utils;
using DAL.NavigationMenuDAL;

namespace BLL
{
    public class NavigationMenuBLL
    {

        public ICollection<NavigationMenuViewModel> GetMenu(MenuType menuType)
        {
            var dalObject = new NavigationMenuDAL();
            var queryResults = dalObject.GetNavigationMenu(menuType);
            var menu = CreateMenuViewModelFromNavigationMenu(queryResults.ListResults);
            return menu;
        }

        public IEnumerable<NavigationMenu> GetOptionsMenu(MenuType menuType)
        {
            var dalObject = new NavigationMenuDAL();
            return (IEnumerable<NavigationMenu>)dalObject.GetNavigationMenu(menuType).ListResults;
        }

        public NavigationMenuViewModel CreateViewModelItem(NavigationMenu current)
        {
            var newItem = new NavigationMenuViewModel
            {
                IdRecurso = current.IdRecurso,
                Text = current.Texto,
                Action = current.Accion,
                Children = new List<NavigationMenuViewModel>(),
                Controller = current.Controlador,
                Icon = current.Icono
            };
            return newItem;
        }



        public ICollection<NavigationMenuViewModel>
            CreateMenuViewModelFromNavigationMenu(
                IEnumerable<NavigationMenu> navMenu,
                int? rootId = null)
        {
            var Items =
                navMenu.
                Where(item => item.IdPadre == rootId).
                OrderBy(item => item.OrdenRenderizado).
                Select(current =>
                {
                    var newItem = CreateViewModelItem(current);
                    newItem.Children = CreateMenuViewModelFromNavigationMenu(navMenu, current.Id);
                    return newItem;
                }).
                ToList();

            return Items;
        }
    }
}
