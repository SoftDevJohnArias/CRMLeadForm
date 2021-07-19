const validationLeadExistence = (() => {

  const notification = {
    type: null,
    title: '',
    messages: []
  };

  const init = () => {
    const $contentNotification = document.querySelector('.email');
    $contentNotification.innerHTML = '';
    notification.messages = [];
  };

  //Validar en el servicio

  const validateParent = async (companyId, element) => {
    let $documentCompany = "";
    let $emailCompany = "";
    let $field = "D";

    if (companyId === 'XGT') {
      if (element.name === 'ph_documentdigitid') {
        const $doc = document.getElementsByName('ph_companyidentification');
        const $docTemp = $doc[0].value;

        $documentCompany = $docTemp + element.value;
      }
    }

    if (companyId === 'XCB') {
      const $placeHolder = element.placeholder;

      if ($placeHolder === 'RUT' || $placeHolder === "") {

        if (element.name === 'ph_documentdigitid') {
          const $doc = document.getElementsByName('ph_companyidentification');
          const $docTemp = $doc[0].value;

          $documentCompany = $docTemp + element.value;
        }

      } else {

        if (element.name === 'ph_companyidentification') {
          const $data = element.value;

          const $dataTemp = $data.replace(/ /g, '');
          const $dataPoint = $dataTemp.replaceAll(".", "");
          const $dataMid = $dataPoint.replaceAll("-", "");
          $documentCompany = $dataMid;
        }
      }
    }

    if (companyId !== 'XGT' && companyId !== 'XCB') {
      if (element.name === 'ph_companyidentification') {
        const $data = element.value;

        const $dataTemp = $data.replace(/ /g, '');
        const $dataPoint = $dataTemp.replaceAll(".", "");
        const $dataMid = $dataPoint.replaceAll("-", "");
        $documentCompany = $dataMid;
      }
    }

    if (element.name === 'emailaddress2') {
      $emailCompany = element.value;
      $field = "E"
    }

    if ($documentCompany || $emailCompany) {
      const $result = await serviceRegisterLead.leadExistence({
        emailaddress1: "",
        ph_companyidentification: $documentCompany,
        ph_identification: "",
        emailaddress2: $emailCompany,
      });

      const response = {
        end: $result.Success,
        name: $result.Message,
        type: $field,
      }

      return response;
    }
  };

  const validateChild = async (element) => {
    let $documentContact = "";
    let $emailContact = "";
    let $field = "D";

    if (element.name === 'ph_identification') {
      $documentContact = element.value;
    }

    if (element.name === 'emailaddress1') {
      $emailContact = element.value;
      $field = 'E';
    }

    if ($documentContact || $emailContact) {
      const $result = await serviceRegisterLead.leadExistence({
        emailaddress1: $emailContact,
        ph_companyidentification: "",
        ph_identification: $documentContact,
        emailaddress2: "",
      });

      const response = {
        end: $result.Success,
        name: $result.Message,
        type: $field
      }

      return response;
    }
  };

  const getUrlStore = (company) => {

    const $localeString = window.location.pathname;
    const $languageString = $localeString.split('/');

    let $language = $languageString[1];

    if ($language === 'LeadRegister') {
      $language = 'es';
    }

    let $keyUrlLogin = leadModule.urlStoreLogin;
    let $keyUrlPassword = leadModule.urlStoreForgotPassword;

    if (company === 'XCB') {
      $keyUrlLogin = leadModule.urlStoreLoginXCB;
      $keyUrlPassword = leadModule.urlStorePasswordXCB;
    }

    const $tempUrlLogin = $keyUrlLogin.replace('{language}', $language);
    const $urlLoginTemp = $tempUrlLogin.replace('{company}', company);

    const $tempUrlPassword = $keyUrlPassword.replace('{language}', $language);
    const $urlPasswordTemp = $tempUrlPassword.replace('{company}', company);

    let $url = [];

    $url.push($urlLoginTemp);
    $url.push($urlPasswordTemp);

    return $url;
  };

  //const isBlockButton = (isBlock, type) => {
  //  const isEditContact = contactLead.getisClickEditContact();

  //  if (isEditContact) {
  //    const $buttonUpdate = document.querySelector('.btn-big')
  //    if (isBlock) {
  //      if ($buttonUpdate)
  //        $buttonUpdate.classList.add("element-disable");
  //    } else {
  //      if ($buttonUpdate)
  //        $buttonUpdate.classList.remove("element-disable");
  //    }
  //  } else {
  //    if (type === 'bill') {
  //      const $button = document.querySelector('.button-check-email');

  //      if (isBlock) {
  //        if ($button)
  //          $button.classList.add("element-disable");
  //      } else {
  //        if ($button)
  //          $button.classList.remove("element-disable");
  //      }
  //    } else {
  //      const $buttonAdd = document.querySelector('#addContact');

  //      if (isBlock) {
  //        if ($buttonAdd)
  //          $buttonAdd.classList.add("element-disable");
  //      } else {
  //        if ($buttonAdd)
  //          $buttonAdd.classList.remove("element-disable");
  //      }
  //    }
  //  }

  //};

  const blockButtonContact = (isBlock) => {
    
    const $contacts = contactLead.getContacts();

    const $buttonAdd = document.querySelector('.contact-add');
    const $buttonCheck = document.querySelector('.button-check-email');

    if ($contacts.length === 0) {
      if (isBlock) {
        if ($buttonAdd)
          $buttonAdd.classList.add("element-disable");

        if ($buttonCheck)
          $buttonCheck.classList.add("element-disable");
      } else {
        if ($buttonAdd)
          $buttonAdd.classList.remove("element-disable");

        if ($buttonCheck)
          $buttonCheck.classList.remove("element-disable");
      }
    } else {
      if (isBlock) {
        if ($buttonAdd)
          $buttonAdd.classList.add("element-disable");
      } else {
        if ($buttonAdd)
          $buttonAdd.classList.remove("element-disable");
      }

      const $buttonUpdate = document.querySelector('.btn-big')
      if (isBlock) {
        if ($buttonUpdate)
          $buttonUpdate.classList.add("element-disable");
      } else {
        if ($buttonUpdate)
          $buttonUpdate.classList.remove("element-disable");
      }
    }
  };

  const getMessagesToEmail = (response, isForm) => {
    
    let $temp = '';

    if (response != '') {
      $temp = response.name.split("-");
    }

    let $title = '';
    const $type = $temp[1];
    let $content = $temp[0];

    if (isForm) {
      $title = getConfigMessage.strings.Lead.TitleEmailExistenceLead;
      $content = getConfigMessage.strings.Lead.EmailExistenceLead;
    } else {
      if ($type === 'Account')
        $title = getConfigMessage.strings.Lead.TitleEmailExistenceContactAccount;

      if ($type === 'Lead')
        $title = getConfigMessage.strings.Lead.TitleEmailExistenceLead;
    }



    const responseMessage = {
      titleMessage: $title,
      contentMessage: $content
    }

    return responseMessage;
  };

  const validateFieldByCompany = () => {

    const $document = document.querySelector('input[name=ph_companyidentification]');
    const $digit = document.querySelector('input[name=ph_documentdigitid]');

    if ($document && $digit) {
      const $valueDocument = $document.value;
      const $valueDigit = $digit.value;

      if ($valueDigit != "" && $valueDocument === "")
        return false;
      else
        return true;
    } else {
      return true;
    }
  };

  const renderMessageDocument = (message, isShow, company) => {

    const $notification = document.querySelector('.notifications');

    const $responseUrl = getUrlStore(company);

    if (isShow) {
      $notification.classList.add("d-none");
      notificationLead.init();
      $notification.classList.remove("d-none");

      notificationLead.getNotificationWarning([message], true, $responseUrl);

    } else {
      $notification.classList.add("d-none");
      notificationLead.init();
      $notification.classList.remove("d-none");
      return;
    }
  };

  const renderMessageEmail = (msg, isShow, step) => {

    const $templateHtml = document.querySelector(".content-email-already-register");
    $templateHtml?.remove();

    if (isShow) {

      if (step === 0) {
        const $template1 = templateLead.templateEmailAlreadyRegistered(msg.titleMessage, msg.contentMessage);
        const $reference1 = document.querySelector(".email");
        const $content = $reference1.closest(".field");
        $content.insertAdjacentElement("afterend", $template1);
        return;
      } else {
        const $template = templateLead.templateEmailAlreadyRegistered(msg.titleMessage, msg.contentMessage);
        const $referenceBill = document.querySelector(".content-button-validate");
        const $referenceBill2 = document.querySelector(".inputs-other-email");
        const $referenceEmail = document.querySelector(".email");
        const $contentEmail = $referenceEmail.closest(".field");

        if ($referenceBill) {
          $referenceBill2.insertAdjacentElement("afterbegin", $template);
          return
        }          

        if ($referenceEmail)
          $contentEmail.insertAdjacentElement("afterend", $template);
        return;
      }
    } else {
      const $templateHtml = document.querySelector(".content-email-already-register");
      $templateHtml?.remove();
      return;
    }

  };

  //Validar dentro del mismo formulario

  const validationByContact = async ({ currenIndexStep, companyId, completeStepts }, element) => {

    const $name = element.name;
    let $response = false;
    let $field = '';

    if ($name === 'ph_identification') {
      $response = validateDocument(completeStepts, element);
      $field = 'D';
    }

    if ($name === 'emailaddress1') {
      $response = validateEmail(completeStepts, element);
      $field = 'E';
    }

    const $responseForm = {
      statusForm: $response,
      typeForm: $field
    }

    return $responseForm;
  };

  const validateDocument = (completeStepts, element) => {

    const $tempNum = completeStepts[0].dataCompany.ph_companyidentification;

    const $num = $tempNum.replaceAll(".", "");
    const $temp = $num.replaceAll("-", "");
    const $finalNum = $temp.replaceAll(" ", "");

    const $documentParent = $finalNum;
    const $documentChild = element.value;

    let $contacts = [];
    $contacts = contactLead.getContacts();

    if ($contacts.length === 0) {
      if ($documentChild === $documentParent)
        return true;
      else
        return false;
    } else {
      let $response = false;
      for (const $contact of $contacts) {
        const $document = $contact.infoContact.ph_identification;

        if ($document === $documentChild || $documentChild === $documentParent)
          return true;
        else
          $response = false;
      };

      return $response;
    }
  };

  const validateEmail = (completeStepts, element) => {

    const $emailParent = completeStepts[0].dataCompany.emailaddress2;
    const $emailChild = element.value;

    if ($emailChild != '') {
      let $contacts = [];
      $contacts = contactLead.getContacts();

      if ($contacts.length === 0) {
        if ($emailChild === $emailParent)
          return true;
        else
          return false;
      } else {
        let $response = false;

        for (const $contact of $contacts) {
          let $emails = [];
          $emails.push($contact.infoContact.emailaddress1);
          $emails.push($contact.infoContact.emailaddress3);

          for (const $email of $emails) {
            if ($emailChild === $email || $emailChild === $emailParent) {
              return true;
            } else {
              $response = false;
            }
          };
          return $response;
        };
      }
    } else {
      return false;
    }   
  };

  const paintMessages = (isShow, $type) => {
    if (isShow) {
      let $messages = '';

      if ($type === 'D') {
        const $notification = document.querySelector('.notification-form');

        $notification.classList.add("d-none");
        notificationLead.innerHTML = '';
        $notification.classList.remove("d-none");

        $messages = getConfigMessage.strings.Lead.DocumentExistenceLead;
        const $template = templateInfoFormDocument($messages);
        $notification.insertAdjacentElement('afterbegin', $template);

      }

      //if ($type === 'E') {
      //  const $templateHtml = document.querySelector(".content-email-already-register");
      //  $templateHtml?.remove();

      //  if ($type === 'lead')
      //    $messages = [getConfigMessage.strings.Lead.TextEmailAlreadyRegisteredTwo];
      //  if ($type === 'form')
      //    $messages = [getConfigMessage.strings.Lead.ErrorEmail];

      //  const $template = templateLead.templateEmailAlreadyRegistered($messages);
      //  const $reference = document.querySelector(".email");
      //  const $content = $reference.closest(".field");
      //  $content.insertAdjacentElement("afterend", $template);
      //  return;
      //}

    } else {

      if ($type === 'D') {
        const $notification = document.querySelector('.notification-form');

        $notification.classList.add("d-none");
        $notification.innerHTML = '';
        $notification.classList.remove("d-none");
      }

      //if ($type === 'E') {
      //  const $templateHtml = document.querySelector(".content-email-already-register");
      //  $templateHtml?.remove();
      //  return;
      //}
    }

  };

  const templateInfoDocument = (msg) => {

    const template = `<div class="content-notification warning"> 
            <div class="content-title content-title-warning"><span class="title-main-info">${getConfigMessage.strings.Lead.Important}</span></div>
               <p>${msg}</p>
             <div class="content-link">
               <a href="#" id="lnkLogin" class="lnk-main">${getConfigMessage.strings.Lead.LogIn}</a> <div class="separator-link"></div>
               <a href="#" id="lnkResetPass" class="lnk-main">${getConfigMessage.strings.Lead.ForgetPass}</a>
              </div>
           </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateInfoEmail = (title, message) => {
    const template = `<div class="content-email-already-register"> 
             <span>${title}</span>
             <p>${message}</p>             
            </div>`;

    return confi.createVirtualDOM(template);
  };

  const templateInfoFormDocument = (messages) => {
    const template = `<div class="content-notification warning-info"> 
            <div class="content-title content-title-warning"><span class="title-main-info">Importante</span></div>
               <p>${messages}</p>          
           </div>`;

    return confi.createVirtualDOM(template);
  };

  const initNotificationsForm = () => {
    const $notification = document.querySelector('.notification-form');
    if ($notification) {
      $notification.classList.add("d-none");
      $notification.innerHTML = '';
      $notification.classList.remove("d-none");
    }

    const $notificationEmail = document.querySelector('.content-email-already-register');
    if ($notificationEmail) {
      $notificationEmail.classList.add("d-none");
      $notificationEmail.innerHTML = '';
      $notificationEmail.classList.remove("d-none");
    }

    notificationLead.init();
  };

  return {
    init,
    validationByContact,
    paintMessages,
    validateParent,
    validateChild,
    templateInfoDocument,
    templateInfoEmail,
    renderMessageDocument,
    renderMessageEmail,
    //isBlockButton,
    validateFieldByCompany,
    templateInfoFormDocument,
    initNotificationsForm,
    getMessagesToEmail,
    blockButtonContact
  };
})();