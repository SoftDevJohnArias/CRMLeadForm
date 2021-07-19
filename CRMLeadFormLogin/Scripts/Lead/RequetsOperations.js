const serviceEmailCode = (() => {

  const createEmailCode = async (CreateEmailCodeRequest) => {

    const response = await fetch("/api/CreateEmailCode", confi.getConfig("POST", CreateEmailCodeRequest));
    return await response.json();
  };

  const verifyEmailCode = async (payload) => {
    const response = await fetch("/api/VerifyEmailCode", confi.getConfig("POST", payload));
    return await response.json();
  };

  const validateEmail = async (email) => {
    const response = await fetch("/api/ValidateEmail", confi.getConfig("POST", email));
    return await response.json();
  };

  const validateExistingEmail = async (email) => {
    
    //const emailparams = { email: emailValue };
    const response = await fetch("/api/ValidateExistingEmail", confi.getConfig("POST", email));
    return await response.json();
  };

  return {
    createEmailCode,
    verifyEmailCode,
    validateEmail,
    validateExistingEmail,
  };

})();
  

const serviceRegisterLead = (() => {
  const getSteptsSectionsFields = async (companyId) => {
    const result = await fetch(`/api/SteptsSectionsFields/${companyId}`);
    return await result.json();
  };
  const fieldsShowDependency = async (fieldsRequest) => {
    
    const result = await fetch("/api/FieldsShowDependency", confi.getConfig("POST", fieldsRequest));
    return await result.json();
  };

  const geographyLevelDependency = async (fieldsRequestGeography) => {
    const result = await fetch("/api/GeographyLevel", confi.getConfig("POST", fieldsRequestGeography));
    return await result.json();
  };

  const google_reCaptcha = async (token) => {
    const result = await fetch("/api/GooglereCaptcha", confi.getConfig("POST", token));
    return await result.json();
  };

  const sendDataLead = async (dataCompany) => {
    const result = await fetch("/api/SendDataLead", confi.getConfig("POST", dataCompany));
    return await result.json();
  };

  const leadExistence = async (dataleadExistence) => {
    const result = await fetch("/api/LeadExistence", confi.getConfig("POST", dataleadExistence ));
    return await result.json();
  };

  return {
    getSteptsSectionsFields,
    fieldsShowDependency,
    geographyLevelDependency,
    google_reCaptcha,
    sendDataLead,
    leadExistence,
  }
})();

 




