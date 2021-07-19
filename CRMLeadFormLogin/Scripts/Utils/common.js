const constantMock = window.fetch;
window.fetch = function () {

  return new Promise((resolve, reject) => {
    constantMock.apply(this, arguments)
      .then(response => {
        if (!response.ok) {

          throw Error(response.status)
        }
        resolve(response)
      })
      .catch((error) => {

        if (error.message === "401") {
          window.location.href = "/Account/Login";
        }

        reject(`error ${error.toString()}`);
      })
  });

};

const confi = (() => {
  let idinterval = null;
  const getConfig = (method = "GET", body = null, isSendtoken = false) => {
    const getToken = () => {
      const { accesToken } = JSON.parse(confi.getCookieByName("access-token"));
      return accesToken;
    }

    return {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: isSendtoken ? `Bearer ${getToken()}` : null,
      },
      credentials: 'include',
      body: body ? JSON.stringify(body) : null
    };
  };


  const getQueryParams = ({ params = [] }) => {
    const urlParams = new URLSearchParams(window.location.search);
    return params.map((param) => urlParams.get(param));
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const getCookieByName = (name) => {
    const getCookieValues = (cookie) => {
      var cookieArray = cookie.split('=');
      return cookieArray[1].trim();
    };

    const getCookieNames = (cookie) => {
      var cookieArray = cookie.split('=');
      return cookieArray[0].trim();
    };

    const cookies = document.cookie.split(';');
    return cookies.map(getCookieValues)[cookies.map(getCookieNames).indexOf(name)];
  };

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };


  //loader
  const initLoader = () => {
    const $spinner = document.querySelector(".spinner-container");
    $spinner.classList.remove("d-none");
  };
  const stopLoader = () => {
    const $spinner = document.querySelector(".spinner-container");
    $spinner.classList.add("d-none");
  };

  //Formatter
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');

  };

  const ShowPassword = (elemnto) => {
    elemnto.parentElement.querySelector("input").type = elemnto.parentElement.querySelector("input").type === ("password") ? "text" : "password";
  };

  const Messagge = (succes, msg) => {
    if (succes) {
      document.getElementById("DivHijo").children[0].children[0].className = "icon-ws-ico-min-check";
      document.getElementById("DivHijo").style.backgroundColor = "#72C15E";
      document.getElementById("DivHijo").style.border = "1px solid #72C15E";
      document.getElementById("DivPadre").classList.remove("menusue");
      document.getElementById("DivPadre").classList.add("menusueSucces");

    }
    else {
      document.getElementById("DivHijo").children[0].children[0].className = "icon-ws-ico-min-alert";
      document.getElementById("DivHijo").style.backgroundColor = "#C40047";
      document.getElementById("DivHijo").style.border = "1px solid #C40047";
      document.getElementById("DivPadre").classList.remove("menusueSucces");
      document.getElementById("DivPadre").classList.add("menusue");
    }
    document.getElementById("messagge").innerHTML = msg;
    document.getElementById("DivPadre").style.display = "flex";

    var counter = 10;
    clearInterval(idinterval);
    idinterval = setInterval(function () {
      if (counter === 1)
        document.getElementById("DivPadre").style.display = "none";
      else {
        counter = counter - 1;
        document.getElementById("messagge").innerHTML = msg + "        " + counter + " s";
      }
    }, 1000)
  };

  //debounce
  const debounce = (func, delay) => {
    //alert('d');
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments
      //clearTimeout(debounceTimer);
      debounceTimer
        = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

  const scrollToElement = (element) => {
    window.scrollTo({
      top: element ? element.offsetTop : 0,
      left: 0,
      behavior: 'smooth'
    });
  };


  const scrollTo = function (to, duration) {
    const
      element = document.scrollingElement || document.documentElement,
      start = element.scrollTop,
      change = to - start,
      startDate = +new Date(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      },
      animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
        else {
          element.scrollTop = to;
        }
      };
    animateScroll();
  };

  const downloadFile = (dataFile, fileName, type = 'text/plain') => {
    const file = new Blob([dataFile], { type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = fileName;

    document.body.append(link);
    link.click();
    link.remove();
    window.addEventListener('focus', e => URL.revokeObjectURL(link.href), { once: true });
  };

  const thousandSeparator = (value, minimumFractionDigits = 2) => {
    return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits
    });

  };

  function contains(target, pattern) {
    const targetUpper = target.toUpperCase();
    return pattern.some(word => targetUpper === word);
  };

  const getChildIndex = (child) => {
    const parent = child.parentNode;
    const children = parent.children;
    let i = children.length - 1;
    for (; i >= 0; i--) {
      if (child == children[i]) {
        break;
      }
    }
    return i;
  };

  const createVirtualDOM = (template) => {
    const htmlVirtual = document.implementation.createHTMLDocument();
    htmlVirtual.body.innerHTML = template;
    return htmlVirtual.body.children[0];
  };

  const templateToolTipInfo = (text) => {
    const template = `<div class="tooltipinfo">
                        <div class="info-icon-file">?</div>
                        <div class="tooltiptextinfo">
                         <p>${text}</p>
                        </div>
                       </div>`;
    return confi.createVirtualDOM(template);
  };


  return {
    getConfig,
    initLoader,
    stopLoader,
    formatDate,
    ShowPassword,
    Messagge,
    optionsDate,
    debounce,
    copyToClipboard,
    scrollToElement,
    scrollTo,
    downloadFile,
    thousandSeparator,
    contains,
    getChildIndex,
    createVirtualDOM,
    getCookieByName,
    getQueryParams,
    validateEmail,
    templateToolTipInfo,
  };
})();

