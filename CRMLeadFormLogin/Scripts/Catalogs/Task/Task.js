$(function () {

    Initialize();
    var taskRowSelected = {};

    var dateTrigger;
    var hourTrigger;
    var repeatTrigger;
    var repeatHour;
    var enableTrigger;

    var bandEdit = false;

    var message = "";

    //Title modal
    var titleModal = document.getElementById("titleModal");
    var elementH4 = document.createElement('h4');
    elementH4.id = 'elmH4';
    titleModal.appendChild(elementH4);

    function Initialize() {

        GetAllTrigger();

        $('#dateTrigger').datepicker({
            uiLibrary: 'bootstrap4',
            format: 'yyyy-mm-dd'
        });



        //Boton Crear
        $("#newTrigger").click(function () {

            //Cambiamos el titulo del modal         
            elementH4.innerText = getConfigMessage.strings.CatalogTask.NuevoDesencadenador;

            //cambiamos el texto del boton
            var botonModal = document.getElementById("saveTrigger");
            botonModal.innerText = getConfigMessage.strings.CatalogTask.Agregar;


            bandEdit = false;
            clearValueControls();
        });

        //boton guardar
        $("#saveTrigger").click(function () {
            saveTrigger();
        });

        //Boton Editar
        $("#editTrigger").click(function () {
            bandEdit = true;
            ViewModalEdit();
        });

        //Boton Eliminar
        $("#deleteTrigger").click(function () {
            DeleteTrigger();
        });

    }


    function GetAllTrigger() {
        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify()
        };

        fetch('/api/GetAllTriggerCustomer', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {

                        confi.Messagge(false, getConfigMessage.strings.CatalogTask.GetTriggerError);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (myJson) {

                FillGridTask(myJson);
            });
    }


    function CreateTrigger() {

        getValuesControls();
        var createTask = {
            DateTrigger: dateTrigger, HourTrigger: hourTrigger, RepeatCheck: repeatTrigger, Repeat: repeatHour, IsActive: enableTrigger
        };

        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(createTask)
        };

        fetch('/api/createTrigger', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {
                        confi.Messagge(false, getConfigMessage.strings.CatalogTask.CreateTriggerError);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (myJson) {
                GetAllTrigger();
                if (myJson === 'CreateTriggerSuccess')
                    confi.Messagge(true, getConfigMessage.strings.CatalogTask.CreateTriggerSuccess);
                else if (myJson === 'ValidTimeError')
                    confi.Messagge(false, getConfigMessage.strings.CatalogTask.ValidTimeError);

            });
    }

    function EditTrigger() {


        getValuesControls();
        var createNewTask = {
            DateTrigger: dateTrigger, HourTrigger: hourTrigger, RepeatCheck: repeatTrigger, Repeat: repeatHour, IsActive: enableTrigger
        };

        var editTriggerRequest = { catalogNewTask: createNewTask, catalogOldTask: taskRowSelected };

        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(editTriggerRequest)
        };

        fetch('/api/edittrigger', miInit)
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
                GetAllTrigger();
                if (myJson === 'EditTriggerSuccess')
                    confi.Messagge(true, getConfigMessage.strings.CatalogTask.EditTriggerSuccess);
                else if (myJson === 'ValidTimeError')
                    confi.Messagge(false, getConfigMessage.strings.CatalogTask.ValidTimeError);
            });
    }


    function DeleteTrigger() {

        if (taskRowSelected.TriggerDetails != null) {

            var miInit = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(taskRowSelected)
            };

            fetch('/api/deletetrigger', miInit)
                .then(
                    function (response) {
                        if (response.status < 200 || response.status > 299) {
                            confi.Messagge(false, getConfigMessage.strings.CatalogTask.DeleteTriggerError);
                            return Promise.reject(response.json());
                        }
                        else {

                            GetAllTrigger();
                            confi.Messagge(true, getConfigMessage.strings.CatalogTask.DeleteTriggerSuccess);

                        }

                    });
        }
        else {
            confi.Messagge(false, getConfigMessage.strings.CatalogTask.SelectedTrigger);
        }


    }

    function FillGridTask(tasks) {
        $('#tableTasks tbody tr').remove();
        var tableTasks = document.getElementById("tableTasks").getElementsByTagName('tbody')[0];

        for (var i = 0; i < tasks.length; i++) {

            var newRow = tableTasks.insertRow();

            let taskRow = tasks[i];
            newRow.addEventListener('click', function (ev) {

                RowSelected(taskRow);
                $(this).addClass('table-active').siblings().removeClass('table-active');

            });

            var Trigger = newRow.insertCell(0);
            Trigger.appendChild(document.createTextNode('Desencadenador'));

            var Details = newRow.insertCell(1);
            Details.appendChild(document.createTextNode('A las ' + tasks[i].HourTrigger + ' ' + getConfigMessage.strings.CatalogTask.Diariamente));

            var Enable = newRow.insertCell(2);
            Enable.appendChild(document.createTextNode(tasks[i].IsActive === true ? getConfigMessage.strings.CatalogTask.Habilitado : getConfigMessage.strings.CatalogTask.Deshabilitado));

        }

    }
    function RowSelected(taskRow) {

        taskRowSelected = taskRow;
    }


    function ViewModalEdit() {

        if (taskRowSelected.TriggerDetails != null) {


            clearValueControls();
            var dateTrigger = new Date(taskRowSelected.DateTrigger);

            var dia = ('0' + dateTrigger.getDate()).slice(-2);
            var mes = ('0' + (dateTrigger.getMonth() + 1)).slice(-2);
            var annio = dateTrigger.getFullYear();

            //Cambiamos el titulo del modal
            elementH4.innerText = getConfigMessage.strings.CatalogTask.EditarDesencadenador;

            //cambiamos el texto del boton 
            var botonModal = document.getElementById("saveTrigger");
            botonModal.innerText = getConfigMessage.strings.CatalogTask.Editar;

            //llenamos los controles
            $("#enableCheck").prop('checked', taskRowSelected.IsActive);
            $("#repeatCheck").prop('checked', taskRowSelected.RepeatCheck);
            document.getElementById("dateTrigger").value = annio + "-" + mes + "-" + dia;
            document.getElementById("Hours").value = taskRowSelected.HourTrigger;
            document.getElementById("repeatHours").value = taskRowSelected.Repeat;


            var isChecked = document.getElementById('repeatCheck').checked;
            if (isChecked) {
                document.getElementById("repeatHours").disabled = false;
            }
            else {
                document.getElementById("repeatHours").disabled = true;
            }

            $('#modalTrigger').modal('show');

        }
        else {
            confi.Messagge(false, getConfigMessage.strings.CatalogTask.SelectedTrigger);
        }


    }

    function clearValueControls() {

        var fecha = new Date();

        var dia = ('0' + fecha.getDate()).slice(-2);
        var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
        var annio = fecha.getFullYear();


        var hora = ('0' + fecha.getHours()).slice(-2);
        var minutes = ('0' + fecha.getMinutes()).slice(-2);

        document.getElementById("dateTrigger").value = annio + "-" + mes + "-" + dia;
        document.getElementById("Hours").value = hora + ":" + minutes;

        $("#repeatCheck").prop('checked', false);

        document.getElementById("repeatHours").value = 5;

        document.getElementById("repeatHours").disabled = true;

    }

    function getValuesControls() {

        dateTrigger = document.getElementById("dateTrigger").value;
        hourTrigger = document.getElementById("Hours").value;
        repeatTrigger = document.getElementById("repeatCheck").checked;
        repeatHour = $('#repeatHours').val();
        enableTrigger = document.getElementById("enableCheck").checked;
    }

    function saveTrigger() {

        message = validSelectedControls();
        if (message !== "") {
            alert(message);
            return;
        }

        if (bandEdit)
            EditTrigger();
        else
            CreateTrigger();

        //cerrar modal
        $('#modalTrigger').modal('toggle');
    }

    function validSelectedControls() {

        message = "";
        if (document.getElementById("Hours").value === "") {
            return message = "Debe seleccionar una hora";
        }

        return message;

    }

    $('#repeatCheck').click(function (event) {

        var isChecked = document.getElementById('repeatCheck').checked;
        if (isChecked) {
            document.getElementById("repeatHours").disabled = false;
        }
        else {
            document.getElementById("repeatHours").disabled = true;
        }

    });

    function GetMessage(keyMessage) {

        return getConfigMessage.strings.CatalogTask + '.' + keyMessage;

    }

});