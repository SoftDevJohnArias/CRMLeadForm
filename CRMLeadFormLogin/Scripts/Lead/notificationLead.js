const notificationLead = (() => {

  const notification = {
    type: null,
    title: '',
    messages: [],
    url: []
  };

  const init = () => {
    const $contentNotification = document.querySelector('.notifications');
    $contentNotification.innerHTML = '';
    notification.messages = [];
  };

  const getNotificationByStep = ({ initialSteps, currenIndexStep }, checkValidFields = true ,isValidEmail = true, isValidContact = true, isValidRut = true, isValidRutXCL = true) => {
    
    const { SteptName } = initialSteps[currenIndexStep];

    notification.type = templateNotifications.error;
    if (SteptName === "ph_urlfilesharepoint") {
      notification.title = getConfigMessage.strings.Lead.RequiredFields;
      notification.messages.push(getConfigMessage.strings.Lead.DescErrorDocumentsEmpty);
    }
    else {

      notification.title = getConfigMessage.strings.Lead.RequiredFields;
      notification.messages.push(getConfigMessage.strings.Lead.DescErrorInputsEmpty);

      if (!checkValidFields)
        notification.messages.push(getConfigMessage.strings.Lead.MessageValidationEmail);
      if (!isValidEmail)
        notification.messages.push(getConfigMessage.strings.Lead.MessageValidationEmail);
      if (!isValidContact)
        notification.messages.push(getConfigMessage.strings.Lead.MessageValidationContact);
      if (!isValidRut)
        notification.messages.push(getConfigMessage.strings.Lead.MessageRut);
      if (!isValidRutXCL)
        document.getElementById(8).classList.add('is-error');
    }

    const $contentNotificacion = document.querySelector('.notifications');
    $contentNotificacion.appendChild(getNotifications(notification));

   
  };

  const getNotifications = (notification) => templateLead.templateMessageInfo(notification);
  const getNotificationsValidate = (notification) => templateLead.templateMessageInfoValidate(notification);

  const getNotificationConfirmLead = () => templateLead.templateConfirmLead();

  const getNotificationUser = () => {
    notification.type = templateNotifications.warning;
    notification.title = getConfigMessage.strings.Lead.Important;
    notification.messages.push(getConfigMessage.strings.Lead.ErrorValidateDocument);

    getNotifications(notification);
  };

  const getNotificationWarning = (messages = [], isvalidate = false, url = []) => {
    notification.type = templateNotifications.warning;
    notification.title = getConfigMessage.strings.Lead.Important;

    messages.map(mgs => notification.messages.push(mgs));
    url.map(urls => notification.url.push(urls));

    if (isvalidate) {
      getNotificationsValidate(notification);
      const $contentNotificacion = document.querySelector('.notifications');
      $contentNotificacion.appendChild(getNotificationsValidate(notification));
      confi.scrollTo(0, 900);
    } else {
      getNotifications(notification);
      const $contentNotificacion = document.querySelector('.notifications');
      $contentNotificacion.appendChild(getNotifications(notification));
      confi.scrollTo(0, 900);
    }

  };

  const getNotificationError = (messages = [], isvalidate = false) => {
    notification.type = templateNotifications.error;
    //notification.title = getConfigMessage.strings.Lead.TitleErrorDocumentsEmpty;

    notification.title = messages[0];
    messages.map(mgs => notification.messages.push(mgs));

    const $contentNotificacion = document.querySelector('.notifications');
    $contentNotificacion.innerHTML = "";
    $contentNotificacion.appendChild(getNotifications(notification));
    confi.scrollTo(0, 900);

    //if (isvalidate) {
    //  getNotificationsValidate(notification);
    //  const $contentNotificacion = document.querySelector('.notifications');
    //  $contentNotificacion.appendChild(getNotificationsValidate(notification));
    //  confi.scrollTo(0, 900);
    //} else {
    //  getNotifications(notification);
    //  const $contentNotificacion = document.querySelector('.notifications');
    //  $contentNotificacion.appendChild(getNotifications(notification));
    //  confi.scrollTo(0, 900);
    //}

  };

  const setNotificationDefault = () => {
    const $contentNotificacion = document.querySelector('.notifications');
    if ($contentNotificacion)
    $contentNotificacion.innerHTML = "";
  }

  return {
    init,
    getNotifications,
    getNotificationByStep,
    getNotificationUser,
    getNotificationConfirmLead,
    getNotificationWarning,
    getNotificationError,
    setNotificationDefault
  };
})();