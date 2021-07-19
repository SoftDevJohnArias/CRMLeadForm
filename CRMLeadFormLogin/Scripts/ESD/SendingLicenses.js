const SendingLicenses = (() => {

  const init = async (UrlImage, Brand, Description, MPN, SKU, Redistributed, Total) => {
    //ocultamos el div d elicencias compradas
    showContentLicensesPurchases(false);
    //mostramos el contendor de licencias
    showContentLicenses(true);

    //llenamos la grid
    renderGridSendingLicenses(UrlImage, Brand, Description, MPN, SKU, Redistributed, Total);

    //renderizamos los clientes
    //const $contentLicenses = document.querySelector(".content-sending-licenses");
    //$contentLicenses.appendChild(templatesSendingLicenses.templateSearchClientsLicenses(5));

    //const $content = document.querySelector('.content-my-clients');
    //if ($content.childElementCount === 0)

    const $product = {
      sku: SKU,
      mpn: MPN,
      description: Description,
      brand: Brand,
      urlImage: UrlImage
    };

    await MyClients.init(true, $product);   
    customSectionMyClients();
  };


  const renderGridSendingLicenses = async (UrlImage, Brand, Description, MPN, SKU, Redistributed, Total) => {
    const $contentGrid = document.querySelector(".table-licenses");
    debugger
    //colocamos el header del grid
    $contentGrid.appendChild(templatesSendingLicenses.headerGridLicenses());
    //lenamos la grid
    $contentGrid.appendChild(templatesSendingLicenses.templateBodyListLicenses(UrlImage, Brand, Description, MPN, SKU, Redistributed, Total));
  };


  const showContentLicenses = (isShow) => {
    //mostramos el contendor de licencias
    const $contentLicenses = document.querySelector(".content-sending-licenses");
    if (isShow) {
      if ($contentLicenses.classList.contains("d-none"))
        $contentLicenses.classList.remove("d-none");
    }
    else {
      if (!$contentLicenses.classList.contains("d-none"))
        $contentLicenses.classList.add("d-none");
    }
  };

  const showContentLicensesPurchases = (isShow) => {
    //mostramos el contendor de licencias compradas
    const $contentDownload = document.querySelector(".content-my-downloads");
    const $contentSearch = document.querySelector('.distributed-licenses .content-search');

    if (isShow) {
      if ($contentDownload.classList.contains("d-none"))
        $contentDownload.classList.remove("d-none");

      if ($contentSearch.classList.contains('d-none'))
        $contentSearch.classList.remove('d-none');
    }
    else {
      if (!$contentDownload.classList.contains("d-none"))
        $contentDownload.classList.add("d-none");

      if (!$contentSearch.classList.contains('d-none'))
        $contentSearch.classList.add('d-none');
    }
  };

  const customSectionMyClients = () => {
    const $contentSearch = document.querySelector(".content-sending-licenses .search-header");
    const $title = $contentSearch.querySelector("h2");

    $title.innerHTML = getConfigMessage.strings.MyDownloads.SendClients;

    // insertamos el texto de la seccion
    const $selectText = `<div class="content-title"><span class="title-desc">${getConfigMessage.strings.MyDownloads.SelectClientsSendLicenses}</span></div>`;
    $contentSearch.insertAdjacentElement("afterend", confi.createVirtualDOM($selectText));

  };

  const setMoreQuantityLicense = (total) => {
    const $labelQuantity = document.querySelector(".quantity");
    let setQuantity = parseInt($labelQuantity.innerHTML);
    setQuantity++;
    if (setQuantity > total)
      setQuantity--;

    $labelQuantity.innerHTML = setQuantity;
  };

  const setSubQuantityLicense = () => {
    const $labelQuantity = document.querySelector(".quantity");
    let setQuantity = parseInt($labelQuantity.innerHTML);
    setQuantity--;
    if (setQuantity < 0)
      setQuantity++;

    $labelQuantity.innerHTML = setQuantity;
  };

  const handleToReturn = () => {
    //limpiamos los controles
    emptyElementsLicenses();

    //ocultamos el contendor de licencias
    showContentLicenses(false);

    //mostramos el div d elicencias compradas
    showContentLicensesPurchases(true);
  };

  const emptyElementsLicenses = () => {
    //limpiamos la tabla
    const $tableLicenses = document.querySelector(".table-licenses");
    $tableLicenses.innerHTML = "";

    //limpiamos seccion clientes
    const $content = document.querySelector(".content-sending-licenses");

    //search clients
    const $searhClients = $content.querySelector(".content-search");
    if ($searhClients) $searhClients.remove();

    //seccion clientes
    const $contentClients = $content.querySelector(".content-my-clients-licenses");
    if ($contentClients) $contentClients.innerHTML = "";
  };

  const showViewSendLicenses = (SKU,MPN,Description,Brand,UrlImage,nameClient,Email) => {
    debugger
    const $data = {
      sku: SKU,
      mpn: MPN,
      description: Description,
      brand: Brand,
      urlImage: UrlImage,
      nameClient: nameClient,
      email: Email
    };

    hideSectionSendCodeToClients();
    MyCodes.handleShowLicence(SKU, MPN, Description, Brand, UrlImage, nameClient, Email,true);
    confi.scrollTo(0, 900);
  };

  const hideSectionSendCodeToClients = () => {
    debugger
    const $contentSendLicences = document.querySelector('.content-send-licenses');
    const $contentClientsLicences = document.querySelector('.my-clients-licenses');

    if (!$contentSendLicences.classList.contains('d-none'))
      $contentSendLicences.classList.add('d-none');

    if (!$contentClientsLicences.classList.contains('d-none'))
      $contentClientsLicences.classList.add('d-none');

    const $contentLicence = document.querySelector('.activation-codes');
    if ($contentLicence.classList.contains('d-none'))
      $contentLicence.classList.remove('d-none');
  };

  return {
    init,
    customSectionMyClients,
    setSubQuantityLicense,
    setMoreQuantityLicense,
    handleToReturn,
    showViewSendLicenses
  }
})();