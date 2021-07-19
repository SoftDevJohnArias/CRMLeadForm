document.addEventListener("DOMContentLoaded", () => {

  const $formProcessToken = document.getElementById("formProcessToken");
  validateForm.init($formProcessToken);
  $formProcessToken.addEventListener("submit", handleClickCheckStatus);

  const $btnDowload = document.getElementById("btnDowload");
  $btnDowload.addEventListener("click", handleClickDownloadFileTokens);

  const $listTokens = document.getElementById("listTokens");
  $listTokens.addEventListener("paste", handlePaste, false);
  $listTokens.addEventListener("focus", handleFocusTextArea);

  Pagination.onClickPage = handleChangePage;
});


///MODULES
const processTokenModule = (() => {

  let tokensProcessed = [];
  let newTokens = [];
  const tokenStatusHub = $.connection.tokenStatusHub;

  const conectionSignalRSendTokens = (arrayTokens) => {
    newTokens = arrayTokens;
    $.connection.hub.start().done(() => {
      tokenStatusHub.server.getTokenStatus(arrayTokens);
    });
    $.connection.hub.disconnected(function () {
      setTimeout(function () {
        console.log("disconect signal R")
        $.connection.hub.start();
      }, 5000); // Restart connection after 5 seconds.
    });
  };
  tokenStatusHub.client.callbackGetTokenStatus = (resultStatusToken, tokenValue, error) => {
    if (error) {
      console.error(error);
      return;
    }
    ///set token avlue if error to proccessed
    if (resultStatusToken.ExceptionMessage) {
      resultStatusToken.ProductKey = tokenValue;
      resultStatusToken.Status = resultStatusToken.ExceptionMessage;
    }

    ///vakidate dates
    const { scope: { Localizacion } } = getConfigMessage;
    resultStatusToken.RedemptionDate = resultStatusToken.RedemptionDate ?
      new Date(resultStatusToken.RedemptionDate).toLocaleString(Localizacion, confi.optionsDate) : '';

    resultStatusToken.LastStatusUpdate = resultStatusToken.LastStatusUpdate ?
      new Date(resultStatusToken.LastStatusUpdate).toLocaleString(Localizacion, confi.optionsDate) : '';
    //emd validate dates

    tokensProcessed.push(resultStatusToken);
    progressBar.increment(newTokens.length, tokensProcessed.length);
    Pagination.Init(tokensProcessed.length);
    const perPage = parseInt(Pagination.getPageSize());
    if (tokensProcessed.length <= perPage && resultStatusToken) {
      addRowToTable(resultStatusToken);
    }

    //finish processed
    if (newTokens.length === tokensProcessed.length) {
      setLoaderButtonCheckStatus(false);
      tooglePaginatorDisabled();
    }
    /////re try process tokens 
    //if (tokensFailed.length > 0) {
    //  ///diference
    //  if ((tokensFailed.length - tokensProcessed.length) === 0) {
    //    conectionSignalRSendTokens(tokensFailed);
    //  }
    //}
  };

  const setLoaderButtonCheckStatus = (isLoader) => {
    const $button = document.getElementById("btnCheckStatus");
    const $icon = $button.querySelector("i");
    const $btnDowload = document.getElementById("btnDowload");

    if (isLoader) {
      $icon.classList.remove("icon-ws-ico-min-search");
      $icon.classList.add("fa", "fa-spinner", "fa-spin");
      $button.classList.add("btn-disabled");
      $btnDowload.classList.add("btn-disabled");
    } else {
      $icon.classList.add("icon-ws-ico-min-search");
      $icon.classList.remove("fa", "fa-spinner", "fa-spin");
      $button.classList.remove("btn-disabled");
      $btnDowload.classList.remove("btn-disabled");
    }
  };

  const showContentProgressBar = () => {
    const $contentProgressBar = document.getElementById("contentProgressBar");

    if ($contentProgressBar.classList.contains("d-none")) {
      $contentProgressBar.classList.remove("d-none");
      $contentProgressBar.classList.add("fade-animation");

    }
  };

  const getTableTokensElemnet = () => document.getElementById("tableTokens").querySelector("tbody");

  const tooglePaginatorDisabled = () => {
    document.querySelector(".section-paginate-tokens").classList.toggle("element-disabled");

  };

  const addRowToTable = (tokenData) => {

    const {
      ProductKey,
      ExceptionMessage,
      StatusDescription,
      RedemptionDate,
      LastStatusUpdate
    } = tokenData;

    const trRow = `<tr class="${ExceptionMessage && "hass-error-token"}" >
                    <td>${ProductKey || ''}</td>
                    <td>${ExceptionMessage || tokenData.Status || ''}</td>
                    <td>${StatusDescription || ''}</td>
                    <td>${RedemptionDate}</td>
                    <td>${LastStatusUpdate}</td>
                   </tr>`;

    getTableTokensElemnet().innerHTML += trRow;
  };

  geTokensProcessed = () => tokensProcessed;
  resetTokensProcessed = () => {
    tokensProcessed = [];
  };

  const buildPaginatorData = (currentPage = 1) => {
    
    const perPage = parseInt(Pagination.getPageSize());
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentTokensData = tokensProcessed.slice(indexOfFirstPost, indexOfLastPost);
    currentTokensData.forEach(tokenData => {
      addRowToTable(tokenData);
    });
  };


  return {
    conectionSignalRSendTokens,
    setLoaderButtonCheckStatus,
    showContentProgressBar,
    getTableTokensElemnet,
    geTokensProcessed,
    resetTokensProcessed,
    buildPaginatorData,
    tooglePaginatorDisabled
  };
})();

