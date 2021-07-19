const MyDownloads = (() => {

  const state = {
    products: [],
    pager: {},
    filterRequest: {
      filterPage: {
        actualPage: 1,
        cantByPage: 16
      },
      filter: null
    },
    totalDataview: 0
  };

  const getState = () => state;

  const init = async () => {
    await renderGridProductEsd(element = '');   
  };

  const renderSearchDownloads = (count) => {
    debugger
    const $template = templateMyDownloads.templateSearchDownloads();
    const $content = document.querySelector('.distributed-licenses');
    const $contentSearch = document.querySelector('.content-search-MyDownloads');

    if (!$contentSearch)
      $content.insertAdjacentElement('afterbegin', $template);

    renderTextCountTotal(count);
  };

  const initFormSearch = () => {
    debugger
    state.products = [];
    state.pager = {};
    state.filterRequest.filterPage.actualPage = 1;
    state.filterRequest.filterPage.cantByPage = 16;
    state.filterRequest.filter = null;
    state.totalDataview = 0;
   
    const $contentTable = document.querySelector('.content-my-downloads');
    if ($contentTable)
      $contentTable.innerHTML = '';
  };

  const renderTextCountTotal = (count) => {
    const $content = document.querySelector('.total-count-downloads');
    const $template = templateMyDownloads.templateTextCountTotal(count);

    $content.innerHTML = $template;
  };

  const renderGridProductEsd = async (element) => {
    // consumir servicio
    debugger
    state.filterRequest.filter = element;
    const $productResult = await serviceESD.getEsdproduct(state.filterRequest);

    if ($productResult.StateResultSP.Success) {
      assignValues($productResult);

      //Pintamos el buscador   
      renderSearchDownloads(state.pager.Total);

      //Pintamos header de la lista de licencias
      const $content = document.querySelector('.content-my-downloads');
      $content.insertAdjacentElement('afterbegin', templateMyDownloads.templateListProducts());

      //Pintamos la primera carga de la lista de las licencias 
      const $contentLicenses = document.querySelector('.licenses');
      $contentLicenses.insertAdjacentHTML('afterend', '<div id="row-body"></div>');
      const $contentTable = document.querySelector('#row-body');
      const $templateProducts = templateMyDownloads.templateBodyListProducts(state.products);
      $contentTable.innerHTML = $templateProducts;

      //Pintamos el paginador
      renderPaginator();
    } else {
      //preguntar que podemos hacer cuando no trae la información
    }   
  };

  const assignValues = (dataResult) => {
    state.products = dataResult.data.ListProducts;
    state.pager = dataResult.data.Paginator;
  };

  const renderPaginator = () => {
    const $elementsTable = document.querySelector('#row-body');
    const $lastElement = $elementsTable.lastElementChild;
    const $contentPaginator = document.querySelector('.paginator-licenses');

    state.totalDataview = state.totalDataview + state.products.length;

    const $dataPager = {
      totalPager: state.pager.Total,
      rangePager: state.totalDataview
    }

    if (state.totalDataview >= state.pager.Total) {
      if ($contentPaginator != null)
        $contentPaginator.classList.add("d-none");

      $elementsTable.insertAdjacentElement('afterend', templateMyDownloads.templatePager($dataPager));
    } else {
      $lastElement.insertAdjacentElement('beforeend', templateMyDownloads.templatePaginator($dataPager));

      const $btnShowMore = document.querySelector('.btn-show-more');
      $btnShowMore.addEventListener("click", handleClickShowMore);
    }
  };

  const removePaginator = () => {
    const $contentPaginator = document.querySelector('.paginator-licenses');
    const $contentPager = document.querySelector('.pager-licenses');

    if ($contentPaginator)
      $contentPaginator.remove();

    if ($contentPager)
      $contentPager.remove();
  };

 const handleClickShowMore = async (element) => {
    state.filterRequest.filterPage.actualPage++;

    const $nodeResult = await serviceESD.getEsdproduct(state.filterRequest);
    assignValues($nodeResult);

    removePaginator();

    const $productsTable = document.querySelector('#row-body');
    const $lastProduct = $productsTable.lastElementChild;
    $lastProduct.insertAdjacentHTML('afterend', templateMyDownloads.templateBodyListProducts(state.products));

    renderPaginator();
  };

  const handleOnclickMenu = async (e) => {
    debugger
    const $currentOption = e.id;
    FormDataClients.getNotification();

    switch ($currentOption) {
      case 'licenses':
        const $contentLicenses = document.querySelector('.content-my-downloads');
        if ($contentLicenses.childElementCount === 0)
          await renderGridProductEsd();

        hideTabEsd();
        activeTab('licenses', 'distributed-licenses');

        break;
      case 'codes':
        const $contentCodes = document.querySelector('.content-my-codes');
        if ($contentCodes.childElementCount === 0)
          await MyCodes.init();

        hideTabEsd();
        activeTab('codes', 'distributed-codes');
        break;
      case 'clients':
        hideTabEsd();
        activeTab('clients', 'my-clients');

        const $content = document.querySelector('.content-my-clients.tab-clients');
        if ($content.childElementCount === 0)
          await MyClients.init();
        break;
      default:
    }
  };

  const handleClickSearchLicence = async () => {
    debugger
    const $content = document.querySelector('.searchMyDownloads');
    const $text = $content.value;

    initFormSearch();
    await renderGridProductEsd($text);
  };

  const hideTabEsd = () => {
    const $contentLicenses = document.querySelector('.distributed-licenses');
    const $contentClients = document.querySelector('.my-clients');
    const $contentCodes = document.querySelector('.distributed-codes');

    if (!$contentClients.classList.contains('d-none'))
      $contentClients.classList.add('d-none');

    if (!$contentLicenses.classList.contains('d-none'))
      $contentLicenses.classList.add('d-none');

    if (!$contentCodes.classList.contains('d-none'))
      $contentCodes.classList.add('d-none');

    const $linkLicenses = document.querySelector('#licenses');
    $linkLicenses.classList.remove('active-menu');

    const $linkClients = document.querySelector('#clients');
    $linkClients.classList.remove('active-menu');

    const $linkCodes = document.querySelector('#codes');
    $linkCodes.classList.remove('active-menu');
  };

  const activeTab = (link, contentTab) => {
    const $link = document.querySelector(`#${link}`);
    const $contentTab = document.querySelector(`.${contentTab}`);

    $link.classList.add('active-menu');

    if ($contentTab.classList.contains('d-none'))
      $contentTab.classList.remove('d-none');
  };   

  return {
    init,
    getState,
    hideTabEsd,
    activeTab,
    renderPaginator,
    removePaginator,
    handleClickShowMore,
    handleOnclickMenu,
    handleClickSearchLicence
  };
})();

document.addEventListener("DOMContentLoaded", async () => {
  await MyDownloads.init();
});


