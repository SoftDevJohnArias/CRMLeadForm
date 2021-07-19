//PRODUCT CATALOG FILTER MODEULE

const filterCatalogModule = (() => {
  let perPage = 24;
  //const STORAGE_PAGE = "storagePage";

  const MODE_VIEW = {
    Grid: 'modeGrid',
    list: 'modeList'
  };

  //const storagePage = sessionStorage.getItem(STORAGE_PAGE);
  //const page = storagePage ? parseInt(storagePage) : 1;
  let filterCatalog = {
    Search: null,
    SortBy: null,
    PerPage: perPage,
    Page: 1,
    IsRequredCountProducts: true,
    IsCache: true
  }

  const initProductCatalog = async (isMyList = false) => {

    if (!isMyList) {
      const $textSearch = document.getElementById("textSearch");
      $textSearch.addEventListener('input', confi.debounce(handleChangeSearch, 600));
    }

    const $viewGrid = document.getElementById("viewGrid");
    const $viewList = document.getElementById("viewList");
    const $sortBySelect = document.getElementById("sortBy");
    //const $downloadCsv = document.getElementById("downloadCsv");
    //const $downloadJson = document.getElementById("downloadJson");

    //EVENTS
    $viewGrid.addEventListener("click", handleClickViewGrid);
    $viewList.addEventListener("click", handleClickViewList);

    $sortBySelect.addEventListener('change', handleChangeSortBy);
    //$downloadCsv.addEventListener("click", handleClicDownloadCsv);
    //$downloadJson.addEventListener("click", handleClicDownloadJson);

    //SET OBJECT FILTER  IsMyList
    filterCatalog.IsMyList = isMyList;

    selectView(sessionStorage.getItem("modeView"));
    const resultRecords = await getRecordsViewMode();
    if (resultRecords) {

      Pagination.Init(resultRecords, perPage);
      setCurrency();
    }


  };

  const getRecordsViewMode = async (isReloadProducts = true) => {
     
    const modeView = sessionStorage.getItem("modeView");

    switch (modeView) {
      case MODE_VIEW.Grid:
        return await productModule.buildProductGrid(filterCatalog, isReloadProducts);
      case MODE_VIEW.list:
        return productModule.buildProductsList(filterCatalog, isReloadProducts);
      default:
        return await productModule.buildProductGrid(filterCatalog, isReloadProducts);
    }
  };

  const searchProductsByFilters = async (filtersMenu = null, isCache = true) => {
    if (filtersMenu) {
      filterCatalog = {
        ...filterCatalog,
        ...filtersMenu,
        Page: 1,
        IsRequredCountProducts: true,

      };
    }
    filterCatalog.IsCache = isCache;
    const resultRecords = await getRecordsViewMode();
    Pagination.Init(resultRecords, perPage)
  };

  const selectView = (modeView) => {
    const $viewGrid = document.getElementById("viewGrid");
    const $viewList = document.getElementById("viewList");

    switch (modeView) {
      case MODE_VIEW.Grid:
        $viewList.classList.remove("selected");
        $viewGrid.classList.add("selected");
        break;
      case MODE_VIEW.list:
        $viewList.classList.add("selected");
        $viewGrid.classList.remove("selected");
        break;
      default:
        $viewList.classList.remove("selected");
        $viewGrid.classList.add("selected");
        break;
    }
  };

  const changeView = (elementVieMode, modeView) => {
     
    if (elementVieMode.target.classList.contains("selected")) {
      return;
    }
    selectView(modeView);
    sessionStorage.setItem("modeView", modeView);
    getRecordsViewMode(false);
  }

  const fechDataFile = async (url, filterCatalog, typefile) => {

    const response = await fetch(url, confi.getConfig('POST', filterCatalog));

    if (!response.ok)
      return false;
    else {
      switch (typefile) {
        case 'CSV':
          return await response.arrayBuffer();
          break;
        case 'Json':
          return await response.json();
          break;
      }

    }
  };

  //events
  Pagination.onClickPage = (perPage, page) => {
    filterCatalog.Page = page;
    filterCatalog.IsRequredCountProducts = false;
    getRecordsViewMode();
    confi.scrollTo(0, 1000);
    //sessionStorage.setItem(STORAGE_PAGE, page);
  };

  const handleChangeSearch = async (ev) => {
    try {
      filterCatalog.Search = ev.target.value.trimEnd();
      filterCatalog.Page = 1;
      filterCatalog.IsRequredCountProducts = true;
      const resultRecords = await getRecordsViewMode();
       
      Pagination.Init(resultRecords, perPage);

    } catch (e) {
      console.error(e.toString());
    }
  };

  const handleClickViewGrid = (e) => {
    changeView(e, MODE_VIEW.Grid);
  };

  const handleClickViewList = (e) => {
    changeView(e, MODE_VIEW.list);
  };

  const handleChangeSortBy = async (ev) => {
     
    try {
      filterCatalog.SortBy = ev.target.value;
      filterCatalog.Page = 1;
      filterCatalog.IsRequredCountProducts = true;
      const resultRecords = await getRecordsViewMode();
      Pagination.Init(resultRecords, perPage);

    } catch (e) {
      console.error(e.toString());
    }
  };

  const handleClicDownloadCsv = async (e) => {
     
    try {
      confi.initLoader();
      e.preventDefault();
      const result = await fechDataFile('/api/DownloadFileCSV', filterCatalog, 'CSV');
      if (!result)
        confi.Messagge(false, getConfigMessage.strings.productCatalog.ErrorDownloadFile);
      else {
        confi.downloadFile(result, 'catalog.csv', 'octet/stream;charset=utf-8;');
      }
      confi.stopLoader();
    } catch (e) {

      confi.stopLoader();
    }
  };

  const handleClicDownloadJson = async (e) => {
     
    try {
      confi.initLoader();
      e.preventDefault();
      const result = await fechDataFile('/api/DownloadFileJson', null, 'Json');
      if (!result)
        confi.Messagge(false, getConfigMessage.strings.productCatalog.ErrorDownloadFile);
      else {
        confi.downloadFile(JSON.stringify(result), 'catalog.json', 'octet/stream;charset=utf-8;');
      }

      confi.stopLoader();
    } catch (e) {
      confi.stopLoader();
    }
  };

  const setCurrency = () => {
    const $currencySpan = document.querySelector(".footer-container div span + span");
    $currencySpan.innerHTML = customerModule.customerCurrency.toUpperCase() + '$';//customerModule.customerCurrency.toUpperCase();
  }

  return {
    initProductCatalog,
    searchProductsByFilters
  };

})();


//EVENTS


