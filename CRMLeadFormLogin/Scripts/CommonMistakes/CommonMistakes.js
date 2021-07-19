let page = 1;
let pageSize = Pagination.getPageSize();
const commonMistakesObj = { ErrorCode: "", ErrorCodeOld: "", HttpErrorResponse: "", MessageError: "", MismaUrl: false, MessageUrl: "", Actionable: "" };
let deleteCM;
let isAdmin = false;
let isNew = false;
let errorDivCommon = document.getElementById("messsageAlertCommon");


const commonMistakesMod = (() => {

    const isAdministrator = async () => {
        const response = await fetch('/api/validateadministrator', confi.getConfig('GET'));
        return await response.json();
    };

    const getObjCommonMistake = () => {

        let objCommonMistake =
        {
            ErrorCode: document.getElementById("errorCode").value,
            ErrorCodeOld: errorCodeUpdate,
            HttpErrorResponse: document.getElementById("httpErrorResponse").value,
            MessageError: document.getElementById("messageError").value,
            MismaUrl: document.getElementById("mismaURL").checked,
            MessageUrl: document.getElementById("messageURL").value,
            Actionable: document.getElementById("actionable").value
        };

        return objCommonMistake;
    };

    const initModule = async (ppage, ppageSize) => {
        let result = await GetCommonMistakes(ppage, ppageSize);

        if (result)
            Pagination.Init(result.TotalResults);
    };

    return { isAdministrator, getObjCommonMistake, initModule };

})();

//Functions
async function GetCommonMistakes(pageNum, pageS) {

    try {

        const textSearch = document.getElementById("textSearch").value;

        const request = {
            Page: pageNum,
            PageSize: pageS,
            TextSearch: textSearch
        };

        const response = await fetch('/api/getcommonmistakes', confi.getConfig('POST', JSON.stringify(request)));
        const responseJson = await response.json();

        var messsageAlert = document.getElementById("messsageAlert");
        if (responseJson.ListResults.length > 0) {
            messsageAlert.style.display = "none";
        }
        else {
            messsageAlert.style.display = "block";
        }

        FillTableCommonMistakes(responseJson.ListResults);

        return responseJson;

    } catch (e) {
        confi.Messagge(false, getConfigMessage.strings.CommonMistakes.ErrorGetCommonMistakes);
        confi.stopLoader();
    }


}

const createOptionsAdministrator = (async () => {

    isAdmin = await commonMistakesMod.isAdministrator();
    if (isAdmin) {
        let theadTable = document.querySelector("#tableCommonMistakes thead tr");
        let thOpciones = document.createElement("th");

        let text = document.createTextNode(getConfigMessage.strings.CommonMistakes.Opciones);

        thOpciones.appendChild(text);
        theadTable.appendChild(thOpciones);

        //mostramos el boton nuevo 
        document.getElementById("newCommonMistake").hidden = false;
    }
})();

commonMistakesMod.initModule(page, pageSize);

function FillTableCommonMistakes(data) {
    confi.initLoader();

    let trtbody = data.map(item =>
        `<tr>
             <td>${item.ErrorCode}</td>
             <td>${item.HttpErrorResponse}</td>
             <td>${item.MessageError}</td>
             ${item.MismaUrl ? `<td><a class="icon-ws-ico-min-estado-ok"></td>` : `<td class="closeIcon"><a  class="icon-ws-ico-min-close"></td>`} 
             <td>${item.MessageUrl}</td>
             <td>${item.Actionable}</td>
              ${isAdmin ? `<td><a style="cursor:pointer;" class="icon-ws-ico-min-editar"  onclick='showModalCommonMistakes( ${JSON.stringify(item)},${false});'>
             <a style="cursor:pointer;" class="icon-ws-ico-min-delete"  onclick='deleteCM=deleteCommonMistakes( ${JSON.stringify(item)} );'>
             </td> `: `<td></td>`}
                 
     </tr>`
    ).join('');
    const tbody = document.querySelector("#tableCommonMistakes tbody");
    tbody.innerHTML = trtbody;
    confi.stopLoader();
}


let errorCodeUpdate = 0;
function showModalCommonMistakes(item, isNewItem) {


    document.getElementById("errorCode").value = item.ErrorCode;
    document.getElementById("httpErrorResponse").value = item.HttpErrorResponse;
    document.getElementById("messageError").value = item.MessageError;
    document.getElementById("messageURL").value = item.MessageUrl;
    document.getElementById("mismaURL").checked = item.MismaUrl;
    document.getElementById("actionable").value = item.Actionable;
    errorDivCommon.style.display = "none";
    //si es nuevo
    isNew = isNewItem;

    //update
    errorCodeUpdate = item.ErrorCode;

    if (!item.ErrorCode) {

        //errorDiv.style.display = "none";
        document.getElementById("modalTitle").innerHTML = getConfigMessage.strings.CommonMistakes.New;
        document.getElementById("addCommonMistake").innerHTML = getConfigMessage.strings.CommonMistakes.Add;

    }
    else {
        document.getElementById("modalTitle").innerHTML = getConfigMessage.strings.CommonMistakes.Edit;
        document.getElementById("addCommonMistake").innerHTML = getConfigMessage.strings.CommonMistakes.Edit;
        //.style.display = "block";
    }

    $('#modalCommonMistakes').modal('show');
}


