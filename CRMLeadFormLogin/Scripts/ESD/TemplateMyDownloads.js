const templateMyDownloads = (() => {

  const templateSearchDownloads = () => {
    //const template = ` <div class="content-search column-height-03 flex-search content-search-MyDownloads">
    //                    <div class="column-medium">
    //                      <div class="content-search-esd margin-01">
    //                        <div class="search-esd">
    //                          <div class="icon-search-esd" onclick="MyDownloads.handleClickSearchLicence()">
    //                            <i class="icon-ws-ico-min-search"></i>
    //                          </div>
    //                          <input type="text" class="searchMyDownloads" placeholder="${getConfigMessage.strings.MyDownloads.SearchLicenses}">
    //                        </div>
    //                      </div>
    //                    </div>
    //                    <div class="column-small">
    //                      <div class="content-total">
    //                        <p><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Products}</p>
    //                      </div>
    //                    </div>
    //                  </div>`;

    const template = ` <div class="content-search column-height-03 flex-search content-search-MyDownloads">
                        <div class="column-medium">
                          <div class="content-search-esd margin-01">
                            <div class="search-esd">
                              <div class="icon-search-esd" onclick="MyDownloads.handleClickSearchLicence()">
                                <i class="icon-ws-ico-min-search"></i>
                              </div>
                              <input type="text" class="searchMyDownloads" placeholder="${getConfigMessage.strings.MyDownloads.SearchLicenses}">
                            </div>
                          </div>
                        </div>
                        <div class="column-small">
                          <div class="content-total total-count-downloads">
                          </div>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateTextCountTotal = (count) => {
    return `<p><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Products}</p>`;
  };

  const templatebtnSendLicenses = () => {
    const template = ` <div class="button-send-licenses">
                         <button type="button"
                                 id="btnSendLicenses"
                                 onClick="validationEmail.handle(this)"
                                 class="btn btn-medium-small btn-blue">
                           ${getConfigMessage.strings.MyDownloads.btnSend}
                         </button>
                       </div>`;
    return confi.createVirtualDOM(template);
  };

  const templateListProducts = () => {
    const template = ` <div class="header-list licenses">
                       <div class="column-big-01">
                         <p>${getConfigMessage.strings.MyDownloads.Product}</p>
                       </div>
                       <div class="column-small">
                         <p>${getConfigMessage.strings.MyDownloads.Availability}</p>
                       </div>
                       <div class="column-small">
                         <p>${getConfigMessage.strings.MyDownloads.Action}</p>
                       </div>
                     </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateBodyListProducts = (elements) => {
    return elements.map(element =>
      (`<div class="body-list column-height-02">
                     <div class="column-big-01 license-style">
                          <div class="column-small-01">
                            ${element.UrlImage != null ? '<img src="https://iwsportaldvlp.intcomex.com/images/358702190">' : '<img src="/Content/img/no-picture-taking.svg">'} 
                          </div>
                          <div class="column-medium">
                            <p class="name">${element.Description}</p>
                            <p class="brand">${element.Brand}</p>
                            <p class="sku">NP: ${element.MPN} | SKU: ${element.SKU}</p>
                          </div>
                        </div>
                        <div class="column-small">
                            <p class="availability">${element.Available.Redistributed} ${getConfigMessage.strings.MyDownloads.Of} ${element.Available.Total}</p>
                        </div>
                        <div class="column-small btn-send">
                             ${element.Available.Redistributed != 0 ? `<button class="btn btn-medium-small btn-blue" onclick="SendingLicenses.init('${element.UrlImage}','${element.Brand}','${element.Description}','${element.MPN}','${element.SKU}','${element.Available.Redistributed}','${element.Available.Total}');">${getConfigMessage.strings.MyDownloads.btnSend}</button>` : ''}
                        </div>
                     </div>`)).join("");

  };

  //const templateBodyListProducts = (elements) => {
  //  return elements.map(({ SKU, MPN, Description, Brand, UrlImage, Available = { Redistributed, Total } }) =>
  //    (`<div class="body-list column-height-02">
  //                   <div class="column-big license-style">
  //                        <div class="column-small-01">
  //                          ${UrlImage != null ? '<img src="https://iwsportaldvlp.intcomex.com/images/358702190">' : '<img src="/Content/img/no-picture-taking.svg">'} 
  //                        </div>
  //                        <div class="column-medium">
  //                          <p class="name">${Description}</p>
  //                          <p class="brand">${Brand}</p>
  //                          <p class="sku">NP: ${MPN} | SKU: ${SKU}</p>
  //                        </div>
  //                      </div>
  //                      <div class="column-small-medium">
  //                          <p class="availability">${Available.Redistributed} ${getConfigMessage.strings.MyDownloads.Of} ${Available.Total}</p>
  //                      </div>
  //                      <div class="column-small btn-send">
  //                           ${Available.Redistributed != 0 ? `<button class="btn btn-medium-small btn-blue" onclick="SendingLicenses.init(JSON.stringify({ SKU: ${SKU},MPN:${MPN},Description:${Description},Brand:${Brand},UrlImage:${UrlImage},Available:${Available}}));">${getConfigMessage.strings.MyDownloads.btnSend}</button>` : ''}
  //                      </div>
  //                   </div>`)).join("");

  //};

  const templatePaginator = (data) => {
    const template = `<div class="content-paginator paginator-licenses">
                        <div class="content-text-page">
                          <p class="text-pager">${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Mincodes}</p>
                        </div>
                        <div class="content-btn">
                          <button class="btn btn-small-short btn-show-more">${getConfigMessage.strings.MyDownloads.btnSeeMore}</button>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templatePager = (data) => {
    const template = ` <div class="content-pager pager-licenses">
                         <p>${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Mincodes}</p>   
                       </div>`;

    return confi.createVirtualDOM(template);
  };


  return {
    templateSearchDownloads,
    templatebtnSendLicenses,
    templateListProducts,
    templateBodyListProducts,
    templatePaginator,
    templatePager,
    templateTextCountTotal,
  };
})();

const templateMyClients = (() => {

  //const templateSearchClients = (count) => {
  //  const template = `<div class="content-search column-height-04">
  //                     <div class="search-header border-header">
  //                       <h2>${getConfigMessage.strings.MyDownloads.MyClients}</h2>
  //                     </div>
  //                     <div class="search-body flex-search">
  //                       <div class="column-medium">
  //                         <div class="content-search-esd margin-01">
  //                           <div class="search-esd">
  //                             <div class="icon-search-esd">
  //                               <i class="icon-ws-ico-min-search"></i>
  //                             </div>
  //                             <input type="text" placeholder="${getConfigMessage.strings.MyDownloads.SearchClients}">
  //                           </div>
  //                         </div>
  //                       </div>
  //                       <div class="column-small">
  //                         <div class="content-total">
  //                           <button class="btn btn-big-one btn-blue"
  //                                   type="button"
  //                                   onclick="MyClients.handleClickShowForm(this)">   ${getConfigMessage.strings.MyDownloads.btnNewClient}</button>
  //                           <p class="padding-01"><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Clients}</p>
  //                         </div>
  //                       </div>
  //                     </div>   
  //                   </div>`;

  //  return confi.createVirtualDOM(template);
  //};


  const templateSearchClients = (count) => {
    const template = `<div class="content-search" style="height:auto;">
                            <div class="search-header border-header">
                              <h2>${getConfigMessage.strings.MyDownloads.MyClients}</h2>
                            </div>
                            <div class="notifications-esd"></div>  
                            <div class="flex-search">
                              <div class="column-medium">
                                <div class="content-search-esd margin-01">
                                  <div class="search-esd">
                                    <div class="icon-search-esd">
                                      <i class="icon-ws-ico-min-search"></i>
                                    </div>
                                    <input type="text" placeholder="${getConfigMessage.strings.MyDownloads.SearchClients}">
                                  </div>
                                </div>
                              </div>
                              <div class="column-small">
                                <div class="content-total">
                                  <button class="btn btn-big-one btn-blue"
                                          type="button"
                                          onclick="MyClients.handleClickShowForm()">
                                          ${getConfigMessage.strings.MyDownloads.btnNewClient}
                                  </button>
                                  <p class="padding-01"><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Clients}</p>
                                </div>
                              </div>
                            </div>
                          </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateListClients = (show) => {
    const template = ` <div class="header-list clients">
                        <div class="column-small-medium">
                          <p>${getConfigMessage.strings.MyDownloads.Name}</p>
                        </div>
                        <div class="column-small-medium">
                          <p>${getConfigMessage.strings.MyDownloads.Email}</p>
                        </div>
                        ${show === true ? `<div class="column-small"><p>${getConfigMessage.strings.MyDownloads.Country}</p></div>` : ''}
                        <div class="column-small">
                          <p>${getConfigMessage.strings.MyDownloads.Action}</p>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateBodyListClients = (elements, show, isLicenses=false, product = '') => {
    return elements.map(({ ClientId, TypePerson, CompanyName, Name, Email, CountryId }) =>
      (` <div class="body-list column-height-01">
             <div class="column-small-medium">
               <p>${Name}</p>
             </div>
             <div class="column-small-medium">
               <a href="#" id="lnkEmail" class="lnk-main">${Email}</a>
             </div>
             ${show === true ? `<div class="column-small"><p>${CountryId}</p></div>` : ''}
             ${isLicenses === true ? `<div class="column-small">
                  <button type="button"
                                 id="btnSendLicenses"
                                 onClick="SendingLicenses.showViewSendLicenses('${product.sku}','${product.mpn}','${product.description}','${product.brand}','${product.urlImage}','${Name}','${Email}')"
                                 class="btn btn-medium-small btn-blue">
                           ${getConfigMessage.strings.MyDownloads.btnSend}
                  </button>
             </div>`:
              `<div class="column-small">
               <a href="#" id="lnkEdit" onclick="MyClients.handleClickUpdateClient(${ClientId},'${TypePerson}','${CompanyName}','${Name}','${Email}','${CountryId}')" class="lnk-main">${getConfigMessage.strings.MyDownloads.linkEdit}</a>
             </div>`}
           </div>
         </div>`)).join("");

  };

  const templatePaginator = (data) => {
    const template = `<div class="content-paginator paginator-clients">
                        <div class="content-text-page">
                          <p class="text-pager">${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Mincodes}</p>
                        </div>
                        <div class="content-btn">
                          <button class="btn btn-small-short btn-show-more-clients">${getConfigMessage.strings.MyDownloads.btnSeeMore}</button>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templatePager = (data) => {
    const template = ` <div class="content-pager pager-clients">
                         <p>${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Clients}</p>   
                       </div>`;

    return confi.createVirtualDOM(template);
  };

  return {
    templateSearchClients,
    templateListClients,
    templateBodyListClients,
    templatePaginator,
    templatePager
  }

})();

const templateMyCodes = (() => {

  const templateSearchCodes = (count) => {
    const template = `<div class="content-search column-height-05">
                       <div class="search-header">
                         <h2>${getConfigMessage.strings.MyDownloads.DistributedCodes}</h2>
                       </div>
                       <div class="search-body-01 flex-search">
                         <div class="column-medium">
                           <div class="content-search-esd margin-01">
                             <div class="search-esd">
                               <div class="icon-search-esd">
                                 <i class="icon-ws-ico-min-search"></i>
                               </div>
                               <input type="text" placeholder="${getConfigMessage.strings.MyDownloads.SearchCodes}">
                             </div>
                           </div>
                         </div>
                         <div class="column-small">
                           <div class="content-total">
                             <p><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Products}</p>
                           </div>
                         </div>
                       </div>   
                     </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateListCodes = () => {
    const template = `  <div class="header-list codes">
                         <div class="column-big-big">
                           <p>${getConfigMessage.strings.MyDownloads.Product}</p>
                         </div>
                         <div class="column-small-medium-01">
                           <p>${getConfigMessage.strings.MyDownloads.Client}</p>
                         </div>
                         <div class="column-small-02">
                           <p>${getConfigMessage.strings.MyDownloads.Date}</p>
                         </div>
                         <div class="column-small-02">
                           <p>${getConfigMessage.strings.MyDownloads.Total}</p>
                         </div>
                         <div class="column-small-02">
                           <p>${getConfigMessage.strings.MyDownloads.Action}</p>
                         </div>
                       </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateBodyListCodes = (elements) => {
    return elements.map(({ SKU, MPN, Description, BrandDescription, UrlImage, FullName, Total, DateSent }) =>
      (`  <div class="body-list column-height-02">
           <div class="column-big-big license-style">
             <div class="column-small-03">
               ${UrlImage != null ? '<img src="https://iwsportaldvlp.intcomex.com/images/358702190">' : '<img src="/Content/img/no-picture-taking.svg">'} 
             </div>
             <div class="column-small-medium-01">
               <p class="name">${Description}</p>
               <p class="brand">${BrandDescription}</p>
               <p class="sku">NP: ${MPN} | SKU: ${SKU}</p>
             </div>
           </div>
           <div class="column-small-medium-01 availability">
             <a href="#" class="lnk-main">${FullName}</a>
           </div>
            <div class="column-small-02">
             <p class="availability">${DateSent}</p>
           </div>
           <div class="column-small-02">
             <p class="availability">${Total}</p>
           </div>
           <div class="column-small-02 availability">
             <a href="#" onclick="MyCodes.handleShowLicence('${SKU}','${MPN}','${Description}','${BrandDescription}','${UrlImage}','${FullName}','abc@gmail.com','false')" class="lnk-main">${getConfigMessage.strings.MyDownloads.Resend}</a>  <a class="separator">|</a>  <a href="#" onclick="MyCodes.handleShowCodes()" class="lnk-main">${getConfigMessage.strings.MyDownloads.Codes}</a>
           </div>
         </div>`)).join("");
  };

  const templatePaginator = (data) => {
    const template = `<div class="content-paginator paginator-codes">
                        <div class="content-text-page">
                          <p class="text-pager">${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Products}</p>
                        </div>
                        <div class="content-btn">
                          <button class="btn btn-small-short btn-show-more-codes">${getConfigMessage.strings.MyDownloads.btnSeeMore}</button>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templatePager = (data) => {
    const template = ` <div class="content-pager pager-codes">
                         <p>${getConfigMessage.strings.MyDownloads.Showing} <b>1 - ${data.rangePager}</b> ${getConfigMessage.strings.MyDownloads.Of} ${data.totalPager} ${getConfigMessage.strings.MyDownloads.Products}</p>   
                       </div>`;

    return confi.createVirtualDOM(template);
  };

  return {
    templateSearchCodes,
    templateListCodes,
    templateBodyListCodes,
    templatePaginator,
    templatePager
  }

})();

const templatesCodesDistributed = (() => {
  const templateTableCodesDistributed = (value) => {
    return `<div class="row-info">
              <span>${value}</span>                      
            </div>
            <hr class="separator" />`;
  };

  const templateTitleTable = () => {
    return `<div class="row-title">
              <span class="title">"value"</span>                      
            </div>
            <hr class="separator" />`;
  };

  const templateEmailPerson = (dataPerson) => {
    return `<p class="nameCode">${getConfigMessage.strings.MyDownloads.CodeWillBeSend} <b>${dataPerson.nameClient}</b></p> 
                       <div class="field form-group">
                         <input type="text"
                                name="name"
                                class="input-big person-email"
                                placeholder=""
                                value='${dataPerson.email}'
                                minlength="5" maxlength="60"
                                data-validate-regex="^[a-zA-Z0-9 ]{5,60}$">
                         <label title="${getConfigMessage.strings.MyDownloads.ConfirmEmail}"
                                for="name" data-title="${getConfigMessage.strings.MyDownloads.ConfirmEmail}">
                         </label>
                         <span class="error-message"></span>
                       </div>`;
    //return confi.createVirtualDOM(template);
  };

  const templateLicencePerson = (product) => {
    debugger
    return ` <div class="body-list column-height-02">
                         <div class="column-big license-style">
                           <div class="column-small-03">
                             <img src="${product.urlImage}">
                           </div>
                           <div class="column-medium">
                             <p class="name">${product.description}</p>
                             <p class="brand">${product.brand}</p>
                             <p class="sku">NP: ${product.mpn} | SKU: ${product.sku}</p>
                           </div>
                         </div>
                       </div>`;
    //return confi.createVirtualDOM(template);
  }; 

  const templateNotificationSendLicence = (name,email) => {
    return ` <p class="nameCode">${getConfigMessage.strings.MyDownloads.TextCodesName} <b>${name}</b></p>
             <div class="content-notification-esd esd-success align-text-notification-codes">
               <i class="icon-check-notification"></i>
               <p>${getConfigMessage.strings.MyDownloads.CodeNotificationSend} ${email}</p>
             </div>`;
  };

  return {
    templateTableCodesDistributed,
    templateTitleTable,
    templateEmailPerson,
    templateLicencePerson,
    templateNotificationSendLicence
  };
})();

const templateNotificationsESD = (() => {

  const templateNotificationCreateCliente = (msg) => { 
    const template = `<div class="content-notification-esd esd-success align-text-notification">
                        <i class="icon-check-notification"></i>
                        <p>${msg}</p>
                      </div>`;

    return confi.createVirtualDOM(template);
  }; 

  return {
    templateNotificationCreateCliente,
  }
})();


const templatesSendingLicenses = (() => {
  const templateBodyListLicenses = (UrlImage, Brand, Description, MPN, SKU, Redistributed, Total) => {

    const template = `<div class="body-list column-height-02">
                     <div class="column-big license-style">
                          <div class="column-small-01">
                            ${UrlImage != null ? `<img src="${UrlImage}">` : '<img src="/Content/img/no-picture-taking.svg">'} 
                          </div>
                          <div class="column-medium">
                            <p class="name">${Description}</p>
                            <p class="brand">${Brand}</p>
                            <p class="sku">NP: ${MPN} | SKU: ${SKU}</p>
                          </div>
                        </div>
                        <div class="column-small-medium column-quantity">
                        <div class="content-quantity">
                          <button type="button"
                                 id="subQuantity"
                                 onClick="SendingLicenses.setSubQuantityLicense()">
                          -
                         </button>
                         <label class="quantity">0</label>
                         <button type="button"
                                 id="moreQuantity"
                                 onClick="SendingLicenses.setMoreQuantityLicense(${Redistributed})">
                          +
                         </button>
                        </div>
                        </div>
                         <div class="column-small-medium">
                            <p class="availability">${Redistributed} ${getConfigMessage.strings.MyDownloads.Of} ${Total}</p>
                        </div>
                     </div>`;

    return confi.createVirtualDOM(template);

  };

  const headerGridLicenses = () => {
    const template = ` <div class="header-list licenses">
                       <div class="column-big">
                         <p>${getConfigMessage.strings.MyDownloads.Product}</p>
                       </div>
                       <div class="column-small-medium">
                         <p>${getConfigMessage.strings.MyDownloads.Quantity}</p>
                       </div>
                       <div class="column-small-medium">
                         <p>${getConfigMessage.strings.MyDownloads.Availability}</p>
                       </div>
                     </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateSearchClientsLicenses = (count) => {
    const template = `<div class="content-search column-height-04">
                       <div class="search-header border-header">
                         <h2>${getConfigMessage.strings.MyDownloads.MyClients}</h2>
                       </div>
                       <div class="search-body flex-search">
                         <div class="column-medium">
                           <div class="content-search-esd margin-01">
                             <div class="search-esd">
                               <div class="icon-search-esd">
                                 <i class="icon-ws-ico-min-search"></i>
                               </div>
                               <input type="text" placeholder="${getConfigMessage.strings.MyDownloads.SearchClients}">
                             </div>
                           </div>
                         </div>
                         <div class="column-small">
                           <div class="content-total">
                             <button class="btn btn-big-one btn-blue" type="button">${getConfigMessage.strings.MyDownloads.btnNewClient}</button>
                             <p class="padding-01"><b>${count}</b> ${getConfigMessage.strings.MyDownloads.Clients}</p>
                           </div>
                         </div>
                       </div>   
                     </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateQuantityLicense = () => {

    const template = `<div class="content-quantity">
                        <button type="button"
                                 id="subQuantity"
                                 onClick="">
                          -
                         </button>
                         <label class="quantity">2</label>
                         <button type="button"
                                 id="moreQuantity"
                                 onClick="">
                          +
                         </button>
                      </div>`;

    return template;
  };

  return {
    templateBodyListLicenses,
    headerGridLicenses,
    templateSearchClientsLicenses,
    templateQuantityLicense,
  };
})();