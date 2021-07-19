// EVENTS


document.addEventListener("DOMContentLoaded", () => {

  const $btnAccountMenu = document.getElementById("btnAccountMenu");
  const $closeAccountMenu = document.getElementById("closeAccountMenu");
  if ($btnAccountMenu) {
    $btnAccountMenu.addEventListener("click", handleClickOpenAcountMenu);
  }

  if ($closeAccountMenu) {
    $closeAccountMenu.addEventListener("click", handleClickCloseAcccountMenu);
  }

  const $logout = document.getElementById("logout");
  if ($logout) {
    $logout.addEventListener("click", handleClickLogout);
  }

});

//module

const moduleMenu = (() => {

  const getElementMenu = () => {
    return document.getElementById("menuAccount");
  };

  return {
    getElementMenu
  };

})();


//Events
const handleClickOpenAcountMenu = (e) => {
  
  toggleMenu(true);
  document.addEventListener("click", handleClickOutMenu);
  zE.hide();


};

const handleClickCloseAcccountMenu = () => {
  toggleMenu(false);
  document.removeEventListener("click", handleClickOutMenu);
  zE.show(); 

};

const handleClickLogout = () => {
  sessionStorage.removeItem("lastUrlNavigation");
  sessionStorage.removeItem("optionChilActive");
  sessionStorage.removeItem("optionActive");
  sessionStorage.removeItem("storageOpenMenu");
};

const handleClickOutMenu = (evDocument) => {
  
  const $menuAccount = moduleMenu.getElementMenu();
  const $btnAccountMenu = document.getElementById("btnAccountMenu");
  if (!$menuAccount.contains(evDocument.target) && !$btnAccountMenu.contains(evDocument.target)) {
    
    toggleMenu(false);
    zE.show(); 
    document.removeEventListener("click", handleClickOutMenu);
  }
};


//functions

const toggleMenu = (showMenu) => {

  const $menuAccount = moduleMenu.getElementMenu();
  const $containerAccountMenu = document.getElementById("containerAccountMenu");

  $menuAccount.style.width = showMenu ? "250px" : "0";
  $containerAccountMenu.classList.toggle("transparent-body");
};


