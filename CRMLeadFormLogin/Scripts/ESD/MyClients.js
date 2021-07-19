const MyClients = (() => {

  const state = {
    customer: '',
    clients: [],
    total: 0,
    paginator: {
      actualPage: 1,
      cantByPage: 16,
    },
    product: {}
  };

  let $contentGeneral = null;
  let isLicenses = false;

  const getState = () => state;

  const init = async (isLicenses = false, product = '') => {  
    debugger
    $contentGeneral = isLicenses ? document.querySelector('.content-my-clients-licenses') : document.querySelector('.content-my-clients');
    await renderGridMyClients(isLicenses, product);
    isLicenses = isLicenses;
  };

  const renderSearchClients = (count, isLicenses) => {    
    const $template = templateMyClients.templateSearchClients(count);
    const $content = isLicenses ? document.querySelector('.my-clients-licenses'):document.querySelector('.my-clients');
    $content.insertAdjacentElement('afterbegin', $template);
  };

  const renderGridMyClients = async (isLicenses, product) => {  
    debugger
    const $clientsResult = await serviceClients.getMyClients(state.paginator);
    assignValues($clientsResult, product);

    renderSearchClients(5, isLicenses);

    //Inicio bloque quemado para simular el país en la tabla
    const $country = 'XCB';
    let $show = false;
    if ($country === 'XUS')
      $show = true;
    else
      $show = false;
    //Fin bloque quemado para simular el país en la tabla

    const $content = isLicenses ? document.querySelector('.content-my-clients-licenses'):document.querySelector('.content-my-clients');
    $content.insertAdjacentElement('afterbegin', templateMyClients.templateListClients($show));
 
    const $contentClients = $content.querySelector('.clients');//document.querySelector('.clients');
    $contentClients.insertAdjacentHTML('afterend', '<div id="row-body-clients"></div>')
    const $contentTable = $content.querySelector('#row-body-clients');
    const $templateClients = templateMyClients.templateBodyListClients(state.clients, $show, isLicenses,state.product);
    $contentTable.innerHTML = $templateClients; 
    
    renderPaginator(isLicenses);
  };

  const assignValues = (dataResult, product) => {
    const { Customer, Clients, Total } = JSON.parse(dataResult);
    state.clients = Clients;
    state.total = Total;
    state.product = product;
  };

  const renderPaginator = () => {
    
    const $elementsTable = $contentGeneral.querySelector('#row-body-clients');
    $lastElement = $contentGeneral.querySelector('#row-body-clients .body-list:nth-last-child(2)');
    const $contentPaginator = $contentGeneral.querySelector('.paginator-clients');

    const $dataPager = {
      totalPager: 5,
      rangePager: 5
    }

    //Pintamos paginador con botón "ver más"
    //if ($dataPager.lenght >= $dataPager.cantPage) {
    //$lastElement.insertAdjacentElement('beforeend', templateMyClients.templatePaginator($dataPager));

    //const $btnShowMore = document.querySelector('.btn-show-more-clients');
    //$btnShowMore.addEventListener("click", handleClickShowMoreClients);
    //}

    //Pintamos sólo paginador
    //if ($dataPager.lenght < $dataPager.cantPage) {
    if ($contentPaginator != null)
      $contentPaginator.classList.add("d-none");

    $elementsTable.insertAdjacentElement('afterend', templateMyClients.templatePager($dataPager));
    //}
  };

  const removePaginator = () => {
    const $contentPaginator = $contentGeneral.querySelector('.paginator-clients');
    const $contentPager = $contentGeneral.querySelector('.pager-clients');

    if ($contentPaginator)
      $contentPaginator.remove();

    if ($contentPager)
      $contentPager.remove();
  };

  const handleClickShowMoreClients = async (element) => {
    state.paginator.actualPage++;

    const $nodeResult = await serviceClients.getMyClients(state.paginator);
    assignValues($nodeResult);

    removePaginator();

    const $clientsTable = $contentGeneral.querySelector('#row-body-clients');
    const $lastProduct = $clientsTable.lastElementChild;
    $lastProduct.insertAdjacentHTML('afterend', templateMyClients.templateBodyListClients(state.clients, false, isLicenses));

    renderPaginator();
  };

  const handleClickShowForm = async (data = '', isEdit = false) => {
    debugger
    const $content = document.querySelector('.my-clients');
    const $contentClients = $content.querySelector('.content-my-clients');
    const $contentSearch = $content.querySelector('.content-search');

    if (!$contentSearch.classList.contains('d-none'))
      $contentSearch.classList.add('d-none');

    if (!$contentClients.classList.contains('d-none'))
      $contentClients.classList.add('d-none');

    const $contentForm = document.querySelector('.form-clients');
    if ($contentForm.classList.contains('d-none'))
      $contentForm.classList.remove('d-none');

    debugger
    await FormDataClients.init(data,isEdit);
  };

  const handleClickUpdateClient = (ClientId, TypePerson, CompanyName, Name, Email, CountryId) => {
    debugger

    const objClient = {     
      ClientId: ClientId,
      TypePerson: TypePerson,
      CompanyName: CompanyName,
      Name: Name,
      Email: Email,
      Country: CountryId
    };

    handleClickShowForm(objClient, true);

  };

  return {
    init,
    getState,
    renderPaginator,
    removePaginator,
    handleClickShowMoreClients,
    handleClickShowForm,
    handleClickUpdateClient
  }

})();

