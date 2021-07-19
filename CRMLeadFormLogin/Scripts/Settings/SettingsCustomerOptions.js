const settingCustomerOptionsModule = (() => {

  const handleChangeDefaultLocale = async (e) => {
    const value = e.target.value;
    const result = await settingCustomerModule.updateCustomerSettings('general.locale',value);
    
  };

  return {
    handleChangeDefaultLocale
  };

})();

document.addEventListener("DOMContentLoaded", () => {

  const $selectdefaultLocale = document.querySelector(".selectDefaultLocale");
  $selectdefaultLocale.addEventListener("change", settingCustomerOptionsModule.handleChangeDefaultLocale);
  $selectdefaultLocale.value = customerModule.generalLocale;
});