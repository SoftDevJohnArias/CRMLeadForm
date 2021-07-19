$('[data-toggle="tooltip"]').tooltip();


//contentLog.className="d-none";
///Intersetion observer


const ordersModule = (() => {
    let intersectionObserver = null;

    const initObserverScroll = () => {

        const $observe = document.getElementById('observe');
        intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {


                GetOrders();
                page++;

            }
        },
            {
                rootMargin: '0px 0px 100% 0px',
            });

        intersectionObserver.observe($observe);


    };


    const getintersectionObserver = () => {
        return intersectionObserver;
    };

    const clearOrders = () => {
        intersectionObserver.disconnect();
        ltLoadOrder = [];
        const orders = document.getElementById("Orders");
        orders.innerHTML = "";
    };

    return {
        initObserverScroll,
        clearOrders,
        getintersectionObserver,

    };

})();


//Obtenemos las ordenes

var ltLoadOrder = [];
ordersModule.initObserverScroll();

var orderHub = $.connection.orderHub;

var fecha = new Date();
var fechaInitial = new Date();
var fechaLinkLog = new Date();
fechaLinkLog.setDate(fechaLinkLog.getDate() - 90);

fechaInitial.setDate(fechaInitial.getDate() - 8);


var starDate = myDateFormatter(fechaInitial);
var endDate = myDateFormatter(fecha);
var optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };


$('input[name="daterange"]').daterangepicker({
  locale: {
    format: "DD-MM-YYYY"
  },

  startDate: start,
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
}, function (start, end, label) {

    starDate = start.format('YYYY-MM-DD');
    endDate = end.format('YYYY-MM-DD');
    ordersModule.clearOrders();
    ordersModule.initObserverScroll();
    page = 1;
    //GetOrders();

});

$('#DateRange').data('daterangepicker').setStartDate(fechaInitial);
$('#DateRange').data('daterangepicker').setEndDate(fecha);

//var fechas = $('#DateRange').data('daterangepicker');


var orders;

//Pagination
var page = 1;
var pagesize = 20;
var RecordsOf = document.getElementById("RecordsOf");


Initialize();


function Initialize() {

    LoadComboStatus();
    //GetOrders();

    $('#Status').change(changeStatus);

    //Boton descargar excel
    $("#Download").click(function () {
        DownloadExcel();
    });


    //Boton FulltextSearch
    $("#btnFullTextSearch").click(function () {
        ordersModule.clearOrders();
        ordersModule.initObserverScroll();
        page = 1;
        //GetOrders();
    });


    //Boton cancel filtro ordenes modal
    $("#CancelOrders").click(function () {

        document.getElementById("searchOrdersFilter").value = "";


    });
    //Boton agregar filtro ordenes modal
    $("#AddOrders").click(function () {
        page = 1;
        ordersModule.clearOrders();
        ordersModule.initObserverScroll();
    });




    //Boton close filtro ordenes modal
    //$("#CloseSearchOrderModal").click(function () {
    //    document.getElementById("searchOrdersFilter").value = "";
    //});



}



