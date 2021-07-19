var currentPages = 1;

let paramsData = {
  PageSize: 12,// document.querySelector("#listPageSize li").value,
  TotalRecords: 0,
  numPages: 0
};

const labelDe = 'de';//getConfigMessage.strings.Paginator.De;

const Pagination = (() => {

  const paginator = document.getElementById("pagination");

  const labelRecords = 'resultados';//getConfigMessage.strings.CommonMistakes.Records;


  const Init = (ptotalRecords, perPage = 10, page = 1) => {
    currentPages = page;
    paramsData.TotalRecords = ptotalRecords;
    paramsData.PageSize = perPage;
    paramsData.numPages = Math.ceil(ptotalRecords / paramsData.PageSize);
    Create(paginator, paramsData);
  };

  const Next = () => {

    if (currentPages < paramsData.numPages) {
      currentPages = currentPages + 1;

      if (paginator) {
        currentPage(currentPages);
        generateItems(paramsData, currentPages);
        Pagination.onClickPage(getPageSize(), currentPages);
      }

      setInfoPagination(paramsData, currentPages);
    }
  };

  const Prev = () => {

    if (currentPages > 1) {

      currentPages = currentPages - 1;
      currentPage(currentPages);
      generateItems(paramsData, currentPages);
      setInfoPagination(paramsData, currentPages);
      Pagination.onClickPage(getPageSize(), currentPages);
    }
  };

  const Click = page => {

  };

  const currentPage = page => {

    if (paramsData.TotalRecords > 0) {
      let pagePrev = document.querySelector("#pagination div");
      let pageNext = document.querySelector(".icon-next");

      if ((page == 1) && (1 == paramsData.numPages)) {
        pagePrev.classList.add("page-click-icon-desactiv");
        pageNext.classList.add("page-click-icon-desactiv");
      }
      else if (page == 1) {
        pagePrev.classList.add("page-click-icon-desactiv");
      } else if (page == paramsData.numPages) {

        pageNext.classList.add("page-click-icon-desactiv");
      }
      else {
        pagePrev.classList.remove("page-click-icon-desactiv");
        pageNext.classList.remove("page-click-icon-desactiv");
      }
    }

  };

  const setInfoPagination = (data, page) => {

    let pages = Math.floor(data.TotalRecords / data.PageSize);
    let msg = '';
    page = parseInt(page);
    if (page <= pages) {

      if (page === 1)
        msg = `<span>${getConfigMessage.strings.Paginator.Showing} </span>
                <span class="info-items-page">
                  ${page} ${getConfigMessage.strings.Paginator.To} ${data.PageSize}
                </span> 
                  <span>
                  ${getConfigMessage.strings.Paginator.Out} ${getConfigMessage.strings.Paginator.De} 
                  ${data.TotalRecords} ${getConfigMessage.strings.Paginator.Items}
                </span>`;
      else {
        let item = page * data.PageSize - data.PageSize + 1;
        msg = `<span> ${getConfigMessage.strings.Paginator.Showing}</span>  <span class="info-items-page">${paginator ? item : 1} ${getConfigMessage.strings.Paginator.To} ${page * data.PageSize} </span>  <span>${getConfigMessage.strings.Paginator.Out} ${getConfigMessage.strings.Paginator.De} ${data.TotalRecords} ${getConfigMessage.strings.Paginator.Items} </span>`;
      }
    }
    else {
      let item = page * data.PageSize - data.PageSize + 1;
      let difItems = data.TotalRecords - (pages * data.PageSize) + item - 1;
      msg = `<span> ${getConfigMessage.strings.Paginator.Showing}</span><span class="info-items-page"> ${paginator ? item : 1} ${getConfigMessage.strings.Paginator.To} ${difItems}</span>  <span>${getConfigMessage.strings.Paginator.Out} ${getConfigMessage.strings.Paginator.De} ${data.TotalRecords} ${getConfigMessage.strings.Paginator.Items}</span>`;
    }

    let divInfo = document.getElementsByClassName("infoPagination");
    //divInfo.forEach((element) => { element.innerHTML = msg });
    divInfo[0].innerHTML = msg;
    if (divInfo[1]) {

      divInfo[1].innerHTML = msg;
    }
  };

  const Buttons = (data) => {
    if (data.TotalRecords > 0) {
      //events page
      var nav = paginator.getElementsByTagName('div');
      nav[0].addEventListener('click', Pagination.Prev, false);
      nav[1].addEventListener('click', Pagination.Next, false);

      //document.getElementById("pagesItems").addEventListener('click', function (e) {
      //  if (e.target.tagName === "A")
      //    Pagination.Click(e.target.text);
      //});
    }
  };

  const generateItems = (data, pagecurrent) => {
    let code = '';

    if (data.TotalRecords > 0) {

      let pages = paramsData.numPages;
      pagecurrent = parseInt(pagecurrent);
      let items = 3;

      code += `<a>${getConfigMessage.strings.Paginator.Page} ${pagecurrent}</a><span style="margin-left:3px;margin-right:3px;">${getConfigMessage.strings.Paginator.De}</span><a>${pages}</a>`;

      Pagination.pages.innerHTML = code;
    }
  };

  const Create = (pHTML, data) => {

    var html = [];
    //let divSelect = document.querySelector("#pageSizeSelect");
    let divInfoPage = document.getElementsByClassName("infoPagination");//document.querySelector("#infoPagination");
    if (data.TotalRecords > 0) {
      html = [
        //'<a class="icon-ws-ico-min-left" style="font-size:14px;padding-left:30px"></a>',
        '<div class="page-click-icon"><i class="icon-ws-ico-min-left"></i></div>',
        '<span id="pagesItems"></span>',
        '<div class="page-click-icon icon-next"><i class="icon-ws-ico-min-rigth"></i></div>'
      ];
      //divSelect.style.display = "block";
      divInfoPage[0].style.display = "flex";

      if (divInfoPage[1]) {

        divInfoPage[1].style.display = "flex";
      }
      //divInfoPage.style.display = "block";

      Pagination.page = currentPages;
      if (paginator) {
        paginator.innerHTML = html.join('');
        Pagination.pages = paginator.getElementsByTagName('span')[0];
        Buttons(data);

        generateItems(data, Pagination.page);
        currentPage(Pagination.page);
      }

      setInfoPagination(data, Pagination.page);
    }
    else {

      html = [];
      paginator.innerHTML = html.join('');
      //divSelect.style.display = "none";
      divInfoPage[0].style.display = "none";
      divInfoPage[1].style.display = "none";
    }

  };

  const getPageSize = () => paramsData.PageSize;
  const getTotalRecords = () => paramsData.TotalRecords;

  return {
    Init, Click, Prev, Next, getPageSize, getTotalRecords
  };

})();
