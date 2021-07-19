function GetOrderDetails(orderCustomer) {
   
  $.ajax({

    cache: false,
    async: true,
    type: "POST",
    url: 'GetOrderDetails',
    contentType: 'application/json; charset=utf-8',
    //dataType: "json",
    //data: orderCustomer,
    data: JSON.stringify(orderCustomer),
    //data: JSON.stringify({ orderCustomer : orderCustomer }),
    success: function (response) {
      $('#ViewResult').html(response);
      const $numberOrdeTitle = document.getElementById("numberOrdeTitle");
      if ($numberOrdeTitle) {
         
        const $sectionNumberOrder = document.getElementById("sectionNumberOrder");
        $numberOrdeTitle.innerText = $sectionNumberOrder.innerHTML.trim();
      }

    },
    error: function (request, status, error) {
      //alert(request.responseText);
    }
  });

  /* $('#myModal').modal('show');*/
}
