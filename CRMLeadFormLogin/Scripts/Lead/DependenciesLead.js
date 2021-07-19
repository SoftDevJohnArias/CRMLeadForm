const dependencies = (() => {

  const initDependencies = () => {
    const $element = document.querySelector('select[name=ph_companytypeid]');
    $element.addEventListener("change", handleOnChanceTypePerson);    
  };

  const handleOnChanceTypePerson = (e) => {
    try {
      
      const option = document.querySelector('select[name=ph_companytypeid]');
      const companyId = option.options[option.selectedIndex].value;
        

    } catch (error) {
      console.error(error.toString())
    }

  };

  return {
    handleOnChanceTypePerson,
  };

})();