const FormDataClients = (() => {

  const state = {
    company: '',
    listTypePerson: [],
    completeForm: null,
    dataEditClient: [],
    isEditClient: false
  };

  const init = async (data, isEdit) => {
    await getTypePerson(data, isEdit);
  };

  const getState = () => state;

  const assignValues = (data, editClient = '', isEdit) => {
    state.listTypePerson = JSON.parse(data.ListOptionSet);
    state.company = data.CompanyId;

    //información de editar cliente
    state.isEditClient = isEdit;
    state.dataEditClient = editClient;
  };

  const getTypePerson = async (data, isEdit) => {
    const $response = await serviceClients.getOptionSetByName();
    assignValues($response, data, isEdit);

    orderCardsByNatural();
  };

  const initValidationForm = () => {
    debugger
    const $formClients = document.querySelector(".form-esd-clients");
    validateForm.init($formClients);
    $formClients.removeEventListener("submit", handleSubmit);
    $formClients.addEventListener("submit", handleSubmit);
  };

  const getNotification = () => {
    const $contentNotification = document.querySelector('.notifications-esd');

    if ($contentNotification)
      $contentNotification.innerHTML = '';
  };

  const cleanForm = async (e) => {
    for await (let child of e.childNodes) {
      child.remove();
    }
  };

  const addValidForm = async (e) => {
    for await (let child of e.children) {
      child.children[0].classList.add('is-valid');
    }

    if ('XUS' === 'XUS') {
      const selectCountry = document.querySelector('select[name=country]');
      selectCountry.classList.add('is-valid');
    }    
  };

  const cleanCountry = () => {
    debugger
    if (!state.isEditClient) {
      const selectCountry = document.querySelector('select[name=country]');
      selectCountry.value = '';
    }
  };

  const saveDataForm = (dataForm) => {
    state.completeForm = {
      ...state.completeForm,
      dataCliente: dataForm
    }
  };

  const orderCardsByNatural = () => {
    debugger
    //Ordenamos para que siempre quede de primeras la persona natural
    const $company = state.company;
    state.listTypePerson.sort((a, b) => b.IsNaturalPerson - a.IsNaturalPerson);

    if ($company != 'XUY' && $company != 'XJM')
      renderCardsPerson(state.listTypePerson);
    else
      renderFieldsDependency();
  };

  const checkCardNatural = (value) => {
    const $checkNatural = document.querySelector('input[id = natural]');
    $checkNatural.checked = value;

    const $cardNatural = document.querySelector('.naturalPerson');
    if (value)
      $cardNatural.classList.add('active-card');
    else
      $cardNatural.classList.remove('active-card');
  };

  const checkCardJurisdictional = (value) => {
    const $checkJurisdictional = document.querySelector('input[id = jurisdictional]');
    $checkJurisdictional.checked = value;

    const $cardJurisdictional = document.querySelector('.jurisdictionalPerson');

    if (value)
      $cardJurisdictional.classList.add('active-card');
    else
      $cardJurisdictional.classList.remove('active-card');
  };

  const renderCardsPerson = () => {
    const $contentCards = document.querySelector('.card-clients');
    const $templateCards = myClientsForm.templateCardsTypePerson(state.listTypePerson);
    $contentCards.innerHTML = $templateCards;

    const $contentParagraph = document.querySelector('.informative-send');
    if ($contentParagraph.childElementCount != 0)
      renderParagraph(true);

    if (state.isEditClient) {
      checkCardForEdit();
    } else {
      checkCardNatural(true);
      renderFieldsDependency('natural');
    }
  };

  const checkCardForEdit = () => {
    debugger
    const $info = state.dataEditClient;

    if ($info != null) {
      if ($info.TypePerson.charAt(0) === 'N') {
        renderFieldsDependency('natural');
        checkCardNatural(true);
      }
      else {
        renderFieldsDependency('jurisdictional');
        checkCardJurisdictional(true);
      }

    }
  };

  const renderParagraph = (value) => {
    const $contentParagraph = document.querySelector('.informative-send');
    const $templateParagraph = myClientsForm.templateParagraphSend(value);
    $contentParagraph.insertAdjacentElement('afterbegin', $templateParagraph);
  };

  const renderFieldsDependency = async (element) => {
    const $content = document.querySelector('.content-data-form-clients');
    const $contentCompany = document.querySelector('input[name = companyname]');
    const $contentCountry = document.querySelector('#country');
    const $contentButtons = document.querySelector('.btn-data-client');

    const $templateShared = myClientsForm.templateInputShared(state.dataEditClient);
    const $templateInput = myClientsForm.templateInputDependency(state.dataEditClient);
    const $templateButtons = myClientsForm.templateButtonClient(state.isEditClient);
    debugger

    if ($content.childElementCount != 0)
      await cleanForm($content);

    $content.innerHTML = $templateShared;
    $contentButtons.innerHTML = $templateButtons;

    const $contentParagraph = document.querySelector('.informative-send');
    if ($contentParagraph.childElementCount != 0)
      $contentParagraph.children[0].remove();

    if (element === 'natural') {
      renderParagraph(true);
      if ($contentCompany)
        $contentCompany.remove();
      //if ($contentCountry)
      //  $contentCountry.remove();
      if (state.company === 'XUS') {
        if (!$contentCountry)
          await renderDataSelectCountry(state.dataEditClient, $content);
        cleanCountry();
      }
    }

    if (element === 'jurisdictional') {
      renderParagraph(false);
      if (!$contentCompany)
        $content.insertAdjacentElement('afterbegin', $templateInput);
      if (state.company === 'XUS') {
        if (!$contentCountry)
          await renderDataSelectCountry(state.dataEditClient, $content);
        cleanCountry();
      }
    }

    if (state.isEditClient)
      addValidForm($content);

    initValidationForm();
  };

  const renderDataSelectCountry = async (data, e) => {
    debugger
    const $response = await serviceClients.getCountries();
    const $templateSelect = myClientsForm.templateSelectDependency(JSON.parse($response.ListCountries));
    e.insertAdjacentHTML('afterend', '<div id="country"></div>');
    const $contentCountry = document.querySelector('#country');
    $contentCountry.innerHTML = $templateSelect;

    const $country = document.querySelector('select[name = country]');

    if (state.isEditClient) {
      $country.value = data.Country;
    } else {
      $country.value = '';
    }
  };

  const renderNotification = (type) => {
    debugger
    let $message = '';

    if (type === 'create') {
      $message = getConfigMessage.strings.MyDownloads.SuccessClient;
    }
    if (type === 'edit') {
      $message = getConfigMessage.strings.MyDownloads.SuccessClientUpdate;
    }

    const $contentNotification = document.querySelector('.notifications-esd');
    const $template = templateNotificationsESD.templateNotificationCreateCliente($message); $contentNotification.insertAdjacentElement('afterbegin', $template);
  };

  const getCountryByCompany = () => {
    let $country = '';

    switch (state.company) {
      case "XCB":
        $country = 'CO';
        break;
      case "XCL":
        $country = 'CL';
        break;
      case "XCR":
        $country = 'CR';
        break;
      case "XEC":
        $country = 'EC';
        break;
      case "XGT":
        $country = 'GT';
        break;
      case "XJM":
        $country = 'JM';
        break;
      case "XMX":
        $country = 'MX';
        break;
      case "XPA":
        $country = 'PA';
        break;
      case "XSV":
        $country = 'SV';
        break;
      case "XUY":
        $country = 'UY';
        break;
      case "XUS":
        $country = state.completeForm.dataCliente.country;
        break;
    }
    return $country;
  };

  const handleChangeSelectPerson = (e) => {
    const $name = e.id;

    if ($name === 'natural') {
      checkCardNatural(true);
      checkCardJurisdictional(false);
      renderFieldsDependency('natural');
    }

    if ($name === 'jurisdictional') {
      checkCardJurisdictional(true);
      checkCardNatural(false);
      renderFieldsDependency('jurisdictional');
    }
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();

    const { form, getValues } = validateForm.getValidation();
    saveDataForm(getValues(), form);

    getNotification();

    const $dataClient = state.completeForm;
    let $country = getCountryByCompany();
    const $owningBusiness = customerModule.userCurrency;
    const $companyId = customerModule.companyCurrency;
    let $name = $dataClient.dataCliente.companyname;

    if ($name === undefined)
      $name = '';

    if ($country === undefined)
      $country = '';

    const $clientRequest = {
      name: $name,
      country_id: $country,
      email: $dataClient.dataCliente.email,
      companytypeid: $dataClient.dataCliente.person,
      //parent_account_id: $owningBusiness,
      //owning_business_unit: $companyId,
      AccountId: ""
    }

    if (state.isEditClient) {
      //let $responseUpdate = await serviceClients.updateClient($clientRequest, state.dataEditClient);
      let $responseUpdate = await serviceClients.updateClient($clientRequest);
      debugger

      if ($responseUpdate) {
        handleClickReturn();
        renderNotification('edit');
      }
      else
        console.log('mal');
    } else {
      let $response = await serviceClients.createClient($clientRequest);

      debugger
      if ($response.Success) {
        handleClickReturn();
        renderNotification('create');
      }
      else
        console.log('mal');
    }    
  };

  const handleClickReturn = () => {   
    confi.scrollTo(0, 900);
    const $contentCard = document.querySelector('.card-clients');
    cleanForm($contentCard);

    const $contentParagraph = document.querySelector('.informative-send');
    cleanForm($contentParagraph);

    const $contentInputs = document.querySelector('.content-data-form-clients');
    cleanForm($contentInputs);

    const $contentNotification = document.querySelector('.notifications-esd');
    cleanForm($contentNotification);

    const $content = document.querySelector('.my-clients');
    const $contentClients = $content.querySelector('.content-my-clients');
    const $contentSearch = $content.querySelector('.content-search');

    if ($contentSearch.classList.contains('d-none'))
      $contentSearch.classList.remove('d-none');

    if ($contentClients.classList.contains('d-none'))
      $contentClients.classList.remove('d-none');

    const $contentForm = document.querySelector('.form-clients');
    if (!$contentForm.classList.contains('d-none'))
      $contentForm.classList.add('d-none');
  };

  return {
    init,
    getState,
    getNotification,
    renderCardsPerson,
    handleChangeSelectPerson,
    handleSubmit,
    handleClickReturn,
  }
})();