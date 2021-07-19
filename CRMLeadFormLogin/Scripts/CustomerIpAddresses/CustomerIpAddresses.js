$(function () {

    Initialize();
    var deleteIPRow;


    function Initialize() {

        getCustomerIpAddresses();

        //boton guardar IP
        $("#btnAddIP").click(function () {
            createCustomerIpAddresses();
        });

        //boton aceptar confirmar eliminacion
        $("#aceptDelete").click(function () {
            deleteCustomerIpAddresses(deleteIPRow);
        });

        //boton cancelar eliminacion
        $("#cancelDelete").click(function () {
            deleteIPRow = '';
        });

    }

    function getCustomerIpAddresses() {

        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify()
        };

        fetch('/api/getCustomerIpAddresses', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {
                        confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.GetErrorIP);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (myJson) {
                FillGridAddressIP(myJson.ListResults);
            });
    }

    function createCustomerIpAddresses() {

        var ipAddress = document.getElementById("inputAddIP").value;

        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(ipAddress)
        };

        fetch('/api/createcustomeripaddresses', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {
                        confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.CreateError);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (myJson) {
                if (myJson.Success) {
                    getCustomerIpAddresses();
                    if (myJson.Message === 'ExistIP')
                        confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.ExistIP);
                    else if (myJson.Message === 'CreateSuccessIP')
                        confi.Messagge(true, getConfigMessage.strings.CustomerIpAdresess.CreateSuccessIP);
                    else if (myJson.Message === 'IPnovalida')
                        confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.IPnovalida);

                    document.getElementById("inputAddIP").value = '';
                }
                else { confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.CreateError); }

            });
    }

    function deleteCustomerIpAddresses(deleteIP) {

        var miInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(deleteIP)
        };

        fetch('/api/deleteCustomerIpAddresses', miInit)
            .then(
                function (response) {
                    if (response.status < 200 || response.status > 299) {
                        confi.Messagge(false, getConfigMessage.strings.CustomerIpAdresess.DeleteError);
                        return Promise.reject(response.json());
                    }
                    else {
                        return response.json();
                    }

                })
            .then(function (myJson) {
                if (myJson) {
                    getCustomerIpAddresses();
                    $('#modalDelete').modal('toggle');
                    confi.Messagge(true, getConfigMessage.strings.CustomerIpAdresess.DeleteSuccess);
                    deleteIPRow = '';

                }
            });
    }

    function FillGridAddressIP(AddressIps) {
        $('#tableIpAdresess tbody tr').remove();
        var table = document.getElementById("tableIpAdresess").getElementsByTagName('tbody')[0];

        for (var i = 0; i < AddressIps.length; i++) {

            var newRow = table.insertRow();

            let dRow = AddressIps[i];

            var ip = newRow.insertCell(0);
            ip.appendChild(document.createTextNode(AddressIps[i].IpAddress));

            var deleteRow = newRow.insertCell(1);
            deleteRow.appendChild(document.createTextNode(AddressIps[i].IpAddress));

            deleteRow.addEventListener('click', function (ev) {

                selectedDeleteRow(dRow);


            });

            newRow.addEventListener('click', function (ev) {


                $(this).addClass('table-active').siblings().removeClass('table-active');

            });

            //deleteRow.innerHTML = '<h4><a class="icon-iws-delete" onclick=selectedDeleteRow(' + JSON.stringify(dRow) + ');></h4>';
            deleteRow.innerHTML = '<h4><a style="cursor:pointer;" class="icon-ws-ico-min-delete"></h4>';


        }

    }

    function selectedDeleteRow(dRow) {

        deleteIPRow = dRow.IpAddress;

        $('#modalDelete').modal('show');

    }


});

