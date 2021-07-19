const validationRules = (() => {

  const initValidationsRules = ({ currenIndexStep, companyId, completeStepts }) => {

    const validations = {

      //valida que se cree al menos un contacto
      validateContact: function () {
        const { getContacts } = contactLead;
        if (currenIndexStep === 1) {
          if ((getContacts().length === 0) || (!getContacts().some(({ infoContact }) => infoContact.type === contactType.representative)))
            return false
          else
            return true;
        }
        else
          return true;
      },

      //valida que se verifique el email correctamente
      validateEmail: function () {        
        if (currenIndexStep === 4)
          return validationEmail.validateSuccessEmail();
        else
          return true;
      },

      validateNit_XCB: function () {

        const $field = document.querySelectorAll("[id^='4']");
        let $fieldNit = '';

        if ($field.length !== 0) {
          $fieldNit = $field[0].value;
        }


        if (companyId === 'XCB' && currenIndexStep === 0 && $fieldNit !== '') {

          return validationRules.validateDocumentNit_XCB($fieldNit);

        } else {
          return true;
        }
      },

      validateRut_XCL: function () {

        const $fieldRut = document.getElementById(8);

        if (companyId === 'XCL' && currenIndexStep === 0 && $fieldRut !== null) {
          const $rutXCL = document.getElementsByName('ph_documenttypeid')[0].value;
          //const $rutXCL = $rut.item(0).value;

          return validationRules.validateDocumentRut_XCL($rutXCL);
        } else {
          return true;
        }
      },

      validateRUT_XUY: function () {

        const $fieldRut = document.getElementById(4);

        if (companyId === 'XUY' && currenIndexStep === 0 && $fieldRut == 1) {// !== null) {
          const $rutXUY = document.getElementsByName('ph_companyidentification')[0].value;

          return validationRules.validateDocumentRut_XUY($rutXUY);
        } else {
          return true;
        }

      },

      validateCI_XUY: function () {

        const $fieldCI = document.getElementById(5);

        if (companyId === 'XUY' && currenIndexStep === 0 && $fieldCI !== null) {
          const $ciXUY = document.getElementsByName('ph_companyidentification')[0].value;

          return validationRules.validateDocumentCI_XUY($ciXUY);
        } else {
          return true;
        }

      },

    };
    return validations;
  };

  const validateSectionNextEmail = () => {

    const $sectionEmail = document.querySelector('.content-validation-email');
    setSectionDisable($sectionEmail);
    document.querySelector(".section-next-step").classList.toggle("element-disabled");

  };

  const setSectionDisable = (elm) => {

    let $nextNode = elm.nextSibling;
    if (!$nextNode) return;
    else
      $nextNode.classList && $nextNode.classList.toggle("element-disabled");

    return setSectionDisable($nextNode);
  };

  const validateDocumentNit_XCB = ($num) => {


    const $tempNum = $num.replaceAll(".", "");
    const $temp = $tempNum.split("-");

    const $number = $temp[0];
    const $digito = $temp[1];
    let vpri, x, y, z;

    vpri = new Array(16);
    z = $number.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;

    for (var i = 0; i < z; i++) {
      y = ($number.substr(i, 1));
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;

      x += (y * vpri[z - i]);
      // console.log ( x ) ;    
    }

    y = x % 11;
    // console.log ( y ) ;

    const $total = (y > 1) ? 11 - y : y;

    if ($total === parseInt($digito)) {
      return true;
    } else
      return false;

  };

  const validateDocumentRut_XCL = ($rut) => {

    const $rutDocument = $rut.replace("‐", "-");

    let $rutTmp = $rutDocument.split('-');
    let $rutDigit = $rutTmp[1];
    let $rutNumber = $rutTmp[0];
    let $rutNumberOne = $rutNumber.replace(".", "");
    let $rutValid = $rutNumberOne.replace(".", "");

    if ($rutDigit == 'K') $rutDigit = 'k';

    var M = 0, S = 1;

    for (; $rutValid; $rutValid = Math.floor($rutValid / 10))
      S = (S + $rutValid % 10 * (9 - M++ % 6)) % 11;

    const $digitTemp = S ? S - 1 : 'K';


    if ($digitTemp == $rutDigit) {
      return true;
    } else {
      return false;
    }
  };

  const validateDocumentRut_XUY = (num) => {

    const rut = num.replaceAll(".", "");

    if (rut.length != 12) {
      return false;
    }
    if (!/^([0-9])*$/.test(rut)) {
      return false;
    }
    var dc = rut.substr(11, 1);
    var rutNum = rut.substr(0, 11);
    var total = 0;
    var factor = 2;

    for (i = 10; i >= 0; i--) {
      total += (factor * rutNum.substr(i, 1));
      factor = (factor == 9) ? 2 : ++factor;
    }

    var dv = 11 - (total % 11);

    if (dv == 11) {
      dv = 0;
    } else if (dv == 10) {
      dv = 1;
    }
    if (dv == dc) {
      return true;
    }
    return false;
  };

  const validateDocumentCI_XUY = ($ci) => {

    const $ciDocumentTemp = $ci.replace(".", "");
    const $ciDocument = $ciDocumentTemp.replace(".", "");

    let $ciTmp = $ciDocument.split('-');
    let $ciDigit = $ciTmp[1];
    let $ciNumber = $ciTmp[0];
    let a = 0;
    let $num = 0;

    for (i = 0; i < 7; i++) {
      a += (parseInt("2987634"[i]) * parseInt($ciNumber[i])) % 10; //8123476 //2987634
    }
    if (a % 10 === 0) {
      $num = 0;
    } else {
      $num = 10 - a % 10;
    }

    if ($num === parseInt($ciDigit)) {
      return true;
    } else {
      return false;
    }

  };

  return {
    initValidationsRules,
    validateSectionNextEmail,
    validateDocumentNit_XCB,
    validateDocumentRut_XCL,
    validateDocumentRut_XUY,
    validateDocumentCI_XUY,
  };

})();

