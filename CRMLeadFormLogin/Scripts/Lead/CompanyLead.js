const companyLead = (() => {  
  const getCompanyId = () => {
    const [companyId] = confi.getQueryParams({ params: ["companyId"] })
    return companyId || "XUS";
  };

  const getSourceId = () => {
    const [sourceId] = confi.getQueryParams({ params: ["SourceId"] })
    return sourceId || "MG";
  };

  const getCountryData = () => { 
    const companyId  = getCompanyId();
    let countryData = {};
    switch (companyId) {
      case "XBO":
        countryData.Img = '<img src = "/Content/img / Country / XBO.svg" height = "30" width = "40" />';
        countryData.Name = 'Bolivia';
        break;
      case "XCB":
        countryData.Img = '<img src="/Content/img/Country/XCB.svg" height="30" width="40" />';
        countryData.Name = 'Colombia';
        break;
      case "XCL":
        countryData.Img = '<img src="/Content/img/Country/XCL.svg" height="30" width="40" />';
        countryData.Name = 'Chile';
        break;
      case "XCR":
        countryData.Img = '<img src="/Content/img/Country/XCR.svg" height="30" width="40" />';
        countryData.Name = 'Costa Rica';
        break;
      case "XEC":
        countryData.Img = '<img src="/Content/img/Country/XEC.svg" height="30" width="40" />';
        countryData.Name = 'Ecuador';
        break;
      case "XGT":
        countryData.Img = '<img src="/Content/img/Country/XGT.svg" height="30" width="40" />';
        countryData.Name = 'Guatemala';
        break;
      case "XJM":
        countryData.Img = '<img src="/Content/img/Country/XJM.svg" height="30" width="40" />';
        countryData.Name ='Jamaica'
        break;
      case "XMX":
        countryData.Img = '<img src="/Content/img/Country/XMX.svg" height="30" width="40" />';
        countryData.Name = 'México';
        break;
      case "XPA":
        countryData.Img = '<img src="/Content/img/Country/XPA.svg" height="30" width="40" />';
        countryData.Name = 'Panamá';
        break;
      case "XPE":
        countryData.Img = '<img src="/Content/img/Country/XPE.svg" height="30" width="40" />';
        countryData.Name = 'Peru';
        break;
      case "XSV":
        countryData.Img = '<img src="/Content/img/Country/XSV.svg" height="30" width="40" />';
        countryData.Name = 'Salvador';
        break;
      case "XUS":
        countryData.Img = '<img src="/Content/img/Country/XUS.svg" height="30" width="40" />';
        countryData.Name = 'USA';
        break;
      case "XUY":
        countryData.Img = '<img src="/Content/img/Country/XUY.svg" height="30" width="40" />';
        countryData.Name = 'Uruguay';
        break;
      default:
        countryData.Img = '<img src="/Content/img/Country/XUS.svg" height="30" width="40" />';
        countryData.Name = 'USA';
        break;
    }

    return countryData;
  }

  const initForm = async () => {
    const companyId = getCompanyId();
    const sourceId = await getSourceId();
    await getCompany(companyId || "XMX", sourceId);
  };

  const handleOnChange = (e) => {
    try {
      getCompany(e.target.value);

    } catch (error) {
      console.error(error.toString())
    }
  };

  const getCompany = async (companyId, sourceId) => {
    await leadForm.init(companyId, sourceId);
  };

  return {
    initForm,
    getCompanyId,
    getSourceId,
    getCountryData
  }

})();

document.addEventListener("DOMContentLoaded", async () => {
  await companyLead.initForm();  
});