const validateForm = (() => {  
  let formValidate = null;

  const init = (formElement) => {
    const config = {
      formSelector: formElement,
      validClass: 'is-valid',
      invalidClass: 'is-error',
      msgClass: 'input-msg'
    };

    formValidate = new FormValidate(config);
    formValidate.init();

  };


  const getValidation = () => formValidate;

  return {
    init,
    getValidation

  };

})();

const progressBar = (() => {

  const getElementProgressBar = () => document.querySelector(".current-percent");

  const increment = (total, currentprocessed) => {
    const $progresBarElemnet = getElementProgressBar();
    const percentCalculated = Math.round((currentprocessed * 100) / total);
    const resultPercent = `${percentCalculated}%`;
    $progresBarElemnet.style.width = resultPercent;
    $progresBarElemnet.querySelector("p").innerText = resultPercent;
  };

  const reset = () => {
    const $progresBarElemnet = getElementProgressBar();
    $progresBarElemnet.style.width = 0;
    $progresBarElemnet.querySelector("p").innerText = "";
  };
  return {
    increment,
    reset,
  };
})();

const imageModule = (() => {

  const IMG_DEFAULT = '/Content/img/no-picture-taking.svg';

  const loadAsyncImage = (url, timeout) => {
    timeout = timeout | 30000;
    let timedOut = false;
    let timer = null;
    const image = new Image();

    return new Promise(resolve => {
      //ERROR LOAD
      image.onerror = image.onabort = () => {
        if (!timedOut) {
          clearTimeout(timer);
          image.src = IMG_DEFAULT;
          resolve({ image, erroLoad: true });
        }
      };
      //SUCCESS LOAD
      image.onload = () => {
        if (!timedOut) {
          clearTimeout(timer);
          resolve({ image, erroLoad: image.src.includes(IMG_DEFAULT) });
        }
      };

      image.src = url || IMG_DEFAULT;

      timer = setTimeout(() => {
        timedOut = true;
        image.src = IMG_DEFAULT;
        resolve({ image, erroLoad: true });
      }, timeout);

    });
  };
  return {
    loadAsyncImage
  };


})();


const getApiEndpoind = (() => {

  const apisIws = {

    catalogApis: {
      getProductCatalog: '/api/GetProductsCatalog'
    },

    logApis: {

    }

  };

  const apisExternal = {

  };

  return {
    apisIws,
    apisExternal
  };
})();



const context = (() => {

  const createStore = reducer => {
    let state;
    let listeners = [];
    const getState = () => state;
    const dispatch = action => {
      state = reducer(state, action);
      console.log(listeners);
      listeners.forEach(listener => listener());
    };
    const subscribe = listener => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
    dispatch({});
    return { getState, dispatch, subscribe };
  };

  return {
    createStore
  };

})();


