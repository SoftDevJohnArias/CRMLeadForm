//MODULE

const alertNotificaction = (() => {

  let timer = null;

  const showNotify = (message, delay) => {

    clearTimeout(timer);

    const $notify = document.querySelector(".alert-notify");
    $notify.querySelector("p").innerText = message;
    $notify.classList.remove("inactive");
    $notify.classList.add("active");

    timer = setTimeout(() => {
      $notify.classList.remove("active");
      $notify.classList.add("inactive");
    }, delay || 3000);
  };

  const resizeNotify = () => {
    const $alert = document.querySelector(".alert-notify-container");
    $alert.classList.toggle("resize");
  }

  return {
    showNotify,
    resizeNotify
  };



})();