function GetOrders() {
    confi.initLoader();
    pagesize = 20;
    var totalHomeMin = $('#Min').val();
    var totalHomeMax = $('#Max').val();
  var SearchOrdersFilter = "";
  var StatusOrder = $('#Status option:selected:not(:first-child)').html();
    var FulltextSearch = $('#fulltextSearch').val();
    if (FulltextSearch.includes(",")) {
        var arreglo = FulltextSearch.split(",");
        var arrdis = [...new Set(arreglo)];
        SearchOrdersFilter = arrdis.join();
        FulltextSearch = "";
    }
    var data = {
        StartDate: starDate, EndDate: endDate, OrderNumbers: SearchOrdersFilter, StatusDescription: StatusOrder,
        TotalHomeMin: totalHomeMin, TotalHomeMax: totalHomeMax, FulltextSearch: FulltextSearch, PageNumber: page, PageSize: pagesize, TotalRegistros: 0
    };

    var miInit = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };

    fetch('/api/getorderscustomer', miInit)
        .then(
            function (response) {
                if (response.status < 200 || response.status > 299) {
                   
                    return Promise.reject(response.json());
                }
                else {
                    return response.json();
                }

            })
        .then(function (myJson) {
            confi.stopLoader();
            var messsageAlert = document.getElementById("messsageAlert");
            if (myJson.ListResults.length > 0) {
                orders = myJson.ListResults;
                messsageAlert.style.display = "none";
                for (var i = 0; i < myJson.ListResults.length; i++) {

                    CreateElementOrder(`${myJson.ListResults[i].OrderNumber}-${myJson.ListResults[i].CompanyId}`, myJson.ListResults[i]);
                }

                ltLoadOrder.push(...myJson.ListResults);

                if (ltLoadOrder.length === myJson.TotalResults) {

                    ordersModule.getintersectionObserver().disconnect();
                }


                //conexion signal r para cargar cuerpo de las ordenes
                ConnectionSignalR();
            }
            else {
                messsageAlert.style.display = "block";
                const aFilter = document.getElementById('aFilter');
                if (aFilter.classList.contains("icon-ws-ico-min-down")) {
                    aFilter.click();
                }
            }

        }).catch((error) => confi.stopLoader());

}

function LoadComboStatus() {
    var miInit = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify()
    };

    fetch('/api/getorderstatus', miInit)
        .then(
            function (response) {
                if (response.status < 200 || response.status > 299) {

                    return Promise.reject(response.json());
                }
                else {
                    return response.json();
                }

            })
        .then(function (myJson) {

            var select = document.getElementById("Status");
            //select.options[0] = new Option("", "");
            for (var i = 0; i < myJson.ListResults.length; i++) {
                select.options[i + 1] = new Option(myJson.ListResults[i].StatusDescription, myJson.ListResults[i].StatusCode);
            }

        });
}



