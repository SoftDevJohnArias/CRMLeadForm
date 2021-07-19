function Download(ordersCustomerRequest) {
  var miInit = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
      body: JSON.stringify(ordersCustomerRequest)
  };
  fetch('/api/GenerateExcelOrders', miInit)
    .then(
      function (response) {
        if (response.status === 401) {
          //SessionLost();
        }
        else {
          response.blob().then(byteArray => {
            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(byteArray);
            a.download = "Orders.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
        }
      });
}