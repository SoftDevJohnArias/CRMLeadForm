const CreateFileCatalogModule = (() => {

  let generateType = ['S', 'D'];
  let idConectionSignalR;
  const conectionSignalR = async () => {
    idConectionSignalR=await SignalrconexionModule.ConnectionSignalR();
  };

  const posGenerateCatalogs = async () => {
    const response = await fetch(`/api/posGenerateCatalogs/${idConectionSignalR}`, confi.getConfig('POST', null));
  }

  const posGenerateCatalogSimplified = async () => {
    const response = await fetch(`/api/posGenerateCatalogsSimplified/${idConectionSignalR}`, confi.getConfig('POST', null));
  }

  const getVerifyExistenceFilesDetails = async (catalogType) => {
    const response = await fetch(`/api/getVerifyExistenceFiles/${catalogType}`);
    return await response.json();
  };

  const verifyCatalogFiles = async () => {

    //quitamos la opcion de mostarr archivos catalogo detallado
    if (!customerModule.productCatalogDetailed) 
      generateType.splice(1,1);

    generateType.forEach(async function (catalogType) {

      setContentCatalogFiles(catalogType);
    });
  }

  const setContentCatalogFiles = async (catalogType) => {
    try {

      const resultFiles = await getVerifyExistenceFilesDetails(catalogType);

      switch (catalogType) {
        case 'S':
          if (resultFiles.find(element => element.state === 's')) {
          showloadingGenerateCatalog(false, catalogType);
          showButtonsDownloadCatalogSimplified(resultFiles);
          }
          else if (resultFiles.find(element => element.state === 'a')) {
           showloadingGenerateCatalog(true, catalogType);
          }
          break;
        case 'D':
          if (resultFiles.find(element => element.state === 's')) {
            showloadingGenerateCatalog(false, catalogType);
            showButtonsDownloadCatalog(resultFiles);
          }
          else if (resultFiles.find(element => element.state === 'a')) {
            showloadingGenerateCatalog(true, catalogType);
          }
          break;
      }

    } catch (e) {

    }
  };

  
  const showloadingGenerateCatalog = (state,catalogType) => {

    const contentType = catalogType === 'D' ? '.content-catalog-details' : '.content-catalog-simplified';
    const loadType = catalogType === 'D' ? '.load-catalog-details' : '.load-catalog-simplified';

    const $donwloadButtons = document.querySelector(`${contentType} .download-file-buttons`);
    const $loadTitleDetail = document.querySelector(`${loadType} .title-load-details`);
    const $loadInfoDetail = document.querySelector(`${loadType}  .title-desc-detail`);
    const $maintitleDetail = document.querySelector(`${loadType}  .title-main`);

    const $iconLoading = document.querySelector(`${loadType}  .icon-loading`);
    const $iconCheck = document.querySelector(`${loadType}  .icon-check-file`);

    const lblProgress = catalogType === 'D' ? getConfigMessage.strings.ConfigCatalog.DetailedCatalogProgress : getConfigMessage.strings.ConfigCatalog.SimplifiedCatalogProgress;
    const lblGenerate = catalogType === 'D' ? getConfigMessage.strings.ConfigCatalog.DetailedCatalogGenerated : getConfigMessage.strings.ConfigCatalog.SimplifiedCatalogGenerated;

    if (state) {
      $loadTitleDetail.classList.remove("d-none");
      $loadInfoDetail.classList.remove("d-none");
      $donwloadButtons.classList.add("d-none");
      $iconLoading.classList.remove("d-none");
      $iconCheck.classList.add("d-none");
      $maintitleDetail.innerHTML = lblProgress;
    }
    else {

      $loadTitleDetail.classList.remove("d-none");
      $loadInfoDetail.classList.add("d-none");
      $iconLoading.classList.add("d-none");
      $iconCheck.classList.remove("d-none");
      $maintitleDetail.innerHTML = lblGenerate;
    }
  }

  const showButtonsDownloadCatalog = (files) => {
    const $donwloadButtons = document.querySelector(".content-catalog-details .download-file-buttons");
    const $buttonCSV = document.getElementById("downloadDetailCSV");
    const $buttonJson = document.getElementById("downloadDetailJson");
    const $dateCatalogDetail = document.getElementById("dateCatalogDetail");

    $donwloadButtons.classList.remove("d-none");
    let dateFile = new Date(files.find(element => element.creationDate != '').creationDate).toLocaleDateString();
    $dateCatalogDetail.innerHTML = `${getConfigMessage.strings.ConfigCatalog.GeneratedVersion} ${dateFile}`

    files.forEach(function (elm) {
      let state = elm.state === 's' ? true : false;
      if (state) {
        switch (elm.ext) {
          case 'csv':
            $buttonCSV.classList.remove("d-none");
            break;
          case 'json':
            $buttonJson.classList.remove("d-none");
            break;
        }
      }
    });

  }


  const showButtonsDownloadCatalogSimplified = (files) => {
    const $contentButtons = document.querySelector(".content-catalog-simplified .download-file-buttons");
    const $buttonCSV = document.getElementById("downloadSimplifiedCSV");
    const $buttonJson = document.getElementById("downloadSimplifiedJson");
    const $dateCatalogDetail = document.getElementById("dateCatalogSimplified");

    let dateFile = new Date(files.find(element => element.creationDate != '').creationDate).toLocaleDateString();
    $contentButtons.classList.remove("d-none");
    $dateCatalogDetail.innerHTML = `${getConfigMessage.strings.ConfigCatalog.GeneratedVersion} ${dateFile}`

    files.forEach(function (elm) {
      let state = elm.state === 's' ? true : false;
      if (state) {
        switch (elm.ext) {
          case 'csv':
            $buttonCSV.classList.remove("d-none");
            break;
          case 'json':
            $buttonJson.classList.remove("d-none");
            break;
        }
      }
    });
  }

  const handleChangeGenerateType = async (e) => {
    try {
      const valueType = e.target.type;
      showloadingGenerateCatalog(true, valueType);
      if (valueType === 'D') 
        await posGenerateCatalogs();
      
      else if (valueType === 'S') 
        await posGenerateCatalogSimplified();
       
    } catch (e) {
    }
  };


  const handleDownloadFiles = async (e) => {

    let valueFile = e.currentTarget.id
    let urlApi = '/api/getFile';
    let fileType = '';
    let catalogType = '';

    switch (valueFile) {
      case 'downloadDetailCSV':
        fileType = 'csv';
        catalogType = 'D';
        break;
      case 'downloadDetailJson':
        fileType = 'json';
        catalogType = 'D';
        break;
      case 'downloadSimplifiedCSV':
        fileType = 'csv';
        catalogType = 'S';
        break;
      case 'downloadSimplifiedJson':
        fileType = 'json';
        catalogType = 'S';
        break;
    }

    await fechDataFile(urlApi, fileType, catalogType);
  }

  const fechDataFile = async (url, fileType, catalogType) => {

    try {
      confi.initLoader();
      let fileName = '';

      if (catalogType === 'S')
        fileName = `${getConfigMessage.strings.ConfigCatalog.SimplifiedFile}.${fileType}`;
      else
        fileName = `${getConfigMessage.strings.ConfigCatalog.DetailedFile}.${fileType}`;


      const response = await fetch(`${url}/${fileType}/${catalogType}`);

      if (response.ok) {
        const result = await response.arrayBuffer();
        confi.downloadFile(result, fileName, 'octet/stream;charset=utf-8;');
      } else { alert(getConfigMessage.strings.ConfigCatalog.ErrorDownloadFile) }

      confi.stopLoader();
    } catch (e) {
      confi.stopLoader();
      alert(getConfigMessage.strings.ConfigCatalog.ErrorDownloadFile);
    }
  }

  const validateProductCatalogDetailed = () => customerModule.productCatalogDetailed === "false" ? false : true;

  const generateCatalogs = () => {

    showloadingGenerateCatalog(true, 'S');
    posGenerateCatalogSimplified();
    if (customerModule.productCatalogDetailed) {
      showloadingGenerateCatalog(true, 'D');
      posGenerateCatalogs();
    }
  }

  return {
    handleChangeGenerateType,
    verifyCatalogFiles,
    handleDownloadFiles,
    showloadingGenerateCatalog,
    validateProductCatalogDetailed,
    setContentCatalogFiles,
    conectionSignalR,
    generateCatalogs
  }
})();

//events
document.addEventListener("DOMContentLoaded", async () => {
  const $selectListDetail = document.querySelector("#selectCatalog ul li + li");
  $selectListDetail.innerHTML = `${getConfigMessage.strings.ConfigCatalog.CatalogDetails }  <span class="detailed-minutes">${ getConfigMessage.strings.ConfigCatalog.DetailedMinutes}</span>`;

  CreateFileCatalogModule.conectionSignalR();
  await CreateFileCatalogModule.verifyCatalogFiles();

  const $selectGenerate = document.querySelectorAll(".list-select");
  const $selectFile = document.querySelectorAll(".download-file-buttons button")

  $selectGenerate.forEach((elm) => {
    elm.addEventListener('click', CreateFileCatalogModule.handleChangeGenerateType, true);
  });

  $selectFile.forEach((button) => {
    button.addEventListener('click', CreateFileCatalogModule.handleDownloadFiles, true);
  });
});