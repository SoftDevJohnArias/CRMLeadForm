const myClientsForm = (() => {

  const templateCardsTypePerson = (elements) => {
    return elements.map(({ code, optionValue, IsNaturalPerson }) =>
      (` <div class="card-content position-card 
              ${IsNaturalPerson === true ? 'naturalPerson' : 'jurisdictionalPerson'}">
           <input type="radio"
                  ${IsNaturalPerson === true ? 'id="natural"' :'id="jurisdictional"'}
                  name="person" 
                  value="${code}"
                  onchange="FormDataClients.handleChangeSelectPerson(this)">
           ${IsNaturalPerson === true ? '<i class="icon-face-recognition"></i>':'<i class="icon-building"></i>'}
           <label ${IsNaturalPerson === true ? 'for="natural"' : 'for="jurisdictional"'}>${optionValue}</label>
         </div>`)).join("");
  };

  const templateInputShared = (dataEdit = '') => {
    return `<div class="field form-group">
               <input type="email"
                      name="email"
                      class="input-big"
                      placeholder="${getConfigMessage.strings.General.Email}" 
                      data-validate-rule="email"  
                      data-required="" 
                      required="" 
                      value='${dataEdit != '' ? dataEdit.Email : ""}'
                      maxlength="100" 
                      data-validate-regex="\w{100}">
               <label title="${getConfigMessage.strings.General.Email}" 
                      for="email"
                      data-title="${getConfigMessage.strings.General.Email}">
               </label>
               <span class="error-message"></span>
           </div>
           <div class="field form-group">
               <input type="text"
                      name="name"
                      class="input-big"
                      placeholder="${getConfigMessage.strings.MyDownloads.OptionalName}"
                      value='${dataEdit != '' ? dataEdit.Name : ""}'
                      minlength="5" maxlength="60" 
                      data-validate-regex="^[a-zA-Z0-9 ]{5,60}$">
               <label title="${getConfigMessage.strings.MyDownloads.OptionalName}" 
                      for="name" data-title="${getConfigMessage.strings.MyDownloads.OptionalName}">
               </label>
               <span class="error-message"></span>
            </div>`;
    //return `<div class="field form-group">
    //           <input type="email"
    //                  name="email"
    //                  class="input-big"
    //                  placeholder="${getConfigMessage.strings.General.Email}" 
    //                  data-validate-rule="email"  
    //                  data-required="" 
    //                  required="" 
    //                  value='${dataEdit != '' ? dataEdit.Email : ""}'
    //                  maxlength="100" 
    //                  data-validate-regex="\w{100}">
    //           <label title="${getConfigMessage.strings.General.Email}" 
    //                  for="email"
    //                  data-title="${getConfigMessage.strings.General.Email}">
    //           </label>
    //           <span class="error-message"></span>
    //       </div>`;
  };

  const templateInputDependency = (dataEdit = '') => {
    const template = `<div class="field form-group">
                         <input type="text"
                                name="companyname"
                                class="input-big"
                                placeholder="${getConfigMessage.strings.MyDownloads.CompanyName}" 
                                data-required=""    
                                required=""  
                                value='${dataEdit != '' ? dataEdit.CompanyName : ""}'
                                minlength="5" maxlength="60" 
                                data-validate-regex="^[a-zA-Z0-9 ]{5,60}$">
                         <label title="${getConfigMessage.strings.MyDownloads.CompanyName}" 
                                for="companyname"
                                data-title="${getConfigMessage.strings.MyDownloads.CompanyName}">
                         </label>
                         <span class="error-message"></span>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateSelectDependency = (options, selectedValue = false) => {

    return`<div class="floating-label form-group">
                        <select class="select-big select-country" 
                                data-required="" 
                                required="" 
                                name="country">
                         ${options.map(({ Name, Code }) => getTemplateOptionSelect(Name, Code, selectedValue))}
                        </select>                        
                        <label for="country"
                               class="label-select select-country">${getConfigMessage.strings.MyDownloads.Country}
                        </label>
                      </div>`;    

    //return confi.createVirtualDOM(template);
  };

  const templateButtonClient = (isEdit = false) => {
    return `<button type="button"
             id = "btnCancelClient"
             onclick = "FormDataClients.handleClickReturn()"
             class="btn btn-small-01 btn-white back" >
               ${getConfigMessage.strings.MyDownloads.btnCancel}
           </button >
           <button type="submit"
             id="btnAcceptClient"
             onclick="FormDataClients.handleSubmit(this)"
             class="btn btn-big btn-blue">
             ${isEdit ? getConfigMessage.strings.MyDownloads.btnUpdateClient : getConfigMessage.strings.MyDownloads.Accept}
            </button>`
  };

  const getTemplateOptionSelect = (name, code, selectedValue) => (
    `<option ${selectedValue ? "selected" : ""}
             value="${code}">
             ${name}
     </option>`
  );

  const templateParagraphSend = (isCreate) => {
    let template = '';
    if (isCreate === true) {
      template = `<p class="data-diligence">${getConfigMessage.strings.MyDownloads.DiligenceCreate} <b>${getConfigMessage.strings.MyDownloads.DiligenceCreateBold}</b></p>`;
    } else {
      template = `<p class="data-diligence">${getConfigMessage.strings.MyDownloads.DiligenceUpdate} <b>${getConfigMessage.strings.MyDownloads.DiligenceUpdateBold}</b></p>`;
    }

    return confi.createVirtualDOM(template);
  };

  return {
    templateCardsTypePerson,
    templateInputShared,
    templateInputDependency,
    templateSelectDependency,
    templateParagraphSend,
    getTemplateOptionSelect,
    templateButtonClient
  }
})();