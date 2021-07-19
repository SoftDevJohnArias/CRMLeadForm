const serviceESD = (() => {
  
  const getEsdproduct = async (filterPage) => {  
    
    const response = await fetch("/api/getEsdproduct", confi.getConfig("POST", filterPage));
    return await response.json();
  };

  const getCodes = async (filterPage) => {
    const response = await fetch("/api/getCodes", confi.getConfig("POST", filterPage));
    return await response.json();
  };

  return {
    getEsdproduct,
    getCodes
  };
})();

const serviceClients = (() => {  
  const getMyClients = async (filterPage) => {
    const response = await fetch("/api/getMyClients", confi.getConfig("POST", filterPage));
    return await response.json();
  };

  const getOptionSetByName = async () => {
    const response = await fetch("/api/GetOptionSetByName");
    return await response.json();
  };

  const getCountries = async () => {
    const response = await fetch('/api/GetCountries');
    return await response.json();
  };

  const createClient = async (requestFinalClient) => {
    const response = await fetch("/api/CreateFinalClient", confi.getConfig("POST", requestFinalClient));
    return await response.json();
  };

  //const updateClient = async (requestUpdateClient, requestOriginalClient) => {
  //  const response = await fetch("/api/EditFinalClient", confi.getConfig("POST", requestUpdateClient, requestOriginalClient));
  //  return await response.json();
  //};

  const updateClient = async (requestUpdateClient) => {
    const response = await fetch("/api/EditFinalClient", confi.getConfig("POST", requestUpdateClient));
    return await response.json();
  };

  return {
    getMyClients,
    getOptionSetByName,
    getCountries,
    createClient,
    updateClient
  }
})();

const serviceCodes = (() => {
  const getDistributedCodes = async (filterPage) => {
    const response = await fetch("/api/GetDistribuitedCodes", confi.getConfig("POST", filterPage));
    return await response.json();
  };

  return {
    getDistributedCodes,
  }
})();
