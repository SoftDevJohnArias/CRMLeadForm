
document.addEventListener("DOMContentLoaded", () => {

  const $OrderNumberModal = document.getElementById("OrderNumberModal");
  $OrderNumberModal.addEventListener("click", handleClickViewDetail);
   
  const $btnBackLogDetail = document.getElementById("btnBackLogDetail");
  $btnBackLogDetail.addEventListener("click", handleClickBackDetail);
});


const handleClickViewDetail = async (e) => {
  e.preventDefault();

  const orderNumber = e.target.innerText;
   
  const $bodyDetail = document.getElementById("bodyDetail");
  //has load detail order
  if (!$bodyDetail.hasChildNodes()) {
    try {
      confi.initLoader();
      const { success, messagge, html } = await getOrderDetail(orderNumber);
      confi.stopLoader();
      if (!success) {
        console.error(messagge);
        return;
      }
      $bodyDetail.innerHTML = html;

    }

    catch (e) {
      confi.stopLoader();
    }
  }
  const $titleIdLog = document.getElementById("titleIdLog");
  const $orderContentNumber = document.getElementById("orderContentNumber");

  $titleIdLog.classList.add("d-none");
  $orderContentNumber.classList.remove("d-none");

  $orderContentNumber.querySelector("span").innerText = orderNumber;
  toggleShowDetail(true);

};

const handleClickBackDetail = () => {
  toggleShowDetail(false);

  const $titleIdLog = document.getElementById("titleIdLog");
  const $orderContentNumber = document.getElementById("orderContentNumber");

  $titleIdLog.classList.remove("d-none");
  $orderContentNumber.classList.add("d-none");
};

const toggleShowDetail = (show) => {
  const $ordenDetailFromLog = document.getElementById("ordenDetailFromLog");
  const $logDetail = document.getElementById("logDetail");

  if (show) {
    $logDetail.classList.add("d-none");
    $ordenDetailFromLog.classList.remove("d-none");
  } else {
    $logDetail.classList.remove("d-none");
    $ordenDetailFromLog.classList.add("d-none");
  }
};


const getOrderDetail = async (orderNumber) => {
  const response = await fetch(`/Orders/GetOrderDetailsByOrderNumber?orderNumber=${orderNumber}`, confi.getConfig('GET'));
  return await response.json();
};

const moduleLog = (() => {
  let intersectionObserver = null;

  const initObserverScroll = () => {
    const $observe = document.querySelector('#sentinel');
    intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (document.getElementsByClassName("divconten").length === 0) {
          Filters.PageNumber = null;
        }
        else {
          // Filters.PageNumber = ListLog[ListLog.length - 1].Id;
          Filters.PageNumber = ListLog[ListLog.length - 1].StartTimeStamp;
        }

        getLogsList();
      }
    },
      {
        rootMargin: '0px 0px 20% 0px',
      });

    intersectionObserver.observe($observe);

  };

  const getintersectionObserver = () => {
    return intersectionObserver;
  };

  const GetLogbyOrder = pOrderNumber => {
    SetFiltersByOrder(pOrderNumber);
    LogsItems.innerHTML = "";
    initObserverScroll();
  };

  const SetFiltersByOrder = (pOrderNumber) => {
    Filters.StartDate = new Date(minDate.format('MM-DD-YYYY'));
    Filters.EndDate = new Date();
    Filters.RequestOperation = null;
    Filters.PageNumber = null;
    Filters.PageSize = 80;
    Filters.Text = null;
    FilterSuccess = null;
    Filters.OrderNumber = pOrderNumber;
  };

  return {
    initObserverScroll,
    getintersectionObserver,
    GetLogbyOrder,
    SetFiltersByOrder
  };
})();



var messsage = document.getElementById("messageNoFoundRecords");
var date = new Date();
date.setDate(date.getDate() - 8);

let ListLog = [];

// Initial Filters


const Filters = {
  StartDate: date,
  EndDate: new Date(),
  RequestOperation: null,
  PageNumber: null,
  PageSize: 80,
  Text: null,
  FilterSuccess: null,
  OrderNumber: null
};

var LogsItems = document.querySelector('#LogsItems');

//validamos sin el ingreso se realiza desde el modulo de ordenes
var pathName = window.location.pathname;
if (!pathName.includes('Orders'))
  moduleLog.initObserverScroll();


ApiTypes();

var start = moment().subtract(8, 'days');
var minDate = moment().subtract(90, 'days');
var end = moment();

function ChangeRange(start, end) {
  Filters.StartDate = new Date(start.format('YYYY-MM-DD'));
  Filters.EndDate = new Date(end.format('YYYY-MM-DD'));
  ChengeValues();
}

