const menuCatalogFilter = (() => {
  let filters = {};

  const initMenu = async (isMyList = false) => {

    const $menuCtalog = document.querySelector(".menu-catalog-content ul");

    const { ConfigCatalog: { brand, category, productType } } = getConfigMessage.strings;

    const { getCategories, getBrands, getProductTypes } = fetchConfigCatalog;
    const [resultCategories, resultBrands, ResultProductTypes] = await Promise.allSettled(
      [getCategories(isMyList, true),
      getBrands(isMyList, true),
      getProductTypes(isMyList, true)]);

     
    const hmtlCategories = templateProductCatalog.createMenuFilterTemplate("Categories", category, resultCategories.value);
    const hmtlBrands = templateProductCatalog.createMenuFilterTemplate("Brands", brand, resultBrands.value);
    const hmtlProductTypes = templateProductCatalog.createMenuFilterTemplate("ProductTypes", productType, ResultProductTypes.value);

    $menuCtalog.appendChild(hmtlCategories);
    $menuCtalog.appendChild(hmtlBrands);
    $menuCtalog.appendChild(hmtlProductTypes);

    $menuCtalog.classList.add("fade-anima");

    //load events
    setEventsMenu();
  };

  const setEventsMenu = () => {

    //event click options
    const $contentMenu = document.querySelector(".menu-catalog-content");
    const $optionsParents = $contentMenu.querySelectorAll(":scope >  ul > li > .header");
    const optionsCheck = $contentMenu.querySelectorAll("ul > li input[type=checkbox]");

    [...$optionsParents].forEach(option => option.addEventListener("click", handleClickOptionParent));
    [...optionsCheck].forEach(option => option.addEventListener("change", handleChangeOption));

     
    scrollPostionsticky.setPositionSticky($contentMenu);
  };

  //EVNETS

  const handleClickOptionParent = (e) => {
     
    const $currentOptionHeader = e.currentTarget;
    const $parent = $currentOptionHeader.parentElement;
    const $option = $parent.querySelector("ul");
    $option.classList.toggle("active");

    const $icon = $currentOptionHeader.querySelector("i");
    $icon.classList.toggle("icon-ws-ico-min-rigth");
    $icon.classList.toggle("icon-ws-ico-min-down");

    //colpased options expect to current Target
    const $exeptOption = $currentOptionHeader.closest("ul").querySelector(`:scope > li:not(#${$parent.id}) ul.active`);
    if ($exeptOption) {
      const $header = $exeptOption.parentElement.querySelector(".header");
      $exeptOption.classList.remove("active");
      $header.querySelector("i").classList.remove("icon-ws-ico-min-down");
      $header.querySelector("i").classList.add("icon-ws-ico-min-rigth");
    }

  };

  const handleChangeOption = (e) => {
     
    const $check = e.target;
    const { id } = $check.closest(".parentFilter")
    const { value } = $check;

    let values = [];

    if ($check.checked) {
      values = filters.hasOwnProperty(id) ? [...filters[id], value] : [value];
    }
    else {
      values = filters[id].filter(item => item !== value);
    }

    filters = {
      ...filters,
      [id]: values
    }

    let filterValuesSeparateByComa = {};
    Object.keys(filters).forEach(key => {
      filterValuesSeparateByComa = {
        ...filterValuesSeparateByComa,
        [key]: filters[key].join(',')
      }
    })

    console.log(filterValuesSeparateByComa)
    filterCatalogModule.searchProductsByFilters(filterValuesSeparateByComa);
  };

  return {
    initMenu,
  };

})();