const validationMessages = (() => {

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

    const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();

    let message = "";

    const tyepeSelect = e.type;
    const type = e.getAttribute("type");



    if ((type === "radio" || type === "checkbox" || type === null) && tyepeSelect != "select-one") {
      if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
        message = "";
        return message;
      }
      else
        message = WarningMessages.FieldRequired;
    }


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


    //const expresion = dataValidateRegex.split('{');
    //const ranges = expresion[expresion.length - 1].replace("}$", "").split(",");

    //if (name === 'telephone1' || name === 'telephone2') {
    //  minlength = parseInt(ranges[0]);
    //  maxlength = parseInt(ranges[1] || ranges[0]);
    //}


    if (e.classList.contains('content-iva')) {
      message = '';
      return message;
    }

    const companyId = companyLead.getCompanyId();
    message = validateByCountry(e, companyId, name, label, minlength, maxlength);

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

  const validateByCountry = (e, country, name, label, minlength, maxlength) => {


    let message = "";
    const WarningMessagesByCountry = {
      MessageIdentification: getConfigMessage.strings.Lead.MessageIdentification,
      MustBegin: getConfigMessage.strings.Lead.MustBegin,
      MustBeCharacters: getConfigMessage.strings.Lead.MustBeCharacters,
      InvalidId: getConfigMessage.strings.Lead.InvalidId,
      AtLeastCharacters: getConfigMessage.strings.Lead.AtLeastCharacters,
      OnlyLettersNumbers: getConfigMessage.strings.Lead.OnlyLettersNumbers,
      InvalidDocument: getConfigMessage.strings.Lead.InvalidDocument,

    }

    switch (country) {
      case "XPE":
        if (name === "ph_companyidentification") {
          if (e.value.charAt(0) != '2') {
            message = WarningMessagesByCountry.MustBegin.replace("XXXX", "1 o 2");
            return message;
          }
        }
        break;
      case "XGT":
        if (name === 'telephone1' || name === 'telephone2' || name === 'mobilephone') {
          message = WarningMessagesByCountry.MustBeCharacters.replace("XXXX", 8);
          return message;
        }
        break;
      case "XMX":
        if (name === 'ph_companyidentification' && label === 'RFC') {
          message = WarningMessagesByCountry.OnlyLettersNumbers;
          return message;
        }
        break;
      case "XUY":
        if (name === 'ph_companyidentification') {
          message = WarningMessagesByCountry.InvalidDocument;
          return message;
        }
        break;
      case "XCB":
        if (name === 'ph_companyidentification') {
          if (label === getConfigMessage.strings.Lead.Cedula || label === getConfigMessage.strings.Lead.RUT)
            message = WarningMessagesByCountry.AtLeastCharacters.replace("XXXX", minlength);
          else
            message = WarningMessagesByCountry.InvalidId;
          return message;
        }
        break;
    }

    return message;
  };

  const setMessage = (e, message) => {

    const $div = e.closest('.form-group');
    const $elmmessage = $div.querySelector('.input-msg');

    if ($elmmessage)
      $elmmessage.innerHTML = message;
  };

  const validateDocumentByCountry = (e) => {

    let message = getConfigMessage.strings.Lead.MessageIdentification;

    const company = companyLead.getCompanyId();

    if (company === 'XCL') {
      const $div = e.closest('.form-group');
      //CreateElementSpan($div);
      //const $elmmessage = $div.querySelector('.input-msg');
      //const $elmmessage = ($div.querySelector('.input-msg') === null) ? $div.querySelector('.error-message') : $div.querySelector('.input-msg');
      const $elmmessage = $div.querySelector('.error-message');

      if (e.classList.contains("is-error")) {
        //if (!e.classList.contains("is-error") && e.value === "") {
        $elmmessage.innerHTML = message;
      }
      else if (e.value === "") {
      //if (!e.classList.contains("is-error") && e.value === "") {
        $elmmessage.innerHTML = message;
      } else {
        $elmmessage.innerHTML = "";

      }
    }

    if (company === 'XSV') {

      if (e.name === 'ph_dui' && !e.hasAttribute('.data-required')) {
        if (e.value.length !== 10) {
          e.value = '';
        }
      }
    }
  };

  //const valideMesageOnBlur = (e) => {
  //  debugger
  //  const $div = e.closest('.form-group');
  //  CreateElementSpan($div);
  //  const $elmmessage = $div.querySelector('.input-msg');


  //  debugger
  //  const company = companyLead.getCompanyId();

  //  if (company === 'XCL') {
  //    $elmmessage.innerHTML = "";
  //  }
  //};

  const EmptyDocumentByCountry = async (e) => {

    const company = companyLead.getCompanyId();
    if (company === 'XCL') {
      // const $div = e.closest('.form-group');
      // const $elmmessage = $div.querySelector('.error-message');

      //CreateElementSpan($div);
      const $elmmessage = $div.querySelector('.input-msg');
      debugger
      $elmmessage.innerHTML = '';
    }
  };

  const ValidateErrorInput = ($div, isError = false, message = "") => {
    debugger
    let $elmmessage = $div.querySelector('.input-msg');
    if ( isError) {
      $div.querySelector('input').setAttribute("IsError", "true");
       if ($elmmessage === null) {
        var spanError = document.createElement("SPAN");
        spanError.classList.add("input-msg");
        $div.appendChild(spanError);
      }
      $elmmessage = $div.querySelector('.input-msg');
      $elmmessage.innerHTML = message;
      $elmmessage.style.color = '#c40247';
      $div.querySelector('input').classList.add("is-error");
    } else {
      $div.querySelector('input').removeAttribute("IsError");
      if ($elmmessage !== null) {
        $div.querySelector('input')?.classList.remove("is-error");
        $elmmessage.remove();
      }
    }
  };

  const validateFieldNotRequired = (e) => {
    debugger
    //e.value
    //let $div = e.closest('.form-group');
    let $div;
    let Ischange = e.type === "change";
    if (Ischange) {
      $div = e.target.closest('.form-group');
    }
    else {
      $div = e.closest('.form-group');
    }
   
    var dataValidateRegex = new RegExp($div.querySelector('input').getAttribute("data-validate-regex"));
    if (Ischange) {
      if (e.target.value === ""  ) {
        ValidateErrorInput($div, false);
        $div.querySelector('input').classList.remove("is-valid")
      }
      else {
        if (dataValidateRegex.test($div.querySelector('input').value)) {
          ValidateErrorInput($div, false);
        }
        else {
          let messsage = getMessageWarning((e.type === "change") ? e.target : e);
          ValidateErrorInput($div, true, messsage);
        }
        
      } 
    }
    else {
      if (e.value === "") {
        ValidateErrorInput($div, false);
        $div.querySelector('input').classList.remove("is-valid")
      }
      else {
        if (dataValidateRegex.test($div.querySelector('input').value)) {
          ValidateErrorInput($div, false);
        }
        else {
          let messsage = getMessageWarning((e.type === "change") ? e.target : e);
          ValidateErrorInput($div, true, messsage);
        }       
      } 
    }       
};

  const validateDocumentIdentification = async (e, isError = true) => {
    debugger
    const message = getConfigMessage.strings.Lead.InvalidId;
    const $div = e.closest('.form-group');
    ValidateErrorInput($div, isError, message);
    //let $elmmessage = ($div.querySelector('.input-msg') === null) ? $div.querySelector('.error-message') : $div.querySelector('.input-msg');
    //if (($elmmessage === null && isError) /*|| (isError && $div.querySelector('.input-msg') === null)*/) {
    //  var spanError = document.createElement("SPAN");
    //  spanError.classList.add("input-msg");
    //  $div.appendChild(spanError);
    //  $elmmessage = $div.querySelector('.input-msg');
    //}
    //if ($div.querySelector('.input-msg') !== null) {
    //  $div.querySelector('.error-message')?.remove();
    //}
    //if (isError) {
    //  $elmmessage.innerHTML = message;
    //  $elmmessage.style.color = '#c40247';
    //} else {
    //  $elmmessage.innerHTML = '';
    //}

  };



  return {
    getMessageWarning,
    validateByCountry,
    validateDocumentByCountry,
    EmptyDocumentByCountry,
    validateDocumentIdentification,
    validateFieldNotRequired
    //valideMesageOnBlur

  };
})();