function CreateElementOrder(numElement, Order) {

    //div aaccordion
    var fatherAccordion = document.getElementById('Orders');
    var divAccordion = document.createElement('div');
    divAccordion.id = 'divAccordion_' + numElement;
    divAccordion.setAttribute("style", "padding:0px 0px 12px 0px");
    fatherAccordion.appendChild(divAccordion);

    //div card
    var fatherCard = document.getElementById(divAccordion.id);
    var divCard = document.createElement('div');
    divCard.id = 'divCard_' + numElement;
    divCard.setAttribute("class", "card");
    divCard.classList.add("section-order");
    fatherCard.appendChild(divCard);

    //div card-header
    var fatherCardHeader = document.getElementById(divCard.id);
    var divCardheader = document.createElement('div');
    divCardheader.id = 'divCardheader_' + numElement;
    divCardheader.setAttribute("class", "card-header");
    fatherCardHeader.appendChild(divCardheader);

    //div row
    var fatherRow1 = document.getElementById(divCardheader.id);
    var divRow1 = document.createElement('div');
    divRow1.id = 'divRow1_' + numElement;
    divRow1.setAttribute("class", "row");
    fatherRow1.appendChild(divRow1);

    //div 1 col-md
    var fatherColsRow1 = document.getElementById(divRow1.id);
    var divCol1 = document.createElement('div');
    divCol1.id = 'divCol1_' + numElement;
    divCol1.setAttribute("class", "col-md-6");
    fatherColsRow1.appendChild(divCol1);

    //H6
    var elmH6 = document.getElementById(divCol1.id);
    var elementH6 = document.createElement('h6');
    elementH6.id = 'elmH4_' + Order.OrderNumber;
    elmH6.appendChild(elementH6);

    var elmA = document.getElementById(elementH6.id);
    var elementA = document.createElement('a');
    elementA.setAttribute("data-toggle", "collapse");
    elementA.setAttribute("data-target", "#collapse_" + numElement);
    elementA.id = 'elmA' + numElement;
    elementA.classList.add("link-order");

    elmA.appendChild(elementA);

    var contentElmA = document.createTextNode(`${getConfigMessage.strings.Order.order} # ${Order.OrderNumber}`);

    elementA.appendChild(contentElmA);


    //dic col-md customerOrder
    var divcustomerOrderlabel = document.createElement('b');
    divcustomerOrderlabel.id = 'divcustomerOrderlabel_' + numElement;
    divcustomerOrderlabel.setAttribute("class", "col-md-3");
    fatherColsRow1.appendChild(divcustomerOrderlabel);


    if (Order.CustomerOrderNumber) {
        var contentCustomerOrderLabel = document.createTextNode(getConfigMessage.strings.Order.OrderCustomer);
        divcustomerOrderlabel.appendChild(contentCustomerOrderLabel);
    }
    //Estado
    var statusCode = Order.StatusCode;

    var divTag = document.createElement('div');
    divTag.id = 'divTag' + numElement;
    divTag.setAttribute("class", `${statusCode === '5' ? '' : 'offset-md-1'} col-md-1`);
    fatherColsRow1.appendChild(divTag);



    if (Order.Tag !== null) {

        var fatherspantag = document.getElementById(divTag.id);

        var spanTag = document.createElement('span');
        spanTag.id = 'spanTag' + numElement;
        spanTag.setAttribute("class", "  section-tag");
        fatherspantag.appendChild(spanTag);


        var contentTag = document.createTextNode(Order.Tag);
        spanTag.appendChild(contentTag);
    }

    //div 3 col-md
    var divCol2 = document.createElement('div');
    divCol2.id = 'divCol12_' + numElement;
    divCol2.setAttribute("class", ` ${statusCode === '5' ? 'col-md-2' : 'col-md-1'} text-center`);
    fatherColsRow1.appendChild(divCol2);


    var classStatus = "";

    if (statusCode === "1" || statusCode === "2" || statusCode === "3" || statusCode === "4") {
        classStatus = "statusPending";
    }
    else if (statusCode === "5") {
        classStatus = "statusSucces";
    }
    else if (statusCode === "6") {
        classStatus = "statusClose";
    }


    var fatheDivStatus = document.getElementById(divCol2.id);
    var divStatus = document.createElement('div');
    divStatus.setAttribute("class", classStatus);
    divStatus.id = 'divStatus_' + numElement;
    fatheDivStatus.appendChild(divStatus);

    var fatheDivfont = document.getElementById(divStatus.id);
    var font = document.createElement('font');
    //font.setAttribute("size", "2");
    font.id = 'font' + numElement;
    fatheDivfont.appendChild(font);

    var fatheDivStro = document.getElementById(font.id);
    var elementoStrong = document.createElement('span');
    elementoStrong.id = 'Id' + numElement;
    fatheDivStro.appendChild(elementoStrong);

    var contentStrong = document.createTextNode(Order.StatusDescription);
    elementoStrong.appendChild(contentStrong);

    //Fecha
    var divRow2 = document.createElement('div');
    divRow2.id = 'divRow2_' + numElement;
    divRow2.setAttribute("class", "row");
    fatherRow1.appendChild(divRow2);

    var fatherRow2 = document.getElementById(divRow2.id);

    var elementDate = document.createElement('div');
    //elementDate.setAttribute("style", "font-size:13px");
    elementDate.id = 'elementDate_' + numElement;
    elementDate.setAttribute("class", "col-md-6 text-label-order");
    fatherRow2.appendChild(elementDate);

    var contentDate = document.createTextNode(getConfigMessage.strings.Order.RealizadaEn + ', ');
    elementDate.appendChild(contentDate);

    var lvalueDate = document.createElement('label');
    lvalueDate.id = 'lvalueDate_' + numElement;
    elementDate.appendChild(lvalueDate);


    var date = new Date(Order.OrderDate);
    var valueLbl = document.createTextNode(date.toLocaleDateString(getConfigMessage.scope.Localizacion, optionsDate));
    lvalueDate.appendChild(valueLbl);

    //order customer
    var divcustomerOrder = document.createElement('div');
    divcustomerOrder.id = 'divcustomerOrder_' + numElement;
    divcustomerOrder.setAttribute("class", "col-md-3");
    fatherRow2.appendChild(divcustomerOrder);

    var FatherelemCustomCustomer = document.getElementById(divcustomerOrder.id);
    var elemCustomCustomer = document.createElement('label');
    FatherelemCustomCustomer.appendChild(elemCustomCustomer);

    var contentCustomerOrder = document.createTextNode(Order.CustomerOrderNumber);
    elemCustomCustomer.appendChild(contentCustomerOrder);

    //cantidad productos
    var elementCountProducts = document.createElement('div');
    //elementCountProducts.setAttribute("style", "font-size:13px");
    elementCountProducts.id = 'CountProducts_' + Order.OrderNumber;
    fatherRow1.appendChild(elementCountProducts);

    //Collapse 
    var elementCollapse = document.createElement('div');
    elementCollapse.setAttribute("class", "collapse");
    elementCollapse.id = 'collapse_' + numElement;
    fatherCardHeader.appendChild(elementCollapse);

    //card body
    var fatheDivBody = document.getElementById(elementCollapse.id);
    var elementCardBody = document.createElement('div');
    elementCardBody.setAttribute("class", "card-body");
    elementCardBody.setAttribute("style", "font-size:14px");
    elementCardBody.id = Order.OrderNumber;
    fatheDivBody.appendChild(elementCardBody);


    // footer fatherCard
    var divCardFooter = document.createElement('div');
    divCardFooter.id = 'divCardFooter_' + numElement;
    divCardFooter.setAttribute("class", "card");
    fatherCard.appendChild(divCardFooter);

    //div card-header
    var fatherCardHeaderFooter = document.getElementById(divCardFooter.id);
    var divCardheaderFooter = document.createElement('div');
    divCardheaderFooter.id = 'divCardheaderFooter_' + numElement;
    divCardheaderFooter.setAttribute("class", "card-header");
    fatherCardHeaderFooter.appendChild(divCardheaderFooter);

    //div row
    var fatherRowFooter = document.getElementById(divCardheaderFooter.id);
    var divRowFooter = document.createElement('div');
    divRowFooter.id = 'divRowFooter_' + numElement;
    divRowFooter.setAttribute("class", "row");
    fatherRowFooter.appendChild(divRowFooter);

    //col 1
    var fatherColsFooter = document.getElementById(divRowFooter.id);
    var divCol1Footer = document.createElement('div');
    divCol1Footer.id = 'divCol1Footer_' + numElement;
    divCol1Footer.setAttribute("class", "col-md-10");
    //divCol1Footer.setAttribute("style", "font-size:14px");
    fatherColsFooter.appendChild(divCol1Footer);

    var fatherContentFooter = document.getElementById(divCol1Footer.id);
    var contentFooter = document.createTextNode('Total: ');
    fatherContentFooter.appendChild(contentFooter);


    var elementLbLValueFooter = document.createElement('b');
    elementLbLValueFooter.id = 'elementLbLValueFooter_' + numElement;
    elementLbLValueFooter.setAttribute("style", "color:green");
    fatherContentFooter.appendChild(elementLbLValueFooter);

    var valueLblFooter = document.createTextNode(Order.CurrencySymbol + ' ' + Order.TotalUs.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    elementLbLValueFooter.appendChild(valueLblFooter);



    //view log
    let f = new Date(Order.OrderDate);
    var divCol2Footer = document.createElement('div');
    divCol2Footer.id = 'divCol2Footer_' + numElement;

    if (f >= fechaLinkLog) {
    var divColLogFooter = document.createElement('div');
    divColLogFooter.id = 'divColLogFooter_' + numElement;
    divColLogFooter.setAttribute("class", "col-md-1 text-right");
    fatherColsFooter.appendChild(divColLogFooter);


    var fatherViewlog = document.getElementById(divColLogFooter.id);
    var elementViewLog = document.createElement('a');
    elementViewLog.setAttribute("href", '#');
    elementViewLog.setAttribute("onclick", 'viewLog(' + Order.OrderNumber + ');');
    elementViewLog.id = 'alogs';
    fatherViewlog.appendChild(elementViewLog);

        var contentTextlog = document.createTextNode(getConfigMessage.strings.Order.VerLog);
    elementViewLog.appendChild(contentTextlog);

    divCol2Footer.setAttribute("class", "col-md-1 text-right");

    }
    else
    divCol2Footer.setAttribute("class", "col-md-2 text-right");
    //View detail
   
    
    fatherColsFooter.appendChild(divCol2Footer);

    var fatherViewDet = document.getElementById(divCol2Footer.id);
    var elementViewDetail = document.createElement('a');
    elementViewDetail.setAttribute("href", '#');
    elementViewDetail.setAttribute("onclick", 'GetOrderDetails(' + JSON.stringify(Order) + '); return false;');
    elementViewDetail.setAttribute("data-toggle", 'modal');
    elementViewDetail.setAttribute("data-target", '#ModalOrderDetails');
    elementViewDetail.setAttribute("class", 'icon-iws-folder');
    elementViewDetail.id = 'aDetails';
    fatherViewDet.appendChild(elementViewDetail);


    var contentTextV = document.createTextNode(getConfigMessage.strings.Order.Detalle);
    elementViewDetail.appendChild(contentTextV);
}

function viewLog(OrderNumber) {
    document.getElementById("ContentOrders").style.display = 'none';
    document.getElementById("ContentLog").style.display = 'block';
    moduleLog.GetLogbyOrder(OrderNumber);
}



function CreateOrderBody(OrderBody, OrderNumber) {

    var orderDiv = OrderNumber;
    for (var i = 0; i < OrderBody.ListResults.length; i++) {


        //var orderDiv = OrderBody.ListResults[i].OrderNumber;
        //Desc
        var labelDesc = document.getElementById(orderDiv);
        var elementLabelDesc = document.createElement('div');
        elementLabelDesc.id = 'labelDesc_' + i + '_' + orderDiv;
        labelDesc.appendChild(elementLabelDesc);


        var fatherDesc = document.getElementById(elementLabelDesc.id);
        var elementDesc = document.createElement('b');
        elementDesc.id = 'elementDesc_' + i;
        fatherDesc.appendChild(elementDesc);

        //var fatherContentDesc = document.getElementById(elementDesc.id);
        var valueDesc = document.createTextNode(OrderBody.ListResults[i].Description);
        elementDesc.appendChild(valueDesc);


        //Valor
        var labelValuePr = document.getElementById(orderDiv);
        var elementLbLValuePr = document.createElement('div');
        elementLbLValuePr.id = 'elementLbLValuePr_' + i;
        elementLbLValuePr.setAttribute("style", "color:green");
        labelValuePr.appendChild(elementLbLValuePr);

      var valueLblPr = document.createTextNode('$' + OrderBody.ListResults[i].ExtendedPriceUs.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      elementLbLValuePr.appendChild(valueLblPr);

        //Quantity
        var divBodyContent = document.getElementById(orderDiv);
        var elementBodyContent = document.createElement('div');
        elementBodyContent.id = 'BodyContent_' + i;
        divBodyContent.appendChild(elementBodyContent);

        var bodyValue = document.createTextNode(OrderBody.ListResults[i].Quantity + ' ' + getConfigMessage.strings.Order.Unidad + '(s)');
        elementBodyContent.appendChild(bodyValue);


        //BR
        if (i + 1 !== OrderBody.ListResults.length) {
            var elementBR = document.createElement('BR');
            divBodyContent.appendChild(elementBR);
        }

        //Cantidad productos heading
        if (i === 0) {
            var divCountProducts = document.getElementById('CountProducts_' + orderDiv);
            var elementCount = document.createElement('label');
            divCountProducts.appendChild(elementCount);

            var ValueCountPr = document.createTextNode(OrderBody.TotalResults + ' ' + getConfigMessage.strings.Order.product + '(s)');
            elementCount.appendChild(ValueCountPr);
        }

    }
    if (OrderBody.ListResults.length === 0) {
        var divCountProductsEmpty = document.getElementById('CountProducts_' + orderDiv);
        var elementCountEmpty = document.createElement('label');
        divCountProductsEmpty.appendChild(elementCountEmpty);


        var ValueCountPrEmpty = document.createTextNode(0 + ' ' + getConfigMessage.strings.Order.product + '(s)');
        elementCountEmpty.appendChild(ValueCountPrEmpty);

    }
    else {
        //const divHeader = document.querySelector('#divCardheader_94443-XTE .link-order');
        const divHeader = document.querySelector(`#elmH4_${orderDiv} .link-order`);
        divHeader.click();
    }


}

function ConnectionSignalR() {

    //$.connection.hub.url = "http://localhost:44346/signalr";
    //var orderHub = $.connection.orderHub;      
    //$.connection.hub.start().done();
    $.connection.hub.start().done(function () {

        //alert('open');
        orderHub.server.getOrderBody(orders);
        //GetOrders();

    });
}

orderHub.client.viewOrderBody = function (OrderBodyResult, OrderNumber) {
    CreateOrderBody(OrderBodyResult, OrderNumber);
    //console.log(OrderBodyResult);
};

function changeStatus() {

    page = 1;
    ordersModule.clearOrders();
    ordersModule.initObserverScroll();
}

function changeNumPagination() {

    page = 1;
    GetOrders();
}

function PaginationClick(numPage) {

    page = numPage;
    GetOrders();
}


function ClearOrders() {

    ordersModule.getintersectionObserver().disconnect();
    var element = document.getElementById("Orders");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function DownloadExcel() {

    var SearchOrdersFilter = "";
    var FulltextSearch = $('#fulltextSearch').val();
    if (FulltextSearch.includes(",")) {
        SearchOrdersFilter = FulltextSearch;
        FulltextSearch = "";
    }

    var ordersCustomerRequest =
    {
        StartDate: starDate,
        EndDate: endDate,
        OrderNumbers: SearchOrdersFilter,
        StatusDescription: $('#Status').val(),
        TotalHomeMin: $('#Min').val(),
        TotalHomeMax: $('#Max').val(),
        PageNumber: 1,
        PageSize: ltLoadOrder.length,
        FulltextSearch: FulltextSearch,
        TotalRegistros: 0,
        AllPages: false

    };

    Download(ordersCustomerRequest);
}

function GetData() {
    var PageNumber = page;
    if (PageNumber === 0 || PageNumber === null) {
        PageNumber = 1;
    }
    var PageSize = pagesize;
    RecordsOf.innerText = PageNumber * PageSize - PageSize + "-" + PageNumber * PageSize;

}

function myDateFormatter(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    var date = year + "-" + month + "-" + day;

    return date;
}

//});

function changeIcon() {

  var aFilter = document.getElementById('aFilter');
  var elementClass = aFilter.classList[0];

  if (elementClass === 'icon-ws-ico-min-down')
    aFilter.className = "icon-ws-ico-min-up";
  else
    aFilter.className = "icon-ws-ico-min-down";
}

document.getElementById("returnOrders").addEventListener('click', function () {
    document.getElementById("ContentOrders").style.display = 'block';
    document.getElementById("ContentLog").style.display = 'none';
});

