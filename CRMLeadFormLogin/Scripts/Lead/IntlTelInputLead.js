const intlTelInputLead = (() => {
  let dialCode = "";
  const init = () => {
    
    
    let onlyCountries = ['co', 'mx', 'cr', 'pe', 'pa', 'ec', 'gt', 'jm', 'uy', 'sv', 'cl'];
    const countryDefault = setDefaultCountry();
    const $inputs = document.querySelectorAll("input[type = tel]");

    $inputs.forEach(input => {
      //var iti = window.intlTelInputGlobals.getInstance(input);
      input = input.closest(".form-group");
      let iti = window.intlTelInput(input, {
        onlyCountries,
        initialCountry: countryDefault,
        utilsScript: "../../Scripts/intlTelInput/utils.js"
      });

      dialCode = iti.getSelectedCountryData().dialCode;

      input.addEventListener("countrychange", function () {
        dialCode = iti.getSelectedCountryData().dialCode;
      });
    });

  };

  const setDefaultCountry = () => {
    const companyId = companyLead.getCompanyId();
    let countryDefault = "";

    switch (companyId) {
      case "XCB":
        countryDefault = "co"
        break;
      case "XMX":
        countryDefault = "mx"
        break;
      case "XCR":
        countryDefault = "cr"
        break;
      case "XJM":
        countryDefault = "jm"
        break;
      case "XUY":
        countryDefault = "uy"
        break;
      case "XCL":
        countryDefault = "cl"
        break;
      case "XPA":
        countryDefault = "pa"
        break;
      case "XSV":
        countryDefault = "sv"
        break;
      case "XGT":
        countryDefault = "gt"
        break;
      case "XEC":
        countryDefault = "ec"
        break;
      case "XPE":
        countryDefault = "pe"
        break;
      default:
        countryDefault = "co"
        break;
    }

    return countryDefault;
  };

  const getDialCode = () => dialCode;

  return {
    init,
    getDialCode,

  }

})();