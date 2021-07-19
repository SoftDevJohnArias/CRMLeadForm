const settingCustomerModule = (() => {

  const updateCustomerSettings = async (settingId,valueSettings) => {

    const settingCustomer = { settingId: settingId, valueSettings: valueSettings}
    const result = await fetch("/api/UpdateCustomerSettings", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(settingCustomer)
    });

    const response = await result.json();
    return response;

  }

  return {
    updateCustomerSettings
  };

})();
