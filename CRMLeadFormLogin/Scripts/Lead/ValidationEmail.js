

const validationEmail = (() => {

  let payloadEmailCode = {};

  let CreateEmailCodeRequest = {};

  let validateSuccess = false;
  let validateOTPSuccess = false;

  let emailValue = '';

  const initValidation = () => {
    renderSectionValidationEmail();
  };

  //const renderSectionValidationEmail = () => {
  //  ;
  //  const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();

  //  const companyId = companyLead.getCompanyId();
  //  const $nodeSegment = companyId === 'XCR' ? document.querySelector("select[name=ph_serviceprovider]") : document.querySelector("input[name=MarketsSegment1]");
  //  const $contentElement1 = companyId === 'XCR' ? $nodeSegment.closest(".form-group") : $nodeSegment.closest(".multi-selection-form");
  //  const $parent = $contentElement1.parentElement;

  //  insertamos check
  //  if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
  //  $parent.insertBefore(templateLead.templateValidationEmail(), $contentElement1);

  //  const $contentNotification = document.querySelector(".content-other-email ");
  //  insertamos inputUser
  //  const $parentInput = $contentNotification.parentElement;
  //  $parentInput.insertBefore(templateLead.templateInputUserEmail(), $contentNotification);


  //    const $contentCheck = document.querySelector(".content-button-validate");
  //    const $parentNotification = $contentCheck.parentElement;
  //    $parentNotification.insertBefore(templateLead.templateCheckValidationEmail(), $contentCheck);

  //    insertamos notificacion
  //    $contentNotification.appendChild(templateLead.templateNotificationStaticEmail(getConfigMessage.strings.Lead.AnotherBillingEmail));
  //  }
  //};


  const renderSectionValidationEmail = () => {
    ;
    const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();

    const companyId = companyLead.getCompanyId();
    const $nodeSegment = document.querySelector("input[name=emailaddress3]");
    const $contentElement1 = $nodeSegment.closest(".form-group");
    const $parent = $contentElement1.parentElement;

    //insertamos check
    if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
      $parent.insertBefore(templateLead.templateValidationEmail(true), $contentElement1);

      const $contentNotification = document.querySelector(".content-other-email ");
      //insertamos inputUser
      //const $parentInput = $contentNotification.parentElement;
      //$parentInput.insertBefore(templateLead.templateInputUserEmail(), $contentNotification);


      const $contentCheck = document.querySelector(".content-button-validate");
      const $parentNotification = $contentCheck.parentElement;
      //$parentNotification.insertBefore(templateLead.templateCheckValidationEmail(), $contentCheck);

      //insertamos notificacion
      $contentNotification.appendChild(templateLead.templateNotificationStaticEmail(getConfigMessage.strings.Lead.AnotherBillingEmail));
    }
  };

  const clearVerifyCode = () => {
    const $messageValidation = document.querySelector(".message-validation");
    const $inputCode = document.getElementById("inputCode")

    $messageValidation.classList.remove("m-success");
    $messageValidation.innerHTML = "";

    $inputCode.value = "";
    $inputCode.focus();
  };

  const sendCodeToEmail = async (e, emailAlternate = false) => {

    const $checkOtherEmail = document.getElementById("chkOtherEmail")?.checked || false;
    validateSuccess = false;

    //validamos cual input de email tomar
    const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();
    let $emailLead = null;

    if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {


      if (emailAlternate) {
        const $emailElement = e.closest(".list-email") || e.closest(".row-email");
        $emailLead = $emailElement.querySelector("p");
      }
      else
        $emailLead = e.closest(".content-button-validate").querySelector("input[name=emailaddress1]") || e.closest(".content-button-validate").querySelector("input[name=ph_invoiceemail]");

    }
    else
      $emailLead = $checkOtherEmail ? document.getElementById("emailLead") : document.querySelector('input[name=ph_invoiceemail]');

    //const $emailLead = document.getElementById("emailLead");
    const email = $emailLead.value || $emailLead.innerHTML;


    if (!confi.validateEmail(email)) {
      $emailLead.classList.add("is-error");
      $emailLead.focus();
      return;
    }




    //validamos si existe el email
    const $templateHtml = document.querySelector(".content-email-already-register");
    $templateHtml?.remove();
    if (await validateEmailAlreadyRegistered(email)) {
      const $template = templateLead.templateEmailAlreadyRegistered();
      const $reference = document.querySelector(".content-validation-email");
      $reference.insertAdjacentElement("afterend", $template);
      return;
    }

    const localeString = window.location.pathname;
    const languageString = localeString.split('/');
    let $language = languageString[1];

    if ($language === 'LeadRegister') {
      $language = 'es';
    }


    CreateEmailCodeRequest = {
      email: email,
      sendEmail: false, //enviar o no emails
      LanguageEmail: $language,
    };

    confi.initLoader();
    const { HiddenGeneratedCode, Success } = await serviceEmailCode.createEmailCode(CreateEmailCodeRequest);

    confi.stopLoader();

    if (!Success) {
      console.error("error create email code");
      return;
    };

    //storage hiddencode in module
    payloadEmailCode = {
      HiddenGeneratedCode,
      Email: email,
    };


    if (emailAlternate) {

      const $contentEclectronicBill = document.querySelector(".content-electronic-bill");
      const $verifyCode = $contentEclectronicBill.querySelector(".content-verification-code");

      if (!$verifyCode) {
        const $contentVerify = e.closest(".content-email-contact") || e.closest(".multi-selection-form");
        $contentVerify.appendChild(templateLead.templateVerifyCode());
        $contentVerify.querySelector("#btnVerifyCode").addEventListener("click", handleClickVerifyCode);
        $contentVerify.querySelector("#lnkResend").addEventListener("click", handleClickCheckEmail);
        //leadForm.initValidationForm();
      }
    }
    else {
      const $contentElement = document.querySelector(".content-validation-email");

      const $contentVerifyCode = $contentElement.querySelector(".content-verification-code");
      //const $referenceNode = $contentElement.querySelector(".content-other-email");

      const $node = $contentElement.querySelector(".content-button-validate");
      if (!$contentVerifyCode) {
        //$contentElement.appendChild(templateLead.templateVerifyCode());
        //$contentElement.insertBefore(templateLead.templateVerifyCode(), $referenceNode);
        $node.after(templateLead.templateVerifyCode());
        $contentElement.querySelector("#btnVerifyCode").addEventListener("click", handleClickVerifyCode);
        $contentElement.querySelector("#lnkResend").addEventListener("click", handleClickCheckEmail);
        leadForm.initValidationForm();
      }
      else {
        if ($contentVerifyCode.classList.contains("d-none"))
          $contentVerifyCode.classList.remove("d-none");

        clearVerifyCode();
      }
    }
  }
  ///EVENTS


  const handleClickCheckEmail = async (e, emailAlternate = false) => {
    try {


      await sendCodeToEmail(e, emailAlternate);

    } catch (error) {
      console.error(error.toString())
      confi.stopLoader();
    }
  };

  const validateEmailAlreadyRegistered = async (email) => {

    const result = await serviceEmailCode.validateExistingEmail(email);
    return result;
  };

  const handleClickCheckOtherEmail = async (e) => {
    try {

      const elm = document.querySelector(".inputs-other-email");
      const elmEmail = document.querySelector('input[name=ph_invoiceemail]');
      const $inputCode = document.getElementById("inputCode");
      const $verfyCode = document.querySelector(".content-verification-code");
      const $buttonVerify = document.querySelector(".button-check-email");
      const $electronicBilling = document.querySelector(".electronic-billing");

      if ($verfyCode)
        $verfyCode.classList.toggle("d-none");

      if (!e.checked) {
        //if (elm.classList.contains("d-none")) {
        $buttonVerify.style.position = "absolute";
        $buttonVerify.style.animation = "validatemail 0.2s";
        $buttonVerify.style.animationFillMode = "forwards";

        //if (elm.classList.contains("d-none")) 
        //elm.classList.remove("d-none");
        //electronicBilling.classList.remove("d-none");
        elmEmail.setAttribute("required", "");
        elmEmail.setAttribute("data-required", "");
        $electronicBilling.classList.remove("d-none");

        $inputCode.setAttribute("required", "");
        $inputCode.setAttribute("data-required", "");

        //}
      }
      else {
        $buttonVerify.style.animation = "";
        $buttonVerify.style.animationFillMode = "";
        $buttonVerify.style.position = "";
        //elm.classList.add("d-none");
        elmEmail.removeAttribute("required");
        elmEmail.removeAttribute("data-required");
        elmEmail.value = "";
        elmEmail.classList.remove("is-error", "is-valid");
        $electronicBilling.classList.add("d-none");

        $inputCode.removeAttribute("required");
        $inputCode.removeAttribute("data-required");
        $inputCode.value = "";
        $inputCode.classList.remove("is-error", "is-valid");
      }

      leadForm.initValidationForm();
    } catch (error) {
    }
  };

  const handleClickVerifyCode = async (e) => {

    try {

      const $inputCode = document.getElementById("inputCode");
      const $contentBillElectronic = document.querySelector(".content-electronic-bill");
      validateSuccess = false;

      if (!$inputCode.checkValidity()) {
        $inputCode.classList.add("is-error");
        $inputCode.focus();
        return;
      }

      $inputCode.classList.add("is-valid");
      confi.initLoader();
      const { Message, Success } = await serviceEmailCode.verifyEmailCode({
        ...payloadEmailCode,
        InputLeadCode: $inputCode.value,
        CurrentDate: new Date().toJSON(),
      });
      confi.stopLoader();

      const $messageValidation = document.querySelector(".message-validation");
      const { templateSuccessVerifyCode, templateErrorVerifyCode } = templateLead;

      if (Success) {
        $messageValidation.classList.add("m-success");
        $messageValidation.innerHTML = templateSuccessVerifyCode();
        validateSuccess = true;
        emailValue = payloadEmailCode.Email;

        const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();
        if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
          //validationRules.validateSectionNextEmail();
        }


        if ($contentBillElectronic) {
          const $input = $contentBillElectronic.querySelector("#inputCode");
          if ($input) {
            if ($input.value === $inputCode.value)
            contactLead.sectionNextDisable(false);
          }

        }
      }
      else {
        $messageValidation.innerHTML = templateErrorVerifyCode();
      }
      console.info(Message);

    } catch (e) {
      console.error(error.toString())
      confi.stopLoader();
    }

  };

  const handleClickButtonEmailAlterno = () => {

  };


  const validateSuccessEmail = () => validateSuccess;

  const validateOTPElectronigBilling = () => validateOTPSuccess;

  const SetValidateSuccessEmail = (value) => {
    validateSuccess = value;
  };

  const SetValidateOTPElectronigBilling = (value) => {
    validateOTPSuccess = value;
  };

  const getEmailValid = () => emailValue;

  return {
    initValidation,
    handleClickCheckEmail,
    handleClickCheckOtherEmail,
    validateSuccessEmail,
    getEmailValid,
    SetValidateSuccessEmail,
    validateOTPElectronigBilling,
    SetValidateOTPElectronigBilling
  };


})(); 