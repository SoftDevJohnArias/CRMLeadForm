const templateFields = (() => {

  const FIELD_TYPE = {
    text: "text",
    radio: "radio",
    checkbox: "checkbox",
    email: "email",
    select: "select",
    phone: "phone",
    tel: "tel",
    cellphone: "cellphone",
    file: "file",
    link: "link",
    informative: "informative",
  };

  const VALIDATION_TYPE = {
    alphanumeric: 'alphanumeric',
    charactersOnly: 'charactersOnly',
    onlyNumber: 'onlyNumber',
    none: 'none'
  };

  const createRange = ({ minlength, maxlength }) => {

    let range = null;


    if (minlength && maxlength) {
      range = `{${minlength},${maxlength}}`;
    }
    else if (minlength) {
      range = `{${minlength},}`;
    }
    else if (maxlength) {
      range = `{${maxlength}}`;
    }

    return range;
  };

  const createRegexInput = (validationType, minlength, maxlength, specialCharacters = []) => {

    const range = createRange({ minlength, maxlength });

    switch (validationType) {

      case VALIDATION_TYPE.alphanumeric: {
        if (specialCharacters?.length > 0) {

          const characters = specialCharacters.join("");
          return `^[a-zA-Z0-9 \\${characters}\\^\)\(+=._-]${range}$`;
        }
        return `^[a-zA-Z0-9 ]${range}$`;
        //return `\\w${range || "+"}`;
      }
      case VALIDATION_TYPE.onlyNumber: {
        if (specialCharacters?.length > 0) {
          const characters = specialCharacters.join("");
          return `^[0-9 \\${characters}\\^\)\(+=._-]${range}$`;
        }
        //return `\\d${range || "+"}`;
        return `^[0-9]${range}$`;

        //return `^([0-9])${range}$"`;
      }
      case VALIDATION_TYPE.charactersOnly: {
        return `^[a-zA-Z ]${range}$`;
      }
      case VALIDATION_TYPE.none: {
        return "";
      }
      default:
        return `\\w${range || "+"}`;
    }
  };

  const getTemplateInput = ({
    options,
    isRequired,
    fieldType,
    name,
    label,
    guidValue,
    group,
    indicative,
    hasDependency = false,
    fieldID,
    isBlock,
    geographicLevel,
    rules = {},
  }) => {
    switch (fieldType) {
      case FIELD_TYPE.text:
        return createInputText({ isRequired, fieldType, name, label, guidValue, classStyle: group?.classStyle, rules, fieldID, isBlock, hasDependency });
      case FIELD_TYPE.email:
        return createInputText({ isRequired, fieldType, name, label, rules });
      case FIELD_TYPE.checkbox:
        return createInputCheck({ options, isRequired, fieldType, name, label, hasDependency, isBlock });
      case FIELD_TYPE.radio:
        return createInputRadio({ options, isRequired, hasDependency, fieldType, name, label });
      case FIELD_TYPE.select:
        return createSelect({ options, isRequired, fieldType, name, label, hasDependency, classStyle: group?.classStyle, geographicLevel, isBlock });
      case FIELD_TYPE.phone:
        return createInputPhone({ options, isRequired, name, label, indicative, rules });
      case FIELD_TYPE.cellphone:
        return createInputCellphone({ options, isRequired, name, label, indicative, rules });
      case FIELD_TYPE.tel:
        return createInputTel({ options, isRequired, name, label, rules });
      case FIELD_TYPE.file:
        return createInputFile({ isRequired, name, label, });
      case FIELD_TYPE.link:
        return createLink({ name, label, hasDependency });
      case FIELD_TYPE.informative:
        return createInformative({ name, hasDependency });
      default:
    }

  };

  const createInputText = ({ isRequired, fieldType, name, label, guidValue, classStyle, rules = {}, fieldID, isBlock, hasDependency }) => {
    const { uppercase = false, minlength, maxlength, validationType, } = rules || {};

    const regex = createRegexInput(validationType?.type, minlength, maxlength, validationType?.specialCharacters);

    let eventOnInput = '';
    let eventOnFocus = '';
    let eventOnBlur = '';
    let eventOnChange = '';
    //let eventOnChangeNotRequeired = '';

    //let eventOnBlur = '';
    let classEmail = '';

    if (name === 'ph_documenttypeid') {
      eventOnFocus = `onfocus='validationMessages.validateDocumentByCountry(this)'`;
      eventOnBlur = `onblur='validationMessages.EmptyDocumentByCountry(this)'`;
    }

    if (!isRequired && validationType?.type === 'charactersOnly') {
      eventOnInput = `oninput = 'leadForm.validTextEntry(this)'`;
    }

    if (!isRequired && name === 'emailaddress3') {
      eventOnInput = `oninput = 'leadForm.validEmail(this)'`;
    }
    //
    
    if (!isRequired && (name === 'ph_dui' || name === 'ph_nrc1' || name === 'ph_nrc' || name === 'address1_line3')) {
      debugger
      eventOnChange = `onchange = 'leadForm.handleFieldNotRequired(this)'`;
    }
    
    if (name === 'ph_companyidentification' || name === 'ph_documentdigitid') {
      eventOnFocus = `onfocus='validationMessages.validateDocumentByCountry(this)'`;
      eventOnChange = `onchange = 'leadForm.validateLeadExistence(this);leadForm.handleTextWrite(this)'`;
      //eventOnInput = `oninput = 'confi.debounce(leadForm.handleTextWrite(this), 2000);'`;

      //eventOnChange = `onchange = 'leadForm.handleTextWrite(this)`;

      if (companyLead.getCompanyId() === "XCL") {
        eventOnBlur = `onblur = 'validationMessages.validateDocumentByCountry(this)'`;
      }


    }
    if (name === 'emailaddress1' || name === 'emailaddress2') {      
      //eventOnInput = `oninput = 'contactLead.handleValidChangeEmail(this)'`;
      //eventOnChange = `onchange = 'leadForm.validateLeadExistence(this)'`;
      eventOnInput = `oninput = 'confi.debounce(leadForm.validateLeadExistence(this), 1000);contactLead.handleValidChangeEmail(this)'`;
      classEmail = "email";
    }


    if (name === 'ph_identification') {      
    eventOnChange = `onchange = 'leadForm.validateLeadExistence(this)'`;
    }

    if (isRequired === false && name === 'ph_dui') {
      eventOnBlur = `onblur='validationMessages.validateDocumentByCountry(this)'`;
    }

    let classGroup = "";
    if (companyLead.getCompanyId() === "XSV") {
      if (name === "ph_companyidentification" || name === "ph_dui")
        classGroup = "item-group";
    }

    return `<div class="field form-group ${classGroup}">
                    <input type="${fieldType}"
                            name="${name}"
                            id="${fieldID}${guidValue ? guidValue : ''}"
                            class="${classStyle || "input-big"} ${uppercase ? "uppercase" : ""} ${isBlock ? "element-disabled" : ""} ${classEmail}"
                            placeholder="${label}"
                            ${fieldType === FIELD_TYPE.email ? `data-validate-rule="email"` : ""}
                            ${isRequired ? "data-required required" : "data-not-required"}
                            ${minlength ? `minlength="${minlength}"` : ""}
                            ${maxlength ? `maxlength="${maxlength}"` : ""}
                            data-validate-regex="${regex}" 
                            ${eventOnInput} 
                            ${eventOnFocus} 
                            ${eventOnBlur}
                            ${eventOnChange}
                            
                     >
                   
                    <label title="${label}" for="${name}" data-title="${label}"></label>
                    <span class="error-message"></span>
                  </div>`;
  };

  const createInputCheck = ({ options, name, isRequired, label, isBlock, hasDependency = false }) => {
    let eventCheck = '';
    let blockCheck = '';


    if (name === 'SelectFeatures') {
      eventCheck = `onclick = 'contactLead.handleClickSelectFeatures(this)'`;
    }
    if (hasDependency) {
      if (name === 'ph_agreepersonaldatause' || name === 'ph_acceptsarlaft' || name === 'ph_IVATaxpayer' || name === 'ph_politicallyexposed') {
        eventCheck = `onclick = 'leadForm.handleFieldsCheck(this,${JSON.stringify(options)})'`;
      }
    }
    if (isBlock) {
      blockCheck = 'disabled';
    }

    const checks = options.map(({ optionId, optionValue, optionGuid }) => (`
                             <label  class="container-label check form-group">${optionValue}
                                  <input type="checkbox"  ${eventCheck} name="${name}${optionId}" value="${optionGuid}" ${blockCheck}>
                                  <span class="checkmark "></span>
                              </label>
                              `)).join('');

    let classStyle = '';
    let classStyleIva = '';
    let id = '';

    const { initialSteps, currenIndexStep } = leadForm.getState();
    if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
      classStyle = 'contacts-radio';
      classStyleContent = 'content-multiselection';
    }

    if (name === 'ph_agreepersonaldatause') {
      classStyle = 'content-agree';
    }

    if (name === 'ph_acceptterms') {
      classStyle = 'content-accept';
    }

    if (name === 'ph_IVATaxpayer' || name === 'ph_politicallyexposed') {
      classStyleIva = 'content-iva';
    }

    return `<div class="multi-selection-form ${classStyleIva} ${options.length === 1 ? `only-option` : ""}">
            <div class="title">
              ${isRequired && label ? `<label class="is-required"></label>` : ""}
              <span>${label || ``}</span>
            </div>
              <div class=" form-group">
                <div class="content-multiselection ${classStyle} ${classStyleIva}" ${isRequired ? "data-required required" : ""} >
                   ${checks}
                </div>
              </div>
            </div>`

  };

  const createInputRadio = ({ options = [], name, isRequired, hasDependency = false, label }) => {
    let eventCheck = '';
    if (hasDependency) {
      if (name === 'ph_voluntarydeclarationfundsource') {
        eventCheck = `onclick = 'leadForm.handleCheckSpecify(this,${JSON.stringify(options)})'`;
      }
    }

    const radios = options.map(({ optionId, optionValue }) => (`
                                 <label class="container-label radio">
                                      ${optionValue} 
                                      <input type="radio" id="${optionId}" name="${name}" ${eventCheck} value="${optionId}">
                                      <span class="radiomark"></span>
                                    </label>

          `)).join('');

    return `<div class="multi-selection-form radio">
              <div class="title">
              ${isRequired ? `<label class="is-required"></label>` : ""}
              <span >${label}</span>
            </div>
              <div class=" form-group">
                  <div class="content-multiselection" ${isRequired ? "data-required required" : ""}
                   >
                   ${radios}
                  </div>
              </div>
            </div>`
  };

  const createSelect = ({ options = [], name, isRequired, label, hasDependency = false, classStyle, geographicLevel = 0, isBlock }) => {

    let eventOnChange = '';
    let eventOnSelect = '';
    let style = '';
    const optionsDefaultValue = options ? [{ optionId: "", optionValue: "", optionGuid: "" }, ...options] : [];

    if (hasDependency) {
      if (name === 'payment_methods_id' || name === 'ph_buildingtype') {
        eventOnChange = `onchange = 'leadForm.handleFieldsThatDependsBlock(this,${JSON.stringify(options)})'`;
      }
      else if (geographicLevel > 0) {
        eventOnChange = `onchange = 'leadForm.handleGeographicLevel(${JSON.stringify(options)},this,${geographicLevel})'`;
      }
      else
        eventOnChange = `onchange = 'leadForm.hadleOnChangeDependency(${JSON.stringify(options)},this)'`;
    }
    if (name === 'business_line_id') {
      style = 'select-business';
    }

    return `<div class="floating-label form-group">
              <select
                  class="${classStyle || "select-big"} ${isBlock ? "element-disabled" : ""} ${style}"
                  ${isRequired ? "data-required required" : ""}
                  name="${name}"                  
                  ${eventOnChange}
                  ${eventOnSelect}
              >
               ${name === 'ph_purchaseintention' || name === 'ph_salesrange' || name === 'ph_roadtype' || name === 'ph_buildingtype' || name === 'ph_serviceprovider' ? optionsDefaultValue.map(({ optionId, optionValue }) => getTemplateOptionSelect(optionId, optionValue)) : optionsDefaultValue.map(({ optionValue, optionGuid, optionId }) => getTemplateOptionSelect(optionGuid, optionValue, null, optionId))}
              </select>
              <label for="${name}" class="label-select">${label}</label>
           </div>`;
  };

  const getTemplateOptionSelect = (value, text, selectedValue = null, id = null) => (
    `<option ${selectedValue ? "selected" : ""}
              value="${value}"
              optionId="${id}" >
              ${text}
     </option>`
  );

  const createInputPhone = ({ isRequired, name, label, indicative, rules }) => {
    const template = `<div class="input-group prefix">
                <span class="input-group-addon">${indicative}</span>
          ${createInputText(
      {
        isRequired,
        fieldType: FIELD_TYPE.text,
        name,
        label,
        classStyle: "input-phone",
        rules: rules
      })}
        </div>`;

    return template;

  };

  const createInputTel = ({ isRequired, name, label, rules }) => {
    const template = `<div class="input-group prefix-tel">             
          ${createInputText(
      {
        isRequired,
        fieldType: FIELD_TYPE.tel,
        name,
        label,
        classStyle: "input-cellphone",
        rules: rules
      })}
        </div>`;

    return template;

  };

  const createInputCellphone = ({ isRequired, name, label, indicative, rules }) => {
    const template = `<div class="input-group prefix">
                <span class="input-group-addon">${indicative}</span>
          ${createInputText(
      {
        isRequired,
        fieldType: FIELD_TYPE.text,
        name,
        label,
        classStyle: "input-cellphone",
        rules: rules
      })}       
        </div>`;

    return template;

  };

  const createSectionFields = ({ SectionName: name, SubTitle, htmlFields }) => {
    return `<div class="section-content">
                         <div class="title-section">
                             <h5>${name}</h5>
                          </div>
                           ${SubTitle ? `<p class="adictional-information ">${SubTitle}</p>` : ""}
                           ${htmlFields}
                      </div>
                      `;
  };


  const createTemplateGroupFields = (htmlFields) => (
    `<div class="group-fields">${htmlFields}</div>`
  );


  const createSectionNextStep = ({ goBack = false }) => {

    const template = ` <div class="section-next-step">
                          ${goBack ? `
                            <button 
                              type="button" 
                              class="btn btn-small btn-white back"
                              onClick="leadForm.handleClickGoBack(this)"
                             >
                              <i class="icon-ws-ico-min-left"></i>
                                 ${getConfigMessage.strings.Lead.GoBack}
                            </button>` : ""}
                          <button type="submit" class="btn btn-blue btn-big-large btn-save-lead next">
                               ${getConfigMessage.strings.Lead.NextStep}
                            </button>
                       </div>`

    return confi.createVirtualDOM(template);
  };

  const createContactList = ({ id = 1, fullName, ocupation, type }) => {
    const template = `<div class="content-contact" data-id=${id}>
                        <div class="notification-contact js-content">
                           <div class="content-contact-header ${type}">
                             <div class="content-text">
                              <p>${fullName}</p>
                              <p>${ocupation}</p>
                            </div>
                         </div>                    
                         <div class="content-link">
                            <a href="#" id="lnkEdit" class="lnk-main" 
                            onclick="contactLead.handleSectionContactComplete(this);return false;">${getConfigMessage.strings.Lead.Edit}</a> ${type === contactType.representative ? "" : `<div class="separator-link"></div>`}
                            ${type === contactType.representative ? "" : `<a href="#" id="lnkDelete" class="lnk-main"
                            onclick="contactLead.handleDeleteSection(this);return false;">${getConfigMessage.strings.Lead.Delete}</a>`}
                          </div>
                        </div> 
                        <hr class="separator" />
                        <form id="contact-form" novalidate></form>
                      </div>`

    return confi.createVirtualDOM(template);
  };

  const createTemplateEdtionContact = () => {

    const template = `<div class="content-buttons">
                             <button
                               class="btn btn-cancel btn-medium"
                              type="button" 
                               onClick="contactLead.handleClickCancelEdition(this);return false;"

                             >
                                ${getConfigMessage.strings.Lead.Cancel}
                             </button>
                            <button 
                                class="btn btn-white btn-big"
                                onClick="contactLead.handleClickUpdateContact(this);return false;"  
                                type="button" 
                                >
                                ${getConfigMessage.strings.Lead.UpdateContact}
                            </button>
                        </div>`;

    return confi.createVirtualDOM(template);
  }

  const createInputFile = ({ isRequired, name, label, }) => {

    return `<div class="file-container form-group"">
                <input
                  type="file"
                  name="file-data-${name}"
                  class="file-lead"
                  ${isRequired ? "data-required required" : ""}
                  accept="application/msword, .docx, application/pdf, image/jpeg , image/png"
                />
                <input type="text" name="${name}"
                  ${isRequired ? "data-required required" : ""}
                  class="file-name" 
                  readonly="readonly"
                  data-filenameoriginal="${label}"  
                >
                <span class="floating-label">${label}</span>
                <a class="lnk-main lnk-action-file" href="#"">${getConfigMessage.strings.Lead.UploadFile}</a>
            </div>
          `;
  };

  const createLink = ({ name, label, hasDependency = false }) => {

    let eventOnClick = '';
    let classStyle = '';
    if (hasDependency) {
      if (name === 'seeStatement') {
        eventOnClick = `onclick = 'modal.openStatement()'`;
        classStyle = 'seeStatement';
      }
    }

    return `<div class="content-link ${classStyle}">
               <a href="#" class="lnk-statement" name="${name}" ${eventOnClick}>${label}</a>
            </div>`;
  };

  const createInformative = ({ name, hasDependency = false }) => {
    let template = '';
    let url = 'https://authrfc.siat.sat.gob.mx/nidp/idff/sso?RequestID=id4f9M6xGSE49ZGlMrVM4hirZdHfI&MajorVersion=1&MinorVersion=2&IssueInstant=2020-07-30T19%3A30%3A47Z&ProviderID=https%3A%2F%2Frfc.siat.sat.gob.mx%3A443%2Fnesp%2Fidff%2Fmetadata&RelayState=MA%3D%3D&consent=urn%3Aliberty%3Aconsent%3Aunavailable&agAppNa=PTSC&ForceAuthn=false&IsPassive=false&NameIDPolicy=onetime&ProtocolProfile=http%3A%2F%2Fprojectliberty.org%2Fprofiles%2Fbrws-art&target=https%3A%2F%2Frfc.siat.sat.gob.mx%2FPTSC%2FRFC%2Fmenu%2Findex.jsp%3Fopcion%3D4&AuthnContextStatementRef=%2Furi%2Fanyauthentication';


    if (name === 'info_taxstatusproof') {
      template = `<div class="content-info-const">                   
                     <p>
                       ${getConfigMessage.strings.Lead.InfoConst}
                       <a href="${url}">${getConfigMessage.strings.Lead.Here}</a>
                     </p>
                     <p>
                       ${getConfigMessage.strings.Lead.InfoWebSat}
                       <a href="www.sat.gob.mx">www.sat.gob.mx</a>
                     </p>
                   </div>`;
    }

    if (name === 'info_constitutiveact') {
      template = `<div class="content-info-act">
                     <p>${getConfigMessage.strings.Lead.InfoAct}</p>
                  </div>`;
    }

    return template;
  };


  return {
    getTemplateInput,
    createSectionFields,
    createTemplateGroupFields,
    createSectionNextStep,
    createContactList,
    createInputFile,
    createInputText,
    createTemplateEdtionContact,
    getTemplateOptionSelect,
    createLink,
    createInformative,

  };

})();