$('#DateRange').daterangepicker({
  locale: {
    format: "DD-MM-YYYY"
  },
  startDate: start,
  minDate: new Date(minDate.format('MM-DD-YYYY')),
  maxDate: new Date(),
  endDate: end,
  ranges: {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
}, ChangeRange);

function LimpiarElementos() {
  let cupcakes = Array.prototype.slice.call(document.getElementsByClassName("divconten"), 0);
  for (element of cupcakes) {
    element.remove();
  }
}

async function ChengeValues() {
  moduleLog.getintersectionObserver().disconnect();
  LimpiarElementos();
  ListLog = [];
  Filters.Text = document.getElementById("SearchBox").value === '' ? null : document.getElementById("SearchBox").value;
  Filters.RequestOperation = document.getElementById("SelectRequest").value === "" ? null : document.getElementById("SelectRequest").value;
  Filters.FilterSuccess = document.getElementById("Filter").value === "null" ? null : Boolean(parseInt(document.getElementById("Filter").value));
  Filters.PageNumber = null;
  //await getLogsList();
  moduleLog.initObserverScroll();
}

async function getLogsList() {
  confi.initLoader();
  const response = await fetch('/api/GetLogs', confi.getConfig('POST', JSON.stringify(Filters)));

  if (response.status === 200) {
    const responseJson = await response.json();

    ListLog.push(...responseJson.ListResults);
    const Item = responseJson.ListResults.map((data) => (
      ConstruirElemento(data)
    )).join('');

    const htmlVirtual = document.implementation.createHTMLDocument();
    htmlVirtual.body.innerHTML = `<div>${Item}</div>`;

    LogsItems.append(htmlVirtual.body.children[0]);


    if (responseJson.ListResults.length < Filters.PageSize) {
      if (responseJson.ListResults.length === 0)
        messsage.style.display = "block";
      else
        messsage.style.display = "none";

      moduleLog.getintersectionObserver().disconnect();
      //alert("No hay más registros");
    }

  } else {
    confi.Messagge(false, getConfigMessage.strings.General.CargaError);
  }

  confi.stopLoader();
}
function ConstruirElemento(data) {
  return `<div onclick="AsignarValores(this)" data-info='${JSON.stringify(data.Id)}' class="row divconten ${data.Success ? 'alert-success' : 'alert-danger'}">
                <div class="col-md-2"> <div class='row'> <div class='col-md-10'>  ${data.RequestOperation} </div> <div class='col-md-2'>  ${data.HttpMethod}</div> </div> </div >
                <div class="col-md-5">${data.Request.substring(0, 95)}</div>
                <div class="col-md-1">  <div class="row">  ${data.StartTimeStamp.split("T")[0]} </div>   <div class="row">  ${data.StartTimeStamp.split("T")[1]} </div>  </div>
                <div class="col-md-1">  <div class="row">   ${ data.EndTimeStamp.split("T")[0]} </div>   <div class="row">  ${data.EndTimeStamp.split("T")[1]} </div>  </div>
                <div class="col-md-1">${data.ElapsedTime}</div>
                <div class="col-md-2">${StatusHeep.GetHttpStatusCodeNumeric(data.StatusCode) + " " + data.StatusCode}</div>
        </div>`;
}
// Función para Generalizar
function settvalu(propi, value) {
  document.getElementById(propi).innerText = value;
}

function AsignarValores(element) {
  var info = ListLog.find(e => e.Id === parseInt(element.getAttribute("data-info")));
  settvalu("LogIdModal", info.Id);
  settvalu("LogId", info.Id);
  settvalu("DateStartModal", info.StartTimeStamp);
  settvalu("CallIdModal", info.CallId);
  settvalu("DateEndModal", info.EndTimeStamp);
  settvalu("TotalTimeModal", info.ElapsedTime);
  settvalu("HttpMethodModal", info.HttpMethod);
  settvalu("HostModal", info.Host);
  settvalu("ClientIpModal", info.ClientIp);
  settvalu("SuccessModal", info.Success);
  settvalu("StatusCodeModal", StatusHeep.GetHttpStatusCodeNumeric(info.StatusCode) + " " + info.StatusCode);
  settvalu("RequestOperationModal", info.RequestOperation);
  settvalu("RequestUrlModal", info.Request);
  settvalu("OrderNumberModal", info.OrderNumber);

  if (!info.Success) {
    document.getElementById("SuccessModal").style.color = "red";
    document.getElementById("StatusCodeModal").style.color = "red";
    document.getElementById("SuccessModalicon").style.color = "red";
    document.getElementById("SuccessModalicon").className = "icon-ws-ico-min-close";
  }
  else {
    document.getElementById("SuccessModal").style.color = "#3c763d";
    document.getElementById("StatusCodeModal").style.color = "#3c763d";
    document.getElementById("SuccessModalicon").style.color = "#3c763d";
    document.getElementById("SuccessModalicon").className = "icon-ws-ico-min-check";

  }

  if (info.RequestBody === null) {
    document.getElementById("groupRequestBodyModal").style.display = "none";
  }
  else {
    settvalu("RequestBodyModal", info.RequestBody);
  }

  settvalu("ResponseModal", info.Response);
  document.getElementById("bodyDetail").innerHTML = "";
  toggleShowDetail(false);

  const $titleIdLog = document.getElementById("titleIdLog");
  const $orderContentNumber = document.getElementById("orderContentNumber");

  $titleIdLog.classList.remove("d-none");
  $orderContentNumber.classList.add("d-none");
  AbrirModal();
}

function AbrirModal() {
  $("#LogModal").modal();
}
async function ApiTypes() {
  var SelectRequest = document.getElementById("SelectRequest");
  const response = await fetch('/api/GetApiTypes', confi.getConfig('POST'));
  if (response.status === 401) {
    SessionLost();
  }
  if (response.status === 200) {
    const responseJson = await response.json();
    //electRequest.add(document.createElement('option'));
    for (var i = 0; i < responseJson.length; i++) {
      var opt = document.createElement('option');
      opt.value = responseJson[i].ApiName;
      opt.text = responseJson[i].ApiName;
      SelectRequest.add(opt);
    }
  }
}