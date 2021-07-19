const MyCodes = (() => {

  const state = {
    productsLicences: [],
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
    await renderGridCodes();
  };

  const renderSearchCodes = (count) => {
    const $template = templateMyCodes.templateSearchCodes(count);
    const $content = document.querySelector('.distributed-codes');
    $content.insertAdjacentElement('afterbegin', $template);
  };

  const renderGridCodes = async () => {
    const $product = await serviceCodes.getDistributedCodes(state.filterRequest);
    assignValues($product);
     
    renderSearchCodes(state.pager.Total);
    
    const $content = document.querySelector('.content-my-codes');
    $content.insertAdjacentElement('afterbegin', templateMyCodes.templateListCodes());   

    const $contentLicenses = document.querySelector('.codes');
    $contentLicenses.insertAdjacentHTML('afterend', '<div id="row-body-codes"></div>')
    const $contentTable = document.querySelector('#row-body-codes');
    const $templateProducts = templateMyCodes.templateBodyListCodes(state.productsLicences);
    $contentTable.innerHTML = $templateProducts;

    renderPaginator();
  };

  const assignValues = (dataResult) => {    
    const { ListDistibuitedCodes, Paginator } = JSON.parse(dataResult);
    state.productsLicences = ListDistibuitedCodes;
    state.pager = Paginator;
  };

  const renderPaginator = () => {    
    const $elementsTable = document.querySelector('#row-body-codes');
    const $lastElement = $elementsTable.lastElementChild;
    const $contentPaginator = document.querySelector('.paginator-codes');

    state.totalDataview = state.totalDataview + state.productsLicences.length;

    const $dataPager = {
      totalPager: state.pager.Total,
      rangePager: state.totalDataview
    }

    if (state.totalDataview >= state.pager.Total) {
      if ($contentPaginator != null)
        $contentPaginator.classList.add("d-none");

      $elementsTable.insertAdjacentElement('afterend', templateMyCodes.templatePager($dataPager));
    } else {
      $lastElement.insertAdjacentElement('beforeend', templateMyCodes.templatePaginator($dataPager));

      const $btnShowMoreCodes = document.querySelector('.btn-show-more-codes');
      $btnShowMoreCodes.addEventListener("click", handleClickShowMoreCodes);
    }
  };

  const removePaginator = () => {
    const $contentPaginator = document.querySelector('.paginator-codes');
    const $contentPager = document.querySelector('.pager-codes');

    if ($contentPaginator)
      $contentPaginator.remove();

    if ($contentPager)
      $contentPager.remove();
  };

  const getCodes = () => {
    const codes = ['xxx-SDFRT-TYGHT-WERTxxxx', 'xxx-DDFRT-TYGHT-WERTxxxx', 'xxx-TDFRT-TYGHT-WERTxxxx']//await serviceESD.getCodes();
    return codes;
  };

  const renderTableCodes = () => {
    const $tableCodes = document.querySelector(".table-details");
    const codes = getCodes();

    const rows = codes.map(code => {
      return templatesCodesDistributed.templateTableCodesDistributed(code);
    }).join('');

    $tableCodes.innerHTML = rows;
    document.querySelector(".table-details .separator:last-child")?.remove();
  };

  ///Eventos
  //Evento para el botón "ver más"
  const handleClickShowMoreCodes = async (element) => {
    
    state.filterRequest.filterPage.actualPage++;

    const $nodeResult = await serviceCodes.getDistributedCodes(state.filterRequest);
    assignValues($nodeResult);

    removePaginator();

    const $productsTable = document.querySelector('#row-body-codes');
    const $lastProduct = $productsTable.lastElementChild;
    $lastProduct.insertAdjacentHTML('afterend', templateMyCodes.templateBodyListCodes(state.productsLicences));

    renderPaginator();
  };

  const handleShowCodes = () => {    
    //ocultamos la vista de codigos
    const $contentTab = document.querySelector('.distributed-codes');
    const $contentCodes = $contentTab.querySelector('.content-my-codes');
    const $contentSearch =  $contentTab.querySelector('.content-search');

    if (!$contentSearch.classList.contains('d-none'))
      $contentSearch.classList.add('d-none');

    if (!$contentCodes.classList.contains('d-none'))
      $contentCodes.classList.add('d-none');

    //mostramos lo codigos distribuidos del cliente
    const $contentCodesDist = document.querySelector('.content-my-codes-distributed');
    if ($contentCodesDist.classList.contains('d-none'))
      $contentCodesDist.classList.remove('d-none');
    
    renderTableCodes();
  };

  const handleShowLicence = (SKU, MPN, Description, Brand, UrlImage, nameClient, Email, isSend) => {
    debugger

    const data = {
      sku: SKU,
      mpn: MPN,
      description: Description,
      brand: Brand,
      urlImage: UrlImage,
      nameClient: nameClient,
      email: Email
    };   

    if (isSend === 'false')
      hideViewCodes();

    ForwardingLicense.init(data, isSend);
  };

  const hideViewCodes = () => {
    debugger
    const $contentTab = document.querySelector('.distributed-codes');
    const $contentLicences = document.querySelector('.distributed-licenses');
    const $contentSearch = document.querySelector('.content-search-MyDownloads');
    const $contentList = document.querySelector('.content-my-downloads');

    if (!$contentTab.classList.contains('d-none'))
      $contentTab.classList.add('d-none');

    if (!$contentSearch.classList.contains('d-none'))
      $contentSearch.classList.add('d-none');

    if (!$contentList.classList.contains('d-none'))
      $contentList.classList.add('d-none');    

    MyDownloads.hideTabEsd();
    MyDownloads.activeTab('licenses', 'activation-codes');
    $contentLicences.classList.remove('d-none');  
  };

  const handleToReturn = () => {
    const $contentTab = document.querySelector('.distributed-codes');
    const $contentCodes = $contentTab.querySelector('.content-my-codes');
    const $contentSearch = $contentTab.querySelector('.content-search');

    if ($contentSearch.classList.contains('d-none'))
      $contentSearch.classList.remove('d-none');

    if ($contentCodes.classList.contains('d-none'))
      $contentCodes.classList.remove('d-none');

    const $contentCodesDist = document.querySelector('.content-my-codes-distributed');
    if (!$contentCodesDist.classList.contains('d-none'))
      $contentCodesDist.classList.add('d-none');

    confi.scrollTo(0, 900);
  };

  return {
    init,
    getState,
    renderPaginator,
    removePaginator,
    handleClickShowMoreCodes,
    handleShowCodes,
    handleToReturn,
    handleShowLicence
  }
})();

