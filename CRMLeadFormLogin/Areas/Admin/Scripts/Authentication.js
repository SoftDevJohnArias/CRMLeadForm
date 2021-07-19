
// EVENTS


document.addEventListener("DOMContentLoaded", () => {

  const $formLoginAdmin = document.getElementById("formLoginAdmin");

  if ($formLoginAdmin)
    $formLoginAdmin.addEventListener("submit", handleSubmitFormAdmin);


  //Bnt event modal get customer
  const $formGetCustomer = document.getElementById("formGetCustomer");
  if ($formGetCustomer) {
    //validateForm.init($formGetCustomer);
    $formGetCustomer.addEventListener("submit", handleSubmitGetCustomer);
  }

  //button event cahange customer
  const $changeCustomer = document.getElementById("changeCustomer");

  if ($changeCustomer)
    $changeCustomer.addEventListener("click", handleClickChangeCustomer);


});

const handleSubmitFormAdmin = async (ev) => {


  try {
    ev.preventDefault();

    confi.initLoader();
    if (!ev.target.checkValidity()) {
      ev.stopPropagation();
    }
    ev.target.classList.add('was-validated');

    const formData = new FormData(ev.target);
    const { success, messagge } = await sigIn(formData);
    confi.stopLoader();
    const $messageError = document.querySelector(".invalid-login");
    $messageError.innerText = "";
    if (!success) {
      $messageError.innerText = messagge;
      return;
    }
    openModalCustomer();


  } catch (e) {
    console.error(e);
    confi.stopLoader();
  }


};

const handleSubmitGetCustomer = async (ev) => {

  try {
     
    ///const validation = validateForm.getValidation();
    ev.preventDefault();
    confi.initLoader();
    const $idTrax = document.getElementById("idTrax");
    let customer = $idTrax.value.split("-")[0].trim();
    const $messageError = document.getElementById("messageError");
    $messageError.innerHTML = "";
    const { success, messagge, urlRedirect } = await getCustomer(customer);

    if (!success) {
      confi.stopLoader();
      $messageError.innerHTML = messagge;
      return;
    }

     
    const lastUrl = sessionStorage.getItem("lastUrlNavigation");
    window.location.href = lastUrl || urlRedirect;
    confi.stopLoader();
  } catch (e) {
    console.error(e);
  }
};

const handleClickChangeCustomer = async (ev) => {

  ev.preventDefault();
  //const user = JSON.parse(ev.target.dataset.user);
  openModalCustomer();
};

///funtions

const openModalCustomer = () => {
  const modalGeCustomer = document.getElementById("ModalGetCustomer");
  modalGeCustomer.querySelector(".modal-title").innerText = getConfigMessage.strings.customer.messageModalCustomer;

  $(modalGeCustomer).modal({ backdrop: 'static' });
};

const sigIn = async (formData) => {

  const result = await fetch(`/${getConfigMessage.scope.language}/Admin/AccountActiveDiretory/SignIn`, {
    method: "POST",
    body: formData
  });

  return await result.json();

};

const getCustomer = async (customer) => {
  //const { accesToken } = JSON.parse(confi.getCookieByName("access-token"));
  const result =
    await fetch(`/${getConfigMessage.scope.language}/Admin/CustomerAdmin/GetSimulateCustomer?customer=${customer}&language=${getConfigMessage.scope.language}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //Authorization: isSendtoken ? `Bearer ${getToken()}` : null,
      },
      method: "GET"
    });

  return await result.json();
};

