
const configCatalogModule = (() => {


  let $header = null;
  let sticky = null;

  const getElementFilterOptions = () => {
    if (!$header) {

      $header = document.querySelector(".option-filter-content");
      sticky = $header.offsetTop;
    }
    return {
      $header,
      sticky
    };
  };


  //Handlers
  const handleClickSectionFilter = (e) => {
     
    const $header = e.currentTarget;
    $content = $header.parentElement
    $content.classList.toggle("expand-collapse");

    const $icon = $header.querySelector(".collapse-icon i");
    if ($content.classList.contains("expand-collapse")) {
      $icon.classList.add("icon-ws-ico-min-rigth");
      $icon.classList.remove("icon-ws-ico-min-up");
      document.removeEventListener("scroll", handleScroll);

    }
    else {
      $icon.classList.remove("icon-ws-ico-min-rigth");
      $icon.classList.add("icon-ws-ico-min-up");
      document.addEventListener("scroll", handleScroll);
    }
  };

  const handleScroll = () => {
    const { $header, sticky } = getElementFilterOptions();

    if (window.pageYOffset > sticky) {
      $header.classList.add("sticky");

    } else {
      $header.classList.remove("sticky");

    }
  }

  //functons validate catalog
  const optionFilterProduct = () => {
    if (customerModule.productCatalogAdmin === 'intcomex') {

      const $tabProductFilter = document.querySelector(".menu-config-catalog div:nth-child(1)");
      const $tabTask= document.querySelector(".menu-config-catalog div:nth-child(2)");
      const $contentProductFilter = document.querySelector(".product-filters");
      $tabProductFilter.classList.add("d-none");
      $tabTask.classList.add("active-menu");
      $contentProductFilter.classList.add("d-none");
    }
  }

  const optionGenerateDetailiedCatalog = () => {
    if (!customerModule.productCatalogDetailed) {
      const $optionDetailed = document.querySelector(".list-select li:nth-child(2)");
      $optionDetailed.classList.add("d-none");
    }
  }

  const optionsCatalogcustomerSettings = () => {
    optionFilterProduct();
    optionGenerateDetailiedCatalog();
  }

  const handleChangeCatalogSource = async (e) => {
    const value = e.target.value;
    const result = await settingCustomerModule.updateCustomerSettings('products.catalog.source', value);

  };

  return {
    handleClickSectionFilter,
    handleScroll,
    optionFilterProduct,
    optionGenerateDetailiedCatalog,
    optionsCatalogcustomerSettings,
    handleChangeCatalogSource
  };


 


})();



//EVENTs
document.addEventListener("DOMContentLoaded", async () => {

  const $contentCatalog = document.querySelector(".js-content-catalog");
  const $contentCatalogPreview = document.querySelector(".filter-preview");
  const $selectCatalogSource= document.querySelector(".select-source");

  $contentCatalog.addEventListener("click", configCatalogModule.handleClickSectionFilter);
  $contentCatalogPreview.addEventListener("click", configCatalogModule.handleClickSectionFilter);

  document.addEventListener("scroll", configCatalogModule.handleScroll);
  configCatalogModule.optionsCatalogcustomerSettings();

  $selectCatalogSource.addEventListener("change", settingCustomerOptionsModule.handleChangeCatalogSource);
  $selectCatalogSource.value = customerModule.productsCatalogSource;
});