const ForwardingLicense = (() => {

  const client = {
    email: '',
    name:''
  };

  let $isSend;

  const init = (product, isSend) => {
    debugger   
    initNotification();
    client.email = product.email;
    client.name = product.nameClient;
    renderTemplates(product);    
    initValidationForm();
    $isSend = isSend;  
  };

  const initValidationForm = () => {
    debugger
    const $formLicences = document.querySelector(".form-forwarding-licence");
    validateForm.init($formLicences);
  };

  const initNotification = () => {
    const $content = document.querySelector('.notification-send-codes');
    if ($content)
      $content.innerHTML = '';
  };

  const renderTemplates = (product) => {
    renderEmail(product);
    renderLicence(product);
  };

  const renderNotification = () => {
    const $contentNotification = document.querySelector('.notification-send-codes');
    const $template = templatesCodesDistributed.templateNotificationSendLicence(client.name, client.email);
    $contentNotification.innerHTML = $template;

    confi.scrollTo(0, 900);
  };

  const renderEmail = (dataClient) => {
    debugger
    const $content = document.querySelector('.email-person');

    if ($content.classList.contains('d-none'))
      $content.classList.remove('d-none');

    const $template = templatesCodesDistributed.templateEmailPerson(dataClient);
    $content.innerHTML = $template;
  };

  const renderLicence = (product) => {
    const $content = document.querySelector('.licence-code');
    const $template = templatesCodesDistributed.templateLicencePerson(product);
    $content.innerHTML = $template;
  };

  const hideNameToSendCode = () => {
    const $content = document.querySelector('.email-person');

    if ($content) {
      if (!$content.classList.contains('d-none'))
        $content.classList.add('d-none');
    }
  };

  const handleToReturn = () => {
    if ($isSend) {
      const $contentSend = document.querySelector('.content-send-licenses');
      const $contentMyClients = document.querySelector('.my-clients-licenses');

      if ($contentSend.classList.contains('d-none'))
        $contentSend.classList.remove('d-none');

      if ($contentMyClients.classList.contains('d-none'))
        $contentMyClients.classList.remove('d-none');


    } else {
      const $contentTab = document.querySelector('.distributed-codes');
      const $contentCodes = $contentTab.querySelector('.content-my-codes');
      const $contentSearch = $contentTab.querySelector('.content-search');
      const $contentCodesDist = document.querySelector('.content-my-codes-distributed');

      if ($contentSearch.classList.contains('d-none'))
        $contentSearch.classList.remove('d-none');

      if ($contentCodes.classList.contains('d-none'))
        $contentCodes.classList.remove('d-none');

      if (!$contentCodesDist.classList.contains('d-none'))
        $contentCodesDist.classList.add('d-none');      
    }

    const $contentLicence = document.querySelector('.activation-codes');
    if (!$contentLicence.classList.contains('d-none'))
      $contentLicence.classList.add('d-none');

    confi.scrollTo(0, 900);
  };

  const handleSubmit = () => {
    debugger
    initNotification();

    const $contentEmail = document.querySelector('.person-email');
    const $valueEmail = $contentEmail.value;
    let $responseSendToEmail;
    let $responseUpdateClient;

    if ($valueEmail != client.email) 
      $responseUpdateClient = '';

    $responseSendToEmail = '';

    hideNameToSendCode();
    renderNotification();

  };

  return {
    init,
    handleToReturn,
    handleSubmit
  }
})();