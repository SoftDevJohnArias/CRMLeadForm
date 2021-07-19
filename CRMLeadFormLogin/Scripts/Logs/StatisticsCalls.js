async function GetErrorCustomer(RequestOperation) {
  
  const response = await fetch('/api/GetErrorCustomer/' + RequestOperation, confi.getConfig('GET'));
  const myJson = await response.json();
  const $contentChart = document.getElementById("contentChart");
  if (myJson.length === 0) {
    $contentChart.classList.add("d-none");
    return;
  }

  $contentChart.classList.remove("d-none");
  new Chart(document.getElementById("pie-chart"), {
    type: 'doughnut',
    data: {
      labels: myJson.map(item => item.StatusCode),
      datasets: [{
        label: "Population (millions)",
        backgroundColor: myJson.map(item => dynamicColors()),
        data: myJson.map(item => parseInt(item.cantidad))
      }]
    },
    options: {
      title: {
        display: true,
        text: getConfigMessage.strings.Logs.GroupErros // GroupErros
      }
    }
  });
}
var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function regresar() {
  document.getElementById("Encabezado").classList.remove("d-none");
  document.getElementById("Detalle").classList.add("d-none");
  document.getElementById("titleReqOperation").innerText = "";
}

GetlogsCustomer();
async function GetlogsCustomer() {
  const response = await fetch('/api/GetlogsCustomer', confi.getConfig('GET'));
  const myJson = await response.json();
  const trtobody = myJson.map((data) => (
    `<tr class='${!data.cuerpo ? 'total' : ''}'>
             <td>${data.RequestOperation}</td>
             <td>${data.cantidad}</td>
             <td>
                  <div class="progress">
                       <div class="progress-bar" role="progressbar" style="width: ${data.porcentaje}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                          ${data.porcentaje}
                       </div>
                   </div>
             </td>
             ${data.cuerpo ? `<td class='detailCalls' onclick='VerDetalle("${data.RequestOperation}")'>
                                   <span class='icon-ws-ico-min-view' style='font-size:20px'></span> Ver
                             </td>`: `<td> </td>`}
     </tr>`
  )).join('');
  const tabla = document.getElementById("tableOperation");
  const tbody = tabla.querySelector("tbody");
  tbody.innerHTML = trtobody;
}


async function VerDetalle(RequestOperation) {
  confi.initLoader();
  GetErrorCustomer(RequestOperation);
  const response = await fetch('/api/GetErrorCustomerGroupsuccess/' + RequestOperation, confi.getConfig('GET'));
  const myJson = await response.json();
  document.getElementById("Encabezado").classList.add("d-none");
  document.getElementById("Detalle").classList.remove("d-none");
  document.getElementById("titleReqOperation").innerText = ` ${RequestOperation}`;
  const trtobody = myJson.map((data) => (
    `<tr class='${!data.cuerpo ? 'total' : ''}'>
             <td>${data.Success}</td>
             <td>${data.cantidad}</td>
             <td>
                  <div class="progress">
                       <div class="progress-bar" role="progressbar" style="width: ${data.porcentaje}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                          ${data.porcentaje}
                       </div>
                   </div>
             </td>              
     </tr>`
  )).join('');
  const tabla = document.getElementById("Detail");
  const tbody = tabla.querySelector("tbody");
  tbody.innerHTML = trtobody;
  confi.stopLoader();
}