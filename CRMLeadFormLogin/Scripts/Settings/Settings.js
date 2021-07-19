/// Modules

const settingsCsutomer = (() => {

  const typeToken = {
    ACCESS_TOKEN: "AccessToken",
    API_TOKEN: "ApiToken"
  };

  const catalog = {
    DATA_BASE: "db",
    FILE: "file"
  };

  const getIdCustomer = () => {
    return document.getElementById("idCustomer").value;
  };

  return {
    typeToken,
    getIdCustomer,
    catalog
  };

})();


// FUNTIONS
/// FETCH API

const generateToken = async (typeToken, customerId) => {

  const result = await fetch("/api/GenerateToken", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      TypeToken: typeToken,
      CustomerId: customerId
    })
  });

  if (!result.ok)
    throw new Error(result.statusText);

  const { token } = await result.json();
  return token;
};

const loadProductsCatalog = async () => {

  const result = await fetch("/api/GetSettingsOptionsProductCatalog");
  const response = await result.json();

  if (!response) {
    console.error("cannot load select catalg");
    return;
  }

  const { catalogSource } = response;
  const options = JSON.parse(catalogSource.ValuesList);

  const $catalog = document.getElementById("catalog");
  $catalog.options[$catalog.options.length] = new Option("", "");
  options.forEach(item => {
    $catalog.options[$catalog.options.length] = new Option(item.DisplayText, item.Value);
  });

  //Set value selected
  const { value } = $catalog.dataset;
  if (value) {
    $catalog.value = value;
    showTabCatalog(value);

  }

};

//const updateCustomerSettings = async (valueSettings) => {

//  const result = await fetch("/api/UpdateCustomerSettings", {
//    headers: {
//      'Accept': 'application/json',
//      'Content-Type': 'application/json'
//    },
//    method: "POST",
//    body: JSON.stringify(valueSettings)
//  });

//  const response = await result.json();
//  return response;
 
//};

const showTabCatalog = (value) => {
  
  const $itemCtalog= document.getElementById("itemCtalog");

  if (value === settingsCsutomer.catalog.FILE) {
    $itemCtalog.classList.remove("d-none");
  }
  else if (value === settingsCsutomer.catalog.DATA_BASE) {
    $itemCtalog.classList.add("d-none");
  }
};

// EVENTS


document.addEventListener("DOMContentLoaded", () => {
  
  document.getElementById("btnPublicKey").addEventListener("click", handleClickApiKeToken);
  document.getElementById("btnPrivateKey").addEventListener("click", handleClickAccesKeyToken);
  //document.getElementById("catalog").addEventListener("change", handleChangeCatalog);
  loadProductsCatalog();
});

const handleClickApiKeToken = async (e) => {
  
  const token = await generateToken(settingsCsutomer.typeToken.API_TOKEN, settingsCsutomer.getIdCustomer());
  const $publicKey = document.getElementById("publicKey");
  $publicKey.value = token;
};

const handleClickAccesKeyToken = async (e) => {
  

  try {
    const token = await generateToken(settingsCsutomer.typeToken.ACCESS_TOKEN, settingsCsutomer.getIdCustomer());
    const $privateKey = document.getElementById("privateKey");
    $privateKey.value = token;
  } catch (e) {
    console.error(e);
  }

};

const handleChangeCatalog = async (e) => {
  const value = e.target.value;
  const result = await updateCustomerSettings(value);
  if (result.Success) {
    showTabCatalog(value);
  }

};