const scrollPostionsticky = (() => {

  let $element = null;
  let stickyValue = null;
  let classSticky = null;
  const handleScroll = () => {

    if (window.pageYOffset > stickyValue) {
      $element.classList.add(classSticky);

    } else {
      $element.classList.remove(classSticky);

    }
  };

  const setPositionSticky = (element, classStyle = "sticky") => {
    $element = element;
    stickyValue = element.offsetTop;
    classSticky = classStyle;
    document.addEventListener("scroll", handleScroll);
  };

  const removePositionSticky = () => document.removeEventListener("scroll", handleScroll);

  return {
    setPositionSticky,
    removePositionSticky,
  };

})();

const storageKeys = (() => {

  return {
    accesToken: "accesToken",
  }

})();

const templateNotifications = (() => {

  return {
    warning: "warning",
    error: "error",
    success: "success",
  }

})();

const contactType = (() => {

  return {
    representative: "representative",
    commercialContact: "commercial-contact"
  }

})();

const templatesGeneral = (() => {

  const MESSAGE_TYPE = {
    warning: "warning",
    info: "info",
  };

  const createMessageStatic = ({ message, classStyle }) => {
    return ` <div class="notification-static ${classStyle}">
                        <p>${message}</p>
                      </div>`

    //  return confi.createVirtualDOM(template);
  };

  return {
    createMessageStatic,
    MESSAGE_TYPE
  };
})();

