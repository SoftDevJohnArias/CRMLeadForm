const menuMain = (() => {

  const storage = {
    parentId: "parentId",
    childId: "childId"
  };

  const activeOptionChild = (currentElement) => {
     
    const idOption = currentElement.parentElement.id;
    currentElement.classList.add("active");
    sessionStorage.setItem(storage.childId, idOption);

    const $exeptOption = currentElement.closest(".menu-main > ul").querySelector(`li:not(#${idOption}) > .child.active`);
    if ($exeptOption) {
      $exeptOption.classList.remove("active");
    }

    //redirect
    const { dataset: { url } } = currentElement;
    window.location.href = url;

  };

  const loadOptionsPrevSelected = (parents) => {

     
    const idParentStorage = sessionStorage.getItem(storage.parentId);

    const $parentSelected = idParentStorage ? [...parents].find(parent => parent.parentElement.id === idParentStorage) : parents[0];
    $parentSelected.classList.add("expand");

    const $icon = $parentSelected.querySelector(".rigth");

    if ($icon) {
      $icon.classList.remove("icon-ws-ico-min-down");
      $icon.classList.add("icon-ws-ico-min-up");
    }
  

    const $children = $parentSelected.parentElement.querySelector("ul");

    if ($children) {
      $children.classList.add("active");

      ///storage child
      const childIdStorage = sessionStorage.getItem(storage.childId);
      if (childIdStorage) {
        const $childOption = $children.querySelector(`li#${childIdStorage} .child`);
        $childOption.classList.add("active");
      }

    }
  };

  //EVENTS

  const handleClickOptionParent = (e) => {

    ///Expand or colapsed menu
    const $currentOption = e.currentTarget;
    const $parent = $currentOption.parentElement;
    $currentOption.classList.toggle("expand");

    const $icon = $currentOption.querySelector("i.rigth");

    if ($icon) {
      $icon.classList.toggle("icon-ws-ico-min-down");
      $icon.classList.toggle("icon-ws-ico-min-up");
    }


    //colpased options expect to current Target
    const $exeptOption = $currentOption.closest("ul").querySelector(`:scope > li:not(#${$parent.id}) > .expand`);
    if ($exeptOption) {
      const $child = $exeptOption.parentElement.querySelector("ul");

      if ($child) $child.classList.remove("active");

      $exeptOption.classList.remove("expand");

      const $icon = $exeptOption.querySelector("i.rigth");
      if ($icon) {
        $icon.classList.add("icon-ws-ico-min-down");
        $icon.classList.remove("icon-ws-ico-min-up");
      }
    }
    else {
      $currentOption.classList.add("expand");
    }

    ///Save option parent loclaStorage

    sessionStorage.setItem(storage.parentId, $parent.id);

    ///Redirect ulr if curent option hasn't childs
    const { dataset: { url } } = $currentOption;

    if (url) {
      window.location.href = url;
      sessionStorage.removeItem(storage.childId);
      return;
    }

    /// Expand child options
    const $option = $parent.querySelector("ul");
    $option.classList.toggle("active");

    ///Active default first option
     
    const anyOptionActive = $option.querySelector("li > .active");
    if (!anyOptionActive) {
      const $elementChild = $option.firstElementChild;
      activeOptionChild($elementChild.querySelector(".child"));
    }

  };

  const handleClickOptionChildren = (e) => {
     
    activeOptionChild(e.currentTarget)

  };

  return {
    handleClickOptionParent,
    handleClickOptionChildren
    , loadOptionsPrevSelected
  };

})();


document.addEventListener("DOMContentLoaded", () => {

   
  const { handleClickOptionParent,
    handleClickOptionChildren,
    loadOptionsPrevSelected } = menuMain;
  //event click options
  const $contentMenu = document.querySelector(".menu-main");
  const $optiionChildren = $contentMenu.querySelectorAll("ul > li .child");
  const $optionsParents = $contentMenu.querySelectorAll(":scope >  ul > li > .parent");

  ///storage option
  loadOptionsPrevSelected($optionsParents);

  [...$optionsParents].forEach(option => option.addEventListener("click", handleClickOptionParent));
  [...$optiionChildren].forEach(option => option.addEventListener("click", handleClickOptionChildren));

});