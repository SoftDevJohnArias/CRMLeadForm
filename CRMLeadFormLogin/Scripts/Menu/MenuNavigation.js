document.addEventListener("DOMContentLoaded", () => {

  //document.getElementById("anchoMenu").addEventListener("click", handleClickAnchorMenu);



  const optionActive = sessionStorage.getItem("optionActive");
  //storage child 
  const optionChilActive = sessionStorage.getItem("optionChilActive");

  //Click options menu
  
  const $optionItems = document.querySelectorAll(".menu  li");

  if ($optionItems) {
    [...$optionItems].forEach(item => {
      if (item.id === optionActive) {
        item.classList.add("active");
      }
      if (item.id === optionChilActive) {
        item.classList.add("active");
      }
      item.addEventListener("click", handleClickOptionParent);
    });
  }

  //Click open menu from option parent
  const $optionsParents = document.querySelectorAll(".menu-navigation .menu li ul");
  if ($optionsParents) {
    [...$optionsParents].forEach(element => {
      element.parentElement.addEventListener("click", handleClickOpenMenu);
    });
  }

  ///GET state menu

  //const storageOpenMenu = sessionStorage.getItem("storageOpenMenu");
  //if (storageOpenMenu) {
  //  const $renderBody = document.querySelector(".render-body");
  //  $renderBody.style.transitionDuration = "0s";
  //  const isMenuOpen = storageOpenMenu === "true";
  //  const $navbarMenu = document.getElementById("NavbarMenu");
  //  $navbarMenu.style.transition = "0s";
  //  if (isMenuOpen) {
  //    $navbarMenu.classList.remove("menu-navigation-anchor");
  //    toggleTooltipColpsedMenu(false);
  //  }
  //  else {
  //    $navbarMenu.classList.add("menu-navigation-anchor");
  //    toggleTooltipColpsedMenu(true);
  //  }

  //  toogleOpenMenu();
  //}


});


//FUNCTIONS 

const showSubMenuItems = (showSubMenu) => {
  let subItem = null;

  if (showSubMenu) {
    subItem = document.querySelector(".menu li.active ul");
    if (subItem) {
      subItem.classList.add("show-menu-parent");
      subItem.classList.remove("hide-menu-parent");
    }
  }
  else {
    subItem = document.querySelector(".menu li ul.show-menu-parent");
    if (subItem) {
      subItem.classList.remove("show-menu-parent");
      subItem.classList.add("hide-menu-parent");
    }
  }
};


const toogleOpenMenu = (isLoad) => {

  const $navbarMenu = document.getElementById("NavbarMenu");
  const hasClassAnchor = $navbarMenu.classList.contains("menu-navigation-anchor");
  const $icon = document.getElementById("iconOpenMenu");
  const $anchoMenu = document.getElementById("anchoMenu");
  const $renderBody = document.querySelector(".render-body");
  if (isLoad) {
    $renderBody.style.transitionDuration = "0.5s";
    $navbarMenu.style.transition = "0.5s";
  }

  if (hasClassAnchor) {
    toggleTooltipColpsedMenu(true);
    sessionStorage.setItem("storageOpenMenu", false);
    $renderBody.style.marginLeft = "60px";
    $navbarMenu.classList.remove("menu-navigation-anchor");
    $navbarMenu.classList.add("menu-navigation");
    $icon.classList.add("icon-ws-ico-min-menu");
    $icon.classList.remove("icon-ws-ico-min-close");
    $anchoMenu.classList.add("anchor-menu");
    $anchoMenu.classList.remove("close-menu");
    showSubMenuItems(false);


  }
  else {
    toggleTooltipColpsedMenu(false);
    sessionStorage.setItem("storageOpenMenu", true);
    $navbarMenu.classList.remove("menu-navigation");
    $navbarMenu.classList.add("menu-navigation-anchor");
    $icon.classList.add("icon-ws-ico-min-close");
    $icon.classList.remove("icon-ws-ico-min-menu");
    $anchoMenu.classList.remove("anchor-menu");
    $anchoMenu.classList.add("close-menu");
    showSubMenuItems(true);
    $renderBody.style.marginLeft = "222px";
  }


  ///
  if (alertNotificaction) {
    alertNotificaction.resizeNotify();
  }

};


//EVENTS

const handleClickAnchorMenu = (e) => {
  toogleOpenMenu(true);
};

const handleClickOptionParent = (e) => {
  

  e.stopPropagation();
  const $elementActive = e.currentTarget.parentElement.querySelectorAll(":scope > li.active");
  if ($elementActive) {

    [...$elementActive].forEach(element => {
      element.classList.remove("active");
    });
  }

  ///Remove childrenElements
  const parent = e.currentTarget.parentElement;
  const $childrenElements = e.currentTarget.querySelector(".hide-menu-parent") && parent.querySelectorAll(".child");
  if ($childrenElements) {
    [...$childrenElements].forEach(element => {
      element.classList.remove("active");
    });
  }


  ///  disabled active sub Items
  const $elementSubItems = parent.querySelector("ul.show-menu-parent");
  if ($elementSubItems) {
    $elementSubItems.classList.remove("show-menu-parent");
    $elementSubItems.classList.add("hide-menu-parent");
  }

  //active option
  e.currentTarget.classList.add("active");


  //verify  select parent option
  const $parentOption = e.currentTarget.querySelector("ul");

  if ($parentOption) {
    $parentOption.classList.add("show-menu-parent");
    $parentOption.classList.remove("hide-menu-parent");

  }

  ///save session storage last url navigation 
  
  if (!e.currentTarget.classList.contains("parent")) {
    sessionStorage.setItem("lastUrlNavigation", e.currentTarget.querySelector("a").href);
  }

  // add to session storage child option
  if (e.currentTarget.classList.contains("child")) {
    sessionStorage.setItem("optionChilActive", e.currentTarget.id);
  } else {
    //save ative to session storage
    sessionStorage.setItem("optionActive", e.currentTarget.id);
  }


};

const handleClickOpenMenu = () => {
  toggleTooltipColpsedMenu(false);
  sessionStorage.setItem("storageOpenMenu", true);
  const $navbarMenu = document.getElementById("NavbarMenu");
  const $anchoMenu = document.getElementById("anchoMenu");
  const $icon = document.getElementById("iconOpenMenu");
  const $renderBody = document.querySelector(".render-body");

  $navbarMenu.classList.remove("menu-navigation");
  $navbarMenu.classList.add("menu-navigation-anchor");
  $icon.classList.add("icon-ws-ico-min-close");
  $icon.classList.remove("icon-ws-ico-min-menu");
  $anchoMenu.classList.remove("anchor-menu");
  $anchoMenu.classList.add("close-menu");
  $renderBody.style.marginLeft = "222px";

  ///
  if (alertNotificaction) {
    alertNotificaction.resizeNotify();
  }
};

const toggleTooltipColpsedMenu = (show) => {
  const $optionsParents = document.querySelectorAll(".menu > li");
  [...$optionsParents].forEach((option) => {
    const text = option.dataset.text;
    option.title = show ? text : "";
  });
};