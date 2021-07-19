const templateLead = (() => {

  const templateVerifyCode = () => {
    const template = `<div class="content-verification-code fade-anima">
                            <span class="second-title">${getConfigMessage.strings.Lead.VerifyYourEmail}</span>
                            <p class="text-main">${getConfigMessage.strings.Lead.TitleVerify}</p>
                            <div class="message-validation"></div>
                            <div class="input-user verify-code">
                              <div class="field form-group">
                                <input type="text"
                                       id="inputCode"
                                       name="lbcode"
                                       class="input-medium"
                                       placeholder="${getConfigMessage.strings.Lead.EnterCode}"
                                       required
                                       data-validate-regex="\\w{6}"
                                       minlength="6"
                                       maxlength="6"
                                       autocomplete="off"
                                       data-required>
                                <label title="${getConfigMessage.strings.Lead.EnterCode}" for="lbcode" data-title="${getConfigMessage.strings.Lead.EnterCode}"></label>
                              </div>
                              <button type="button" id="btnVerifyCode" class="btn btn-medium-large  btn-blue">
                                ${getConfigMessage.strings.Lead.CheckCode}
                              </button>
                            </div>
                            <a 
                              href="#"
                              id="lnkResend"
                              class="lnk-main verify-code">${getConfigMessage.strings.Lead.NotReceivedMail}
                            </a>
                        </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateErrorVerifyCode = () => (
    `<p class="warning-text fade-anima">${getConfigMessage.strings.Lead.CodeIncorrect}</p>
     <p class="info-text fade-anima">${getConfigMessage.strings.Lead.ActiveCode}</p>`
  );

  const templateSuccessVerifyCode = () => (
    `<i class="icon-check fade-anima"></i>
      <span class="title-success fade-anima">${getConfigMessage.strings.Lead.SuccessfullyVerified}</span>`
  );

  //original
  const templateMessageInfo = ({ type, title, messages }) => {
    const { typeInfo, contentTitle, titleMain, titleSecond } = getPropertiesNotification(type);

    const template = `<div class="content-notification ${typeInfo}"> 
            <div class="content-title ${contentTitle}"><span class="${titleMain}">${title}</span></div>

            </div>`;

    return confi.createVirtualDOM(template);
  };

  //prueba
  const templateMessageInfoValidate = ({ type, title, messages, url = []}) => {
    const { typeInfo, contentTitle, titleMain, titleSecond } = getPropertiesNotification(type);

    const urlLogin = url[0];
    const urlPassword = url[1];

    const template = `<div class="content-notification ${typeInfo}"> 
            <div class="content-title ${contentTitle}"><span class="${titleMain}">${title}</span></div>
               <p>${messages}</p>
             <div class="content-link">
               <a target="_blank" href="${urlLogin}" id="lnkLogin" class="lnk-main">${getConfigMessage.strings.Lead.LogIn}</a> <div class="separator-link"></div>
               <a target="_blank" href="${urlPassword}" id="lnkResetPass" class="lnk-main">${getConfigMessage.strings.Lead.ForgetPass}</a>
              </div>
           </div>`;

    return confi.createVirtualDOM(template);
  };

  //validate document forn
  const templateMessageDocumentValidate = (title, messages ) => {
    const template = `<div class="content-notification warning-info"> 
            <div class="content-title content-title-warning"><span class="title-main-info">${title}</span></div>
               <p>${messages}</p>            
           </div>`;

    return confi.createVirtualDOM(template);
  };

  const getPropertiesNotification = (type) => {
    const properties = {};

    switch (type) {

      case templateNotifications.warning:
        properties.typeInfo = "warning-info";
        properties.contentTitle = "content-title-warning";
        properties.titleMain = "title-main-info";
        properties.titleSecond = "title-second-info";
        break;
      case templateNotifications.error:
        properties.typeInfo = "error-info";
        properties.contentTitle = "content-title-error";
        properties.titleMain = "title-main-info";
        properties.titleSecond = "title-second-error";
        break;
      default:
        console.log('No evaluada');
    }
    return properties;
  }

  const createTemplateSteps = ({ steps = [] }) => {
    const rowLen = steps.length;

    return steps.map(({ SteptID, SteptName }, index) => {
      let isFirstStep = SteptID === 1;
      let isLastStep = rowLen === index + 1;
      return `<section 
                  id="setep-${index}" 
                  class="step ${isFirstStep ? "active" : "inactive"}"
                  data-numberStep="${SteptID}"
              >
                  <div class= "number-step">${SteptID}</div>
                  <span>${SteptName}</span>
                  ${!isLastStep ? `<div class="separator"></div>` : ""}
              </section > 
             `}).join("");

  };


  const templateConfirmLead = () => {
    const templateConfirm = `<div class="confirm-lead-create">
    <div class="row-title">
        <div class="title-confirm">${getConfigMessage.strings.Lead.ThanksInformation}</div>
        <i class="icon-check"></i>
    </div>
    <div class="row-body-content">
        <div class="confirm-paragraph">${getConfigMessage.strings.Lead.TextConfirmUp}<br />${getConfigMessage.strings.Lead.TextConfirmDown}</div>
    </div>
   </div>`;

    return confi.createVirtualDOM(templateConfirm);

  };

  //const templateValidationEmail = (isContact=false) => {
  //  const { createMessageStatic, MESSAGE_TYPE } = templatesGeneral;
  //  const templateMessage = createMessageStatic({
  //    message: getConfigMessage.strings.Lead.AnotherBillingEmail,
  //    classStyle: MESSAGE_TYPE.info,
  //  });

  //  const objInput = { isRequired: false, fieldType: 'email', name: 'oherEmail', label: 'Correo para facturación electronica', classStyle: 'input-medium', }
  //  const inputOtherEmail = templateFields.createInputText(objInput);
  //  const template = `<div class="content-validation-email form-group">
  //                       <div class="input-user ">
  //                         <div class="field form-group">
  //                           <input type="email"
  //                           name="lblbemail"
  //                           id="emailLead"
  //                           data-validate-rule="email"
  //                           class="input-big "
  //                           placeholder="${getConfigMessage.strings.Lead.Email}"
  //                           required
  //                           data-required>
  //                           <label title="${getConfigMessage.strings.Lead.Email}" for="lbemail" data-title="${getConfigMessage.strings.Lead.Email}"></label>
  //                        </div>                    
  //                      </div>
  //                      <div class="content-other-email ">
  //                        ${!isContact ? `<label  class="container-label check">${getConfigMessage.strings.Lead.TextElectronicBilling}
  //                                              <input type="checkbox" id="chkOtherEmail" onClick="validationEmail.handleClickCheckOtherEmail(this)" checked >
  //                                              <span class="checkmark"></span>
  //                         </label>`:'' }

  //                         <div class="content-button-validate">
  //                           <div class="electronic-billing d-none">
  //                             ${inputOtherEmail}
  //                           </div>
  //                            <div class="button-check-email">
  //                               <button
  //                               type="button"
  //                               id="btnCheckEmail"
  //                               onClick="validationEmail.handleClickCheckEmail(this)"
  //                               class="btn btn-big btn-white"
  //                               >
  //                               ${getConfigMessage.strings.Lead.ValidateEmail}
  //                               </button>
  //                             </div>
  //                          </div>
  //                       <div class="inputs-other-email d-none">
  //                         ${templateMessage}
  //                       </div>
  //                     </div>
  //              </div>`;

  //  return confi.createVirtualDOM(template);

  //};

  const templateValidationEmail = (isContact = false, electronicBilling=false) => {
    const objInput = {
      isRequired: true,
      fieldID:'emailaddress1',
      fieldType: 'email',
      name: isContact ? 'emailaddress1' : 'ph_invoiceemail',
      label: isContact ? getConfigMessage.strings.Lead.Emailaddress1 : getConfigMessage.strings.Lead.EmailElectronicBilling,
      classStyle: 'input-medium-06',
      rules: {
        "maxlength": 100
      }
    }
    const inputOtherEmail = electronicBilling ? '' : templateFields.createInputText(objInput);
    const template = `<div class="content-validation-email form-group">
                        <div class="content-other-email ">                
                           <div class="content-button-validate">
                             <div class="electronic-billing">
                               ${inputOtherEmail}
                             </div>
                              <div class="button-check-email">
                                 <button
                                 type="button"
                                 id="btnCheckEmail"
                                 onClick="validationEmail.handleClickCheckEmail(this)"
                                 class="btn btn-medium btn-white"
                                 >
                                 ${getConfigMessage.strings.Lead.ValidateEmail}
                                 </button>
                               </div>
                            </div>
          
                       </div>
                </div>`;

    return confi.createVirtualDOM(template);

  };

  const templateButttonEmailAlterno = () => {
    const template = `<div class="button-check-email">
      <button
        type="button"
        id="btnCheckEmail"
        onClick="validationEmail.handleClickCheckEmail(this,true)"
        class="btn btn-medium btn-white"
      >
        ${getConfigMessage.strings.Lead.ValidateEmail}
      </button>
    </div>`;

    return confi.createVirtualDOM(template);
  }

  const templateNotificationStaticEmail = (text) => {
    const { createMessageStatic, MESSAGE_TYPE } = templatesGeneral;
    const templateMessage = createMessageStatic({
      message: text,
      classStyle: MESSAGE_TYPE.info,
    });

    const template = `<div class="inputs-other-email">
      ${templateMessage}
    </div>`;

    return confi.createVirtualDOM(template);
  };



  const templateNotificationStaticEmailContact = (text) => {
    const { createMessageStatic, MESSAGE_TYPE } = templatesGeneral;
    const templateMessage = createMessageStatic({
      message: text,
      classStyle: MESSAGE_TYPE.info,
    });

    const template = `<div class="notification-static-contact">
      ${templateMessage}
    </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateCheckValidationEmail = () => {
    const template = `<label  class="container-label check">${getConfigMessage.strings.Lead.TextElectronicBilling}
                                                <input type="checkbox" id="chkOtherEmail" onClick="validationEmail.handleClickCheckOtherEmail(this)" checked >
                                                <span class="checkmark"></span>
                      </label>`;

    return confi.createVirtualDOM(template);
  };

  const templateInputUserEmail = () => {
    const template = ` <div class="input-user ">
                           <div class="field form-group">
                             <input type="email"
                             name="emailaddress1"
                             id="emailLead"
                             data-validate-rule="email"
                             class="input-big "
                             placeholder="${getConfigMessage.strings.Lead.Email}"
                             required
                             data-required
                             maxlength="100">
                             <label title="${getConfigMessage.strings.Lead.Email}" for="lbemail" data-title="${getConfigMessage.strings.Lead.Email}"></label>
                          </div>                    
                        </div>`;

    return confi.createVirtualDOM(template);
  };


  const templateIconDelete = (message) => {
    return `<i class="icon-ws-ico-min-delete"></i> 
            <span>${message}<span/>`
  };


  const templateHelpSteps = () => {
    return `<div class="content-helper-steps">
               <div class="helper-steps-title">
                  <p>${getConfigMessage.strings.Lead.NextSteps}</p>
                  <hr />
               </div>
               <div class="helper-steps-body">
                  <p>${getConfigMessage.strings.Lead.GetEmail}</p>
                   <hr />
                   <div class="title-help">${getConfigMessage.strings.Lead.NeedHelp}</div>
                   <div class="text-help">${getConfigMessage.strings.Lead.AnyQuestion}</div>
                   <div class="row-icon">
                       <i class="icon-ws-ico-min-phone"></i><p>(55)5278.9901</p>
                   </div>
               </div>
               <div class="helper-steps-footer">
                    <button type="button"
                            id="btn-goStore"
                            class="btn btn-extra-big btn-orange">
                            ${getConfigMessage.strings.Lead.GoStore}
                    </button>
               </div>
            </div>`;
  };

  const templateSummary = () => {

    const template = `<div class="content-summary">
                          <div class="content-data">
                             <div class="content-info">
                             </div> 
                             <div class="content-print">      
                               <a href="javascript:window.print()">
                                <i class="icon-ws-ico-min-print" onclick="javascript:window.print()"></i>${getConfigMessage.strings.Lead.ToPrint}</a>
                             </div>    
                          </div>                        
                           ${templateHelpSteps()}                       
                      </div>`;

    return confi.createVirtualDOM(template);

  };

  const templateGoogle_reCaptcha = () => {
    const template = `<div class="content-google-recaptcha" id="html_element"></div>`;

    return confi.createVirtualDOM(template);
  };
  ///// Template original 
  //const templateEmailAlreadyRegistered = () => {
  //  const template = `<div class="content-email-already-register"> 
  //           <span>${getConfigMessage.strings.Lead.EmailAlreadyRegistered}</span>
  //           <p>${getConfigMessage.strings.Lead.TextEmailAlreadyRegistered}</p>
  //           <div class="content-link">
  //           <a href="#" id="lnkLogin" class="lnk-main">${getConfigMessage.strings.Lead.LogIn}</a> <div class="separator-link"></div>
  //           <a href="#" id="lnkResetPass" class="lnk-main">${getConfigMessage.strings.Lead.ForgetPass}</a>
  //           </div>
  //          </div>`;

  //  return confi.createVirtualDOM(template);
  //};
  ///// Template original 
  //const templateEmailRegistrationProcess = () => {
  //  const template = `<div class="content-email-already-register"> 
  //           <span>${getConfigMessage.strings.Lead.RegistrationProcess}</span>
  //           <p>${getConfigMessage.strings.Lead.TextRegistrationProcess}</p>
  //           <div class="content-link">
  //           <a href="#" id="lnkSolicitud" class="lnk-main">${getConfigMessage.strings.Lead.ViewStatus}</a>
  //           </div>
  //          </div>`;

  //  return confi.createVirtualDOM(template);
  //}

  /// Template nuevo
  const templateEmailAlreadyRegistered = (title,message) => {
    const template = `<div class="content-email-already-register"> 
             <span>${title}</span>
             <p>${message}</p>             
            </div>`;

    return confi.createVirtualDOM(template);
  };
  /// Template nuevo
  const templateEmailRegistrationProcess = () => {
    const template = `<div class="content-email-already-register"> 
             <span>${getConfigMessage.strings.Lead.RegistrationProcess}</span>
             <p>${getConfigMessage.strings.Lead.TextRegistrationProcess}</p>
            </div>`;

    return confi.createVirtualDOM(template);
  }

  const templateHeaderSource= (source) => {
    const template = `<div class="content-header ${source==="WS" ? "header-ws" : "header-mg"}">                    
                        <a>
                         ${ source === "WS" ? `<img src="/Content/img/LogoWebStore.png" class="img-fluid" />`
                         : `<img src="/Content/img/intcomex/logo-int-w.svg" class="img-fluid" />`}
                        </a>   
                       <div class="content-help">
                         <i class="icon-ws-ico-min-info"></i>
                         <span>${getConfigMessage.strings.Lead.Help}</span>
                       </div>
                       </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateFooterSource = (source) => {

    const { Img, Name } = source === "WS" ? {}: companyLead.getCountryData();

    const template = `<div class="content-footer ${source === "WS" ? "footer-ws" : "footer-mg"}">                    
                         <p>© 2021 Intcomex Corp. | Intcomex is a registered Corp All Rights Reserved.</p>
                          ${ source === "WS" ? '' : `<div class="content-country"> ${Img} <p>${Name}</p></div>`}
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const createContactListGeneral = () => {
    const template = `<div class="content-contact">
                        <div class="notification-contact js-content">
                           <div class="content-contact-header commercial-contact-list">
                             <div class="content-text">
                              <p>${getConfigMessage.strings.Lead.NoContacts}</p>
                              <p>${getConfigMessage.strings.Lead.NoAddContact}</p>
                            </div>
                         </div>                    
                         <div class="content-link">
                            <button
                                class="btn btn-white-short btn-medium-short"
                                onClick="contactLead.handleClickOtherContact();return false;"
                                type="button"
                                >
                                ${getConfigMessage.strings.Lead.AddContactComercial}
                            </button>
                          </div>
                        </div> 
                      </div>`

    return confi.createVirtualDOM(template);
  };

  

  const createSelectContact = ({ id = 1, fullName, ocupation, type }) => {
    const template = `<div class="form-group">
                       <div class="content-contact contact-bill${id}" data-id=${id}>
                        <div class="notification-contact contact-select js-content">
                           <div class="input-select">
                           <input type="radio" id="selectContact"  onChange="contactLead.handleChangeSelectContact(this)" name="selectContact">
                           </div>
                           <div class="content-contact-header ${type}">
                             <div class="content-text">
                              <p>${fullName}</p>
                              <p>${ocupation}</p>
                            </div>
                         </div>                                            
                        </div> 
                      </div>
                      </div>`

    return confi.createVirtualDOM(template);
  };

  const createSelectContactNew = () => {
    const template = `<div class="content-contact contact-new">
                        <div class="notification-contact js-content">
                           <div class="content-contact-header add-contact">
                              <a href="#" id="lnkDelete" class="lnk-main"
                               onClick="contactLead.handleClickOtherContact();return false;">${getConfigMessage.strings.Lead.AddOtherContact}</a>
                          </div>                    
                        </div> 
                      </div>`

    return confi.createVirtualDOM(template);
  };

  const checkAcceptterms = (url) => {
    const template = `<div class="form-group">
                       <div class="content-multiselection content-accept" data-required required>
                         <label class="container-label check form-group">
                           ${getConfigMessage.strings.Lead.phAccepttermsOne}<a target="_blank" href="${url}">${getConfigMessage.strings.Lead.termsConditions}</a>${getConfigMessage.strings.Lead.phAccepttermsTwo}
                         <input type="checkbox" name="ph_acceptterms1" value="null" onClick="leadForm.handleFieldsCheck('',this);"/>
                           <span class="checkmark"></span>
                         </label>
                       </div>
                     </div>`

    return confi.createVirtualDOM(template);
  };


  return {
    templateVerifyCode,
    templateErrorVerifyCode,
    templateSuccessVerifyCode,
    templateMessageInfo,
    templateMessageInfoValidate,
    createTemplateSteps,
    templateConfirmLead,
    templateIconDelete,
    templateValidationEmail,
    templateGoogle_reCaptcha,
    templateHelpSteps,
    templateSummary,
    templateEmailAlreadyRegistered,
    templateEmailRegistrationProcess,
    templateNotificationStaticEmail,
    templateCheckValidationEmail,
    templateInputUserEmail,
    templateNotificationStaticEmailContact,    
    templateHeaderSource,
    templateFooterSource,
    createContactListGeneral,
    templateFooterSource,
    createSelectContactNew,
    createSelectContact,
    templateButttonEmailAlterno,
    checkAcceptterms,
    templateMessageDocumentValidate
  };
})();


//funcion de retorne un div .. 
// las clases en sass las creo en organismo-- div principal -- cen