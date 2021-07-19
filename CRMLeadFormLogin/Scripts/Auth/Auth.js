
const authModule = (() => {

  const initFormLogin = () => {
    
    const $formLogin = document.getElementById("formLogin");
    validateForm.init($formLogin);
    $formLogin.addEventListener("submit", handleSubmit);
  };

  /////Events
  const handleSubmit = async () => {
    
    try {
      const validationForm = validateForm.getValidation();
      if (validationForm.checkValidFields()) {
        confi.initLoader();
        const { User, Password } = validationForm.getValues();
        const token = await serviceAuth.signIn({ User, Password });
        confi.stopLoader();

        localStorage.setItem(storageKeys.accesToken, token);
        window.location.href = `/AdminHome/Index`;
      }
    } catch (e) {

    }
    
  };


  return {
    initFormLogin,
  }
})();



document.addEventListener("DOMContentLoaded", () => {
  authModule.initFormLogin();


});