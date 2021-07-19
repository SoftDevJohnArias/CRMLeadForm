var newsId = 0;
$(function () {


    var optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var showControls = "none";
    var message = "";
    var isAministradorNews;

    ///Intersetion observer
    var page = 1;
    var pagesize = 20;
    const $observe = document.getElementById('observe');
    var ltLoadNews = [];

    validateAdminsitrator();

    function Initialize() {



        //LoadNews();

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {

                LoadNews();
                page++;
            }
        },
            {
                rootMargin: '0px 0px 100% 0px'
            });

        intersectionObserver.observe($observe);

        $("#addNews").click(function () {

            ClearCreateModal();
            ViewModalAddNews();
        });

        $("#saveNews").click(function () {

            CreateNews();
        });

        $("#updateNew").click(function () {

            UpdateNews();
        });
    }

    async function validateAdminsitrator() {

        const response = await fetch('/api/validateadministrator', confi.getConfig('GET'));
        const myJson = await response.json();

        isAministradorNews = myJson;

        if (isAministradorNews)
            showControls = "auto";

        Initialize();

        var btnAddNews = document.getElementById("addNews");
        btnAddNews.style.display = showControls;
    }

    function ViewModalAddNews() {

        var titleModal = document.getElementById("titleModal");
        titleModal.innerText = getConfigMessage.strings.News.NuevaNoticia;

        $('#manageNews').modal('show');
    }

    async function LoadNews() {
        confi.initLoader();
        try {

            const result = await fetch("/api/getnews/", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    PageNumber: page,
                    PageSize: pagesize,
                    IsAdministrator: isAministradorNews
                })
            });

            //const response = await fetch('/api/getnews/', confi.getConfig('GET'));
            const myJson = await result.json();



            const bodyNews = myJson.ListResults.map((data) => (

                `<div class="card card-news">
        
            <div class="card-header">
            <span class="title-new">${data.NewsTitle}</span>
            <hr style="width:100%;">
           
            <div id="Desc">
            ${data.Description.length > 300 ? `
            <p ALIGN="justify"><span class="description-news">${data.Description.substring(0, 300)} ...</span></p>` :
                    `<p ALIGN="justify"><span class="description-news">${data.Description}</span></p>`}

            </div>
           

            <div class="card-body-btn">
            <div class="row">
            
            
            ${data.IsNew ? ` <div class="col-md-2">
            <div class="statusSucces">
                <span>${getConfigMessage.strings.News.Nuevo}</span>
            </div>
            </div>

            <div class="col-md-6">
            <span class="text-date">${new Date(data.CreatedDate).toLocaleDateString(getConfigMessage.scope.Localizacion, optionsDate)}</span>
            </div>`:

                    ` <div class="col-md-2"  style="display:none">
            <div class="statusSucces">
                <span>${getConfigMessage.strings.News.Nuevo}</span>
            </div>
            </div>

            <div class="col-md-8">
            <span class="text-date">${new Date(data.CreatedDate).toLocaleDateString(getConfigMessage.scope.Localizacion, optionsDate)}</span>
            </div> `}

           

            <div class="col-md-2 text-right">
            <button type="button" class="btn-ver-mas"  style="display: ${showControls}" onclick='UpdateNewsModal( ${JSON.stringify(data)} );'>
            <span>${getConfigMessage.strings.News.Editar}</span>
            </button>
            </div>
            <div class="col-md-2 text-right">
            <button type="button" class="btn-ver-mas" onclick='ViewNew( ${ JSON.stringify(data)} );'>
            <span>${getConfigMessage.strings.News.VerMas}</span>
            </button>
            </div>
            </div>
    
            </div>
            </div>
            </div>
            </div>
             `
            )).join('');

            const tableNews = document.getElementById("news");

            const newItem = document.createElement("section");
            newItem.classList.add("items");
            newItem.innerHTML = bodyNews;
            //const tbody = tableNews.querySelector("tbody");
            tableNews.appendChild(newItem);

            ltLoadNews.push(...myJson.ListResults);

            if (ltLoadNews.length === myJson.TotalResults) {
                intersectionObserver.disconnect();
            }

        } catch (e) {
            confi.stopLoader();
        }

        confi.stopLoader();
    }



    function UpdateNews() {

        var messAlert = ValidateControlsUpdateNews();
        if (messAlert !== "") {
            alert(messAlert);
            return;
        }

        var newsTitle = document.getElementById("titleNewUpdate").value;
        var newsDesc = document.getElementById("newsDescUpdate").value;
        var state = document.getElementById("enableNews").checked;
        var news = {
            NewsId: newsId,
            newsTitle: newsTitle,
            Description: newsDesc,
            State: state
        };


        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(news)
        };

        fetch('/api/updatenews', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {
                        // alert(getConfigMessage.strings.News.ActualizacionFallida);
                        confi.Messagge(false, getConfigMessage.strings.News.ActualizacionFallida);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (result) {

                if (result.Success) {

                    // alert(getConfigMessage.strings.News.ActualizacionExitosa);
                    confi.Messagge(true, getConfigMessage.strings.News.ActualizacionExitosa);
                    ClearUpdateModal();
                    ClearNews();
                    LoadNews();
                    $('#updateNews').modal('toggle');
                }
                else { confi.Messagge(false, getConfigMessage.strings.News.ActualizacionFallida); }



            });
    }

    function CreateNews() {

        var messAlert = ValidateControlsCreateNews();
        if (messAlert !== "") {
            confi.Messagge(false, messAlert);
            return;
        }


        var newsTitle = document.getElementById("titleNew").value;
        var newsDesc = document.getElementById("newsDesc").value;
        var news = {
            newsTitle: newsTitle,
            Description: newsDesc
        };


        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(news)
        };

        fetch('/api/createnews', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {

                        confi.Messagge(false, getConfigMessage.strings.News.CreacionFallida);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (result) {

                if (result.Success) {
                    confi.Messagge(true, getConfigMessage.strings.News.CreacionExitosa);
                    ClearNews();
                    LoadNews();
                    $('#manageNews').modal('toggle');
                }
                else { confi.Messagge(false, getConfigMessage.strings.News.CreacionFallida); }


            });
    }

    function ClearCreateModal() {

        document.getElementById("titleNew").value = '';
        document.getElementById("newsDesc").value = '';
    }

    function ClearUpdateModal() {

        document.getElementById("titleNewUpdate").value = '';
        document.getElementById("newsDescUpdate").value = '';
        newsId = 0;
    }

    function ClearNews() {
        var element = document.getElementById("news");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        ltLoadNews = [];
        page = 1;
        pagesize = 20;
    }

    function ValidateControlsCreateNews() {

        message = "";
        if (document.getElementById("titleNew").value === '')
            message = getConfigMessage.strings.News.RequiredTitulo;
        else if (document.getElementById("newsDesc").value === '')
            message = getConfigMessage.strings.News.RequiredDesc;

        return message;
    }

    function ValidateControlsUpdateNews() {

        message = "";
        if (document.getElementById("titleNewUpdate").value === '')
            message = getConfigMessage.strings.News.RequiredTitulo;
        else if (document.getElementById("newsDescUpdate").value === '')
            message = getConfigMessage.strings.News.RequiredDesc;

        return message;
    }


});

function ViewNew(news) {

    var titleModal = document.getElementById("titleModalView");
    titleModal.innerText = news.NewsTitle;

    var DescriptionView = document.getElementById("DescriptionView");
    DescriptionView.innerText = news.Description;

    $('#viewNews').modal('show');
}

function UpdateNewsModal(news) {


    newsId = news.NewsId;
    document.getElementById("titleNewUpdate").value = news.NewsTitle;
    document.getElementById("newsDescUpdate").value = news.Description;
    document.getElementById("enableNews").checked = news.State;

    $('#updateNews').modal('show');
}