const iMaskPhone = (() => {

  const BASE_CODE_COUNTRY = {

    XCL: "XCL",
    XCB: "XCB",
    XCR: "XCR",
    XEC: "XEC",
    XSV: "XSV",
    XGT: "XGT",
    XJM: "XJM",
    XMX: "XMX",
    XPA: "XPA",
    XPE: "XPE",
    XUY: "XUY",
    XUS: "XUS",
    XBO: "XBO",

  };


  const validateMaskPhone = function (element, companyId = "XMX") {

    let maskOptions;

    switch (companyId) {
      case BASE_CODE_COUNTRY.XBO:

        maskOptions = {
          mask: "000000000000000"
        };

        setOptionsIMask(element, maskOptions);
        addRuleRange(element, 20, 1);
        setPlaceHolder(element, "XXXXXXXXXXXXXXX");


        break;
      case BASE_CODE_COUNTRY.XCL:

        const $inputXCL = element.className.trim();

        if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "900000000000000"
          };
          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 15, 9);
          setPlaceHolder(element, "900000000");
        } else if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "000000000000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 15, 9);
          setPlaceHolder(element, "000000000");
        }


        break;
      case BASE_CODE_COUNTRY.XCR:

        //maskOptions = {
        //  mask: "#0000000",
        //  definitions: {
        //    '#': /[02345678]/
        //  }

        //};
        //setOptionsIMask(element, maskOptions);
        //addRuleRange(element, 13, 1);
        ////setPlaceHolder(element, "XXXXXXXX");

        const $inputXCR = element.className.trim();

        if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "#0000000",
            definitions: {
              '#': /[02345678]/
            }
          };
          addRuleRange(element, 8, 8);
          setPlaceHolder(element, "00000000");
        } else if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "#0000000",
            definitions: {
              '#': /[02345678]/
            }
          };
          addRuleRange(element, 8,8);
          setPlaceHolder(element, "00000000");
        }

        setOptionsIMask(element, maskOptions);
        break;

      case BASE_CODE_COUNTRY.XEC:

        const $inputXEC = element.className.trim();

        if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "\\0900000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 10, 10);
          setPlaceHolder(element, "XXXXXXXXXX");
         
        } else if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "0000000"
          };
          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 7, 7);
          setPlaceHolder(element, "XXXXXXX");
        
        }


        break;

      case BASE_CODE_COUNTRY.XGT:

        maskOptions = {
          mask: "#000-0000",
          definitions: {
            '#': /[023456789]/
          }
        };

        setOptionsIMask(element, maskOptions);
        addRuleRange(element, 9, 9);
        setPlaceHolder(element, "0000-0000");
        break;

      case BASE_CODE_COUNTRY.XJM:

        maskOptions = {
          mask: "0000000"
        };

        setOptionsIMask(element, maskOptions);
        addRuleRange(element, 7, 7);
        setPlaceHolder(element, "XXXXXXX");
        break;
      case BASE_CODE_COUNTRY.XMX:

        maskOptions = {
          mask: "00-00000000"
        };

        setOptionsIMask(element, maskOptions);
        addRuleRange(element, 11, 11);
        //setPlaceHolder(element, "XX-XXXXXXXX");
        break;

      case BASE_CODE_COUNTRY.XPA:

        const $inputXPA = element.className.trim();

        if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "00000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 8, 8);
          setPlaceHolder(element, "00000000");

        } else if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "0000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 7, 7);
          setPlaceHolder(element, "0000000");
        }



        break;
      case BASE_CODE_COUNTRY.XPE:

        const $inputXPE = element.className.trim();

        if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "0000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 7, 6);
          setPlaceHolder(element, "0000000");

        } else if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "90000000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 11, 9);
          setPlaceHolder(element, "90000000000");
        }
        break;
      case BASE_CODE_COUNTRY.XUY:

        const $inputXUY = element.className.trim();

        if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "00000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 8, 8);
          setPlaceHolder(element, "XXXXXXXX");

        }
        else if (element.classList.contains("input-cellphone")) {
          maskOptions = {
            mask: "\\000 000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 10, 10);
          setPlaceHolder(element, "XXX XXXXXX");

        } else if (element.classList.contains("phone")) {

          maskOptions = {
            mask: "00000000"
          };

          setOptionsIMask(element, maskOptions);
          addRuleRange(element, 8, 8);
          setPlaceHolder(element, "XXXXXXXX");
        }
        break;

      case BASE_CODE_COUNTRY.XSV:

        maskOptions = {
          mask: "00000000"
        };

        setOptionsIMask(element, maskOptions);
        addRuleRange(element, 8, 8);
        setPlaceHolder(element, "XXXXXXXX");
        break;
      case BASE_CODE_COUNTRY.XCB:
        
        const $input = element.className.trim();
        
        if (element.classList.contains('input-cellphone')) {
          maskOptions = {
            mask: "3000000000"
          };
          addRuleRange(element, 10, 10);
        } else if (element.classList.contains("input-phone")) {
          maskOptions = {
            mask: "0000000"
          };
          addRuleRange(element, 7, 7);
        }

        setOptionsIMask(element, maskOptions);
        setPlaceHolder(element, "XXXXXXXXXX");

        break;
    }

  };

  const addRuleRange = (element, max, min) => {
    element.setAttribute("minlength", min);
    element.setAttribute("maxlength", max);
  };

  const setPlaceHolder = (element, placeHoder) => {

    const $label = element.nextElementSibling;
    const titleLabel = $label.dataset.title;
    $label.setAttribute("title", `${titleLabel} (${placeHoder})`);
  };

  const setOptionsIMask = (element, maskOptions) => {
    IMask(element, maskOptions);
  };

  return {
    validateMaskPhone
  };

})();

