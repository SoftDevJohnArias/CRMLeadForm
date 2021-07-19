const leadFormXUS = (() => {

  const init = async () => {
    const sourceId = "MG";
    renderHeader(sourceId);
    renderFooter(sourceId);
    //reCaptcha.initCaptcha();
    initValidationFormXUS();
  };

  const renderHeader = async (source) => {
    const header = document.querySelector("#header");
    header.appendChild(templateLead.templateHeaderSource(source));
  };

  const renderFooter = async (source) => {
    const footer = document.querySelector("#footer");
    footer.appendChild(templateLead.templateFooterSource(source));
  };


  const initValidationFormXUS = () => {
    const $formLead = document.querySelector(".form-Lead");
    validateForm.init($formLead);
    $formLead.removeEventListener("submit", handleSubmitXUS);
    $formLead.addEventListener("submit", handleSubmitXUS);
  };

  const handleSubmitXUS = async (e) => {
    debugger
    const { checkValidFields, form, getValues } = validateForm.getValidation();

    alert("llego");
  };

  const getMessageWarning = (e, t) => {

    const WarningMessages = {
      OnlyLettersNumbers: getConfigMessage.strings.Lead.OnlyLettersNumbers,
      MustBeCharacters: getConfigMessage.strings.Lead.MustBeCharacters,
      AtLeastCharacters: getConfigMessage.strings.Lead.AtLeastCharacters,
      MessageIdentification: getConfigMessage.strings.Lead.MessageIdentification,
      MustBegin: getConfigMessage.strings.Lead.MustBegin,
      InvalidId: getConfigMessage.strings.Lead.InvalidId,
      FieldRequired: getConfigMessage.strings.Lead.FieldRequired,
      InvalidZipCode: getConfigMessage.strings.Lead.InvalidZipCode,
      OnlyLetters: getConfigMessage.strings.Lead.OnlyLetters,
      InvalidEmail: getConfigMessage.strings.Lead.InvalidEmail,
      OnlyNumbers: getConfigMessage.strings.Lead.OnlyNumbers,
      NineNumber: getConfigMessage.strings.Lead.NineNumber,
      NoValid: getConfigMessage.strings.Lead.NoValid,
    }

    let message = "";

    const tyepeSelect = e.type;
    const type = e.getAttribute("type");


    const name = e.getAttribute("name");
    let minlength = e.getAttribute("minlength") || 0;
    let maxlength = e.getAttribute("maxlength") || 0;
    const dataValidateRegex = e.getAttribute("data-validate-regex");
    let length = 0;
    if (type)
      length = e.value === "" ? 0 : e.value.length;

    const expresionRange = `^[a-zA-Z0-9 ]{${minlength},${maxlength}}$`;
    const expresionOnlyNumber = `^[0-9]{${minlength},${maxlength}}$`;
    const expresionCharactersOnly = `^[a-zA-Z ]{${minlength},${maxlength}}$`;
    const label = e.getAttribute("placeholder");

    const companyId = companyLead.getCompanyId();
    //message = validateByCountry(e, companyId, name, label, minlength, maxlength);

    if (message != "") {
      return message;
    }


    setMessage(e, message);


    if (type === 'email') {
      message = WarningMessages.InvalidEmail;
      setMessage(e, message);
      return message;
    }
    else if (length < minlength) {
      if (name === 'telephone1' || name === 'telephone2' || name === 'mobilephone') {
        if (companyId === 'XCL') {
          if (name === 'telephone2')
            message = WarningMessages.NineNumber;
          else
            message = WarningMessages.AtLeastCharacters.replace("XXXX", minlength);
        }
        else {
          if (companyId === 'XPE') {
            message = WarningMessages.AtLeastCharacters.replace("XXXX", minlength);
          } else {
            message = WarningMessages.MustBeCharacters.replace("XXXX", minlength);
          }
        }
        setMessage(e, message);
      }
      else {
        if (companyId === 'XSV') {
          message = WarningMessages.MustBeCharacters.replace('XXXX', minlength);
        } else if (companyId === 'XCL' && label === 'RUT') {
          message = WarningMessages.NoValid.replace('XXXX', 'RUT');
          validateDocumentByCountry(e);
        }
        else {
          message = WarningMessages.AtLeastCharacters.replace('XXXX', minlength);
        }

        setMessage(e, message);
      }
      return message;
    }
    else if (dataValidateRegex === expresionRange) {
      message = WarningMessages.OnlyLettersNumbers;
      setMessage(e, message);
      return message;
    }
    else if (dataValidateRegex === expresionOnlyNumber) {
      if (name === 'ph_documenttypeid' || name === 'ph_identification') {
        message = WarningMessages.InvalidId;
        setMessage(e, message);
      }
      else {
        message = WarningMessages.OnlyNumbers;
        setMessage(e, message);
      }
      return message;
    }
    else if (dataValidateRegex === expresionCharactersOnly) {
      message = WarningMessages.OnlyLetters;
      setMessage(e, message);
      return message;
    }
    else if (name === 'address1_postalcode') {
      message = WarningMessages.InvalidZipCode;
      setMessage(e, message);
      return message;
    }
    else {
      message = WarningMessages.FieldRequired;
      setMessage(e, message);
      return message;
    }

  };

  const setMessage = (e, message) => {

    const $div = e.closest('.form-group');
    const $elmmessage = $div.querySelector('.input-msg');

    if ($elmmessage)
      $elmmessage.innerHTML = message;
  };

  return {
    init,
    getMessageWarning
  }
})();


document.addEventListener("DOMContentLoaded", async () => {

  //confi.initLoader();
  await leadFormXUS.init();
  //confi.stopLoader();
});