/////EVENTS

const handleClickCheckStatus = (e) => {
  e.preventDefault();
  const validationForm = validateForm.getValidation();
  if (validationForm.checkValidFields()) {
    const { listTokens } = validationForm.getValues();
    processTokenModule.setLoaderButtonCheckStatus(true);
    processTokenModule.resetTokensProcessed();
    progressBar.reset();
    processTokenModule.showContentProgressBar();
    processTokenModule.tooglePaginatorDisabled();
    processTokenModule.getTableTokensElemnet().innerHTML = '';
    const tokens = [... new Set(listTokens.split('\n'))].filter(token => token);
    processTokenModule.conectionSignalRSendTokens(tokens);
  }

};

const handleClickDownloadFileTokens = () => {
  const tokens = processTokenModule.geTokensProcessed();
  const resultTokenErrors = tokens
    .filter((token) => token.ExceptionMessage).map((item) => (
      `"${[tokens.indexOf(item)]}": {
        "style": {
          "Font": {
            "Color": "#721c24"
          },
          "Interior": {
            "Color": "#f8d7da",
            "Pattern": "Solid"
          }
        }
      }`
    ));


  const style = {
    headers: true,
    column: { style: { Font: { Bold: "1" } } },
    rows: JSON.parse(`{${resultTokenErrors.join()}}`)

  };
  const { productKey,
    status,
    descriptionStatus,
    activationDate,
    expirationDate } = getConfigMessage.strings.adminTokens;


  alasql.promise(`SELECT ProductKey As [${productKey}],
                        REPLACE(Status,'null', '') As [${status}],
                        REPLACE(StatusDescription,'null','') As [${descriptionStatus}],
                        REPLACE(RedemptionDate ,'null','') As [${activationDate}],
                        REPLACE(LastStatusUpdate,'null','') As [${expirationDate}]
                        INTO XLSXML("CheckedTokens${new Date().toLocaleString()}.xls",?) FROM ?`,
    [style, tokens])
    .then(function (data) {
      console.log('Data saved');
    }).catch(function (err) {
      console.log('Error:', err);
    });
};

const handlePaste = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.value = e.clipboardData.getData('Text').replace(/^\s+|\s+$/g, '');
};

const handleFocusTextArea = (e) => {
  e.target.value = e.target.value.trim();
};

const handleChangePage = (perPage, page) => {
  processTokenModule.getTableTokensElemnet().innerHTML = '';
  processTokenModule.buildPaginatorData(page);
}