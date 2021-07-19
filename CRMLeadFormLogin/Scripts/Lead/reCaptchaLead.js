const reCaptcha = (() => {

  let responseToken = null;

  var verifyCallback = function (response) {
      responseToken = response;
  };

  const loadCaptcha = () => {
    grecaptcha.render('html_element', {
      'sitekey': '6Lc91AwaAAAAAK18g39P74mKGFGxaGj2FdTfjqud',
      'callback': verifyCallback,
    });
  };

  const getToken = () => {
    return responseToken
  };


  const initCaptcha = () => {
    renderSectionCaptcha();
    loadCaptcha();
  };

  const renderSectionCaptcha = () => { 

    const $nodeSegment =  document.querySelector("button");
    const $contentElement = $nodeSegment.closest('.section-next-step')
    const $parent = $contentElement.parentElement;

    $parent.insertBefore(templateLead.templateGoogle_reCaptcha(), $contentElement);   
  };

  return {
    initCaptcha,
    getToken
  };
})();