function deleteCommonMistakes(item) {
    async function deleteRow() {

        try {
            let request = item;
            const response = await fetch('/api/deletecommonmistakes', confi.getConfig('POST', JSON.stringify(request)));
            const responseJson = await response.json();

            if (responseJson.Success) {

                page = 1;
                await commonMistakesMod.initModule(page, pageSize);
                $('#modalDelete').modal('hide');
                confi.Messagge(true, getConfigMessage.strings.CommonMistakes.DeleteSuccess);
            }
            else
                confi.Messagge(false, getConfigMessage.strings.CommonMistakes.DeleteError);

        }
        catch (e) {
            confi.Messagge(false, getConfigMessage.strings.CommonMistakes.DeleteError);
        }
    }
    $('#modalDelete').modal('show');
    return deleteRow;
}

async function addCommomMistake(item) {

    try {

        let request = commonMistakesMod.getObjCommonMistake();
        const response = await fetch('/api/addcommonmistakes', confi.getConfig('POST', JSON.stringify(item)));
        const responseJson = await response.json();

        if (responseJson.Success) {
            page = 1;
            await commonMistakesMod.initModule(page, pageSize);
            $('#modalCommonMistakes').modal('hide');
            confi.Messagge(true, getConfigMessage.strings.CommonMistakes.CreateSuccess);
        }
        else {

            if (responseJson.Message === "ExistCommonMistake") 
                //confi.Messagge(false, getConfigMessage.strings.CommonMistakes.ExistCommonMistake);
                errorDivCommon.style.display = "block";
            else
                confi.Messagge(false, getConfigMessage.strings.CommonMistakes.CreateError);
        }
    }
    catch (e) {
        confi.Messagge(false, getConfigMessage.strings.CommonMistakes.CreateError);
    }

}

async function updateCommomMistake(item) {

    try {

        const response = await fetch('/api/updatecommonmistakes', confi.getConfig('POST', JSON.stringify(item)));
        const responseJson = await response.json();

        if (responseJson.Success) {
            page = 1;
            await commonMistakesMod.initModule(page, pageSize);
            $('#modalCommonMistakes').modal('hide');
            confi.Messagge(true, getConfigMessage.strings.CommonMistakes.UpdateSuccess);

        }
        else {

            if (responseJson.Message === "ExistCommonMistake")
                errorDivCommon.style.display = "block";
            else
                confi.Messagge(false, getConfigMessage.strings.CommonMistakes.UpdateError);
        }

    }
    catch (e) {
        alert('ddsd');
        confi.Messagge(false, getConfigMessage.strings.CommonMistakes.UpdateError);
    }

}

const createUpdateCommonMis = async (e) => {
    e.preventDefault();
    forms.classList.add('was-validated');
    if (forms.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        let obj = commonMistakesMod.getObjCommonMistake();
        if (isNew)
            await addCommomMistake(obj);
        else {
            await updateCommomMistake(obj);
        }
    }
};

Pagination.onClickPage = function (ppageSize, pnumPage) {
    pageSize = ppageSize;
    GetCommonMistakes(pnumPage, pageSize);
};

const removeValidate = () => {
    const childItems = document.querySelectorAll(".modal-body > div");
    childItems.forEach((elm) => {
        for (k = 0; k < elm.children.length; k++) {
            let childHTML = elm.children[k];
            childHTML.classList.remove("field-error");

            if (childHTML.classList.contains("input-msg"))
                elm.removeChild(childHTML);
        }
    });
};

//Events
//document.getElementById("addCommonMistake").addEventListener('click', createUpdateCommonMis);

document.getElementById("btnFullTextSearch").addEventListener('click', function () {

    commonMistakesMod.initModule(1, pageSize);
});

document.getElementById("newCommonMistake").addEventListener('click', function () {

    showModalCommonMistakes(commonMistakesObj, true);
});

document.getElementById("aceptDelete").addEventListener('click', function () {
    deleteCM();
});


$('#modalCommonMistakes').on('hidden.bs.modal', function (e) {
    //removeValidate();
    forms.classList.remove("was-validated");
});

var forms = document.getElementById("formCommonMistakes");
forms.addEventListener("submit", createUpdateCommonMis);
//forms.classList.add('was-validated');    