const iMaskDocument = (() => {

  const BASE_CODE_COUNTRY = {

    XCL: "XCL",
    XCB: "XCB",
    XCR: "XCR",
    XEC: "XEC",
    XSV: "XSV",
    XGT: "XGT",
    XJM: "XJM",
    XMX: "XMX",
    XPA: "XPA",
    XPE: "XPE",
    XUY: "XUY",
    XUS: "XUS",
    XBO: "XBO",

  };

  const validateMaskDocument = function (element, companyId = "XMX", indexStep) {
    debugger
    let maskOptions;

    switch (companyId) {
      case BASE_CODE_COUNTRY.XSV:

        if (indexStep === 0) {

          const $nitXSV = document.querySelector('input[name=ph_companyidentification]');
          const $duiXSV = document.querySelector('input[name=ph_dui]');

          maskOptions = {
            mask: "0000-000000-000-0"
          };

          setOptionsIMask($nitXSV, maskOptions);
          addRuleRange($nitXSV, 17, 17);
          setPlaceHolder($nitXSV, "XXXX-XXXXXX-XXX-X");

          maskOptions = {
            mask: "00000000-0"
          };

          setOptionsIMask($duiXSV, maskOptions);
          addRuleRange($duiXSV, 10, 10);
          setPlaceHolder($duiXSV, "XXXXXXXX-X");
        }
        
        break;
      case BASE_CODE_COUNTRY.XCL:
        debugger
        if (indexStep === 0) {
          if (element.id === "content-Dependency") {

            if (element.childElementCount < 6) {

              maskOptions = {
                mask: "00.000.000-[#]",
                definitions: {
                  '#': /[k0-9]/
                }

              };

              setOptionsIMask(element.children[2].children[0], maskOptions);
              addRuleRange(element.children[2].children[0], 12, 11);
              setPlaceHolder(element.children[2].children[0], "XX.XXX.XXX-X");
            } else {
              maskOptions = {
                mask: "00.000.000-[#]",
                definitions: {
                  '#': /[k0-9]/
                }
              };

              setOptionsIMask(element.children[5].children[0], maskOptions);
              addRuleRange(element.children[5].children[0], 12, 11);
              setPlaceHolder(element.children[5].children[0], "XX.XXX.XXX-X");
            }
          }

          const $direction = document.querySelector('input[nae=ph_buildingtype]');

          if ($direction) {

          }

        } else {

          const $contentNumber = document.querySelector('input[name=ph_identification]');

          if ($contentNumber) {
            maskOptions = {
              mask: "00.000.000-[#]",
              definitions: {
                '#': /[k0-9]/
              }

            };

            setOptionsIMask($contentNumber, maskOptions);
            addRuleRange($contentNumber, 12, 11);
            setPlaceHolder($contentNumber, "XX.XXX.XXX-X");
          }          
        }
        

        break;
      case BASE_CODE_COUNTRY.XCR:
        
        if (element.id === "content-Dependency") {

          const $cedula = element.children[0].children[0].id.charAt(0);

          if ($cedula === "5") {
            maskOptions = {
              mask: "0 0000 0000"
            };

            setOptionsIMask(element.children[2].children[0], maskOptions);
            addRuleRange(element.children[2].children[0], 11, 5);
            setPlaceHolder(element.children[2].children[0], "X XXXX XXXX");

          } else {

            maskOptions = {
              mask: "0 000 000000"
            };

            setOptionsIMask(element.children[2].children[0], maskOptions);
            addRuleRange(element.children[2].children[0], 12, 5);
            setPlaceHolder(element.children[2].children[0], "X XXX XXXXXX");
          }

        }

        break;

      case BASE_CODE_COUNTRY.XEC:

        const $docuXEC = document.querySelector('input[name=ph_companyidentification]');
        if ($docuXEC) {
          if (indexStep === 0) {
            maskOptions = {
              mask: "0000000000\\0\\0\\1"
            };

            setOptionsIMask($docuXEC, maskOptions);
            addRuleRange($docuXEC, 13, 13);
            setPlaceHolder($docuXEC, "XXXXXXXXXX001");

           
          }
        } 
        
        break;

      case BASE_CODE_COUNTRY.XGT:
        
        const $inputXGT = document.querySelector("input[name = ph_documentdigitid]");

        if ($inputXGT) {
          maskOptions = {
            mask: '#',
            definitions: {
              '#': /[k0-9]/
            }
          };

          setOptionsIMask($inputXGT, maskOptions);
          addRuleRange($inputXGT, 1, 1);
          setPlaceHolder($inputXGT, "X");
        }

        break;

      case BASE_CODE_COUNTRY.XJM:
        if (indexStep === 0) {
          const $inputXJM = element.querySelectorAll("input[name = ph_companyidentification]")[0];

          maskOptions = {
            //mask: "0000000000\\0\\0\\1"
            mask: "000-000-000"
          };

          setOptionsIMask($inputXJM, maskOptions);
          addRuleRange($inputXJM, 11, 11);
          setPlaceHolder($inputXJM, "XXX-XXX-XXX");
        }

        break;
      case BASE_CODE_COUNTRY.XMX:
        
        const $name = element.id;

        if ($name === "content-Dependency") {
          const $lenght = element.children.length;

          if ($lenght === 5) {
            const $rfc = element.children[4].children[0].children[0].id.charAt(0);

            if ($rfc === '7') {
              maskOptions = {
                mask: "{aaaa}000000[a0][a0][a0]"
              };

              setOptionsIMask(element.children[4].children[0].children[0], maskOptions);
              addRuleRange(element.children[4].children[0].children[0], 13, 13);
              setPlaceHolder(element.children[4].children[0].children[0], "XXXXXXXXXXXXX");
            }
          } else {
            const $rfc = element.children[1].children[0].children[0].id.charAt(0);

            if ($rfc === '8') {
              maskOptions = {
                mask: "{aaa}000000[a0][a0][a0]"
                //[0-9a-f]
              };

              setOptionsIMask(element.children[1].children[0].children[0], maskOptions);
              addRuleRange(element.children[1].children[0].children[0], 12, 12);
              setPlaceHolder(element.children[1].children[0].children[0], "XXXXXXXXXXXX");
            }
          }
        }
        break;

      case BASE_CODE_COUNTRY.XPA:
        
        const $content = document.querySelector('input[name=ph_companyidentification]');

        //if ($content) {
        //  maskOptions = {
        //    mask: "0000000000"           
        //  };

        //  setOptionsIMask(element.children[1].firstElementChild, maskOptions);
        //  addRuleRange(element.children[1].firstElementChild, 11, 11);
        //  setPlaceHolder(element.children[1].firstElementChild, "XXXXXXXXXXX");
        //}
        break;
      case BASE_CODE_COUNTRY.XPE:
        if (indexStep === 0) {
          maskOptions = {
            mask: "#0000000000",
            definitions: {
              '#': /[12]/
            }
          };

          setOptionsIMask(element.children[1].firstElementChild, maskOptions);
          addRuleRange(element.children[1].firstElementChild, 11, 11);
          setPlaceHolder(element.children[1].firstElementChild, "XXXXXXXXXXX");
        }

        break;
      case BASE_CODE_COUNTRY.XUY:

        if (element.id === "content-Dependency") {
          if (element.children[0].children[0].id.charAt(0) === "4") {
            maskOptions = {
              mask: "000.000.000.000"
            };

            setOptionsIMask(element.children[0].children[0], maskOptions);
            addRuleRange(element.children[0].children[0], 15, 15);
            setPlaceHolder(element.children[0].children[0], "XXX.XXX.XXX.XXX");
          } else {
            maskOptions = {
              mask: "0.000.000-0"
            };

            setOptionsIMask(element.children[0].children[0], maskOptions);
            addRuleRange(element.children[0].children[0], 13, 13);
            setPlaceHolder(element.children[0].children[0], "X.XXX.XXX-X");
          }
        }

        break;
      case BASE_CODE_COUNTRY.XSV:

        break;
      case BASE_CODE_COUNTRY.XCB:

        if (element.id === "content-Dependency") {

          const $label = element.children[0].children[0].name

          if ($label === "ph_companyidentification") {
            maskOptions = {
              mask: "000.000.000-0"
            };

            setOptionsIMask(element.children[0].children[0], maskOptions);
            addRuleRange(element.children[0].children[0], 13, 13);
            setPlaceHolder(element.children[0].children[0], "XXX.XXX.XXX-X");
          }
        }

        break;
    }

  };

  const addRuleRange = (element, max, min) => {
    element.setAttribute("minlength", min);
    element.setAttribute("maxlength", max);
  };

  const setPlaceHolder = (element, placeHoder) => {

    const $label = element.nextElementSibling;
    const titleLabel = $label.dataset.title;
    $label.setAttribute("title", `${titleLabel} (${placeHoder})`);
  };

  const setOptionsIMask = (element, maskOptions) => {
    IMask(element, maskOptions);
  };

  return {
    validateMaskDocument
  };

})();

const fileModule = (() => {

  const getExtensionFile = (fileName) => fileName.split('.').pop();

  return {
    getExtensionFile,
  };

})();

const modal = (() => {

  const openStatement = () => {
    document.getElementById("statement-popup").style.display = "flex";
  };

  const closeStatement = () => {
    document.getElementById("statement-popup").style.display = "none";
  };

  return {
    openStatement,
    closeStatement
  }
})();

