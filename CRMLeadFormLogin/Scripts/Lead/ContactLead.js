const contactLead = (() => {
  let contacts = [];
  let cloneNodeEmail = null;
  let successElectronicBilling = false;
  let contactsElectronicBill = [];
  let assingClick = false;
  let idContactFact = null;
  let selectFeatures = [];
  let contactOld = -1;
  let isClickAddContact;
  let changeClick = true;
  let isClickEditContact;

  const addContact = (contact) => {
    contacts.push(contact);
  };


  const updateContact = (contact, id) => contacts[id] = contact;

  const getContacts = () => contacts;

  const getisClickAddContact = () => isClickAddContact;
  const getisClickEditContact = () => isClickEditContact;

  const deleteContact = (index) => {
    contacts = contacts.filter(({ infoContact }) => infoContact.id !== index);
  };

  const existContactPrincipal = () => contacts.some(({ infoContact }) => infoContact.type === contactType.representative);

  const existOtherContact = () => contacts.some(({ infoContact }) => infoContact.type === contactType.commercialContact);

  const getRoleByContact = (contact) => {

    const { initialSteps, currenIndexStep } = leadForm.getState();

    const { options, name } = initialSteps[currenIndexStep].Sections[0].fields.find(({ fieldType }) => fieldType === "checkbox");

    const rolesContact = options?.filter(({ optionId }) => contact[`${name}${optionId}`])
      .map(({ optionValue }) => optionValue).join(" - ");

    return rolesContact;
  };

  const init = (form) => {

    initContactAdministrator();
    renderButtonAddContact(form);
    setOptionEmailContact();
    cloneContentEmailAddress();
    intlTelInputLead.init();
  };

  const renderButtonAddContact = (form) => {
    form.appendChild(divAddContact());
  };

  const renderElectronicBilling = (section, reference) => {
    //section.insertBefore(electronicBill(), reference);
    section.insertAdjacentElement("beforebegin", electronicBill());
  };

  const renderListGeneral = (section, reference) => {
    section.insertBefore(templateLead.createContactListGeneral(), reference);
  };

  const renderAddotherContact = (section, reference) => {
    reference.insertAdjacentElement("afterend", createButtonOtherContact());
  };

  const initContactAdministrator = () => {
    const $title = document.querySelector("h5");
    const template = confi.createVirtualDOM('<i class="icon-ws-ico-min-star-fill"></i>');
    $title.insertAdjacentElement("beforebegin", template);

    $title.insertAdjacentElement("afterend", confi.templateToolTipInfo(getConfigMessage.strings.Lead.TextToolTipContact));
  }

  const createButtonAdd = () => {
    const templateButton = `
        <div class="contact-add"><button id="addContact"
        type="button"
        onClick="contactLead.handleClickAddContact(this);"
        class="btn btn-big-extra-large btn-white"
      >
        ${getConfigMessage.strings.Lead.AddContactAdministrator}
         </button><div>`;

    return templateButton;

  };

  const createButtonOtherContact = () => {
    const templateButton = `
        <div class="contact-other-contact"><button
        type="button" id="btnOtherContact"
        onClick="contactLead.handleClickOtherContact();"
        class="btn btn-big btn-white"
        >
        ${getConfigMessage.strings.Lead.AddOtherContact.toUpperCase()}
         </button><div>`;

    return confi.createVirtualDOM(templateButton);

  };

  const handleClickOtherContact = () => {

    const $openContact = document.getElementsByClassName('info-contacts');

    if ($openContact.length !== 1) {

      //cerramos las secciones abiertas 
      contactsXpandCollapse();

      formAddContact(true);

      //mostramos el boton agregar contacto
      buttonContactAdd(true);

      //info contacts
      const $referenceNode = document.querySelector("input[name = firstname]");
      const $formGroup = $referenceNode.closest(".form-group");
      $formGroup.insertAdjacentElement("beforebegin", infoContacts());

      //cambiamos el texto al boton
      const $buttonAdd = document.querySelector("#addContact");
      const $email = document.querySelector("input[name = emailaddress1]");
      const $emailAlterno = document.querySelector("input[name = emailaddress3]");
      $buttonAdd.innerHTML = getConfigMessage.strings.Lead.AddContact;

      //agregamos notificacion
      const text = getConfigMessage.strings.Lead.TextNotificationRol;

      const $notificationRoles = document.querySelector(".section-content .notification-static-contact");
      if ($notificationRoles == null) {
        $email.closest(".form-group").insertAdjacentElement("beforebegin", templateLead.templateNotificationStaticEmailContact(text));
        $email.closest(".form-group").insertAdjacentElement("afterend", templateLead.templateNotificationStaticEmailContact(getConfigMessage.strings.Lead.TextInformationContactWebStore));
      }
      else {
        notificationsShow(true);
      }

      //bloqueamos el campo email
      blockField(false, $email);
      blockFieldNotRequired($emailAlterno);

      //eliminamos el template de agregar contactos
      const $contactAddList = document.querySelector(".commercial-contact-list");
      if ($contactAddList) {
        const $refparent = $contactAddList.closest(".content-contact");
        $refparent.remove();
      }

      //cambiamos el tamaño del campo email
      //const $email = document.querySelector("input[name = emailaddress1]");
      if ($email.classList.contains("input-medium-06")) {
        $email.classList.remove("input-medium-06");
        $email.classList.add("input-big");
      }


      leadForm.initValidationForm();
    } else {
      confi.scrollTo(0, 900);
      return;
    }
    confi.scrollTo(300, 900);
  };

  const blockFieldNotRequired = (elm) => {
    if (!elm.classList.contains("element-disabled")) {
      elm.classList.add("element-disabled");
      elm.value = "";
    }
  };


  const activeFieldNotRequired = (elm) => {
    if (elm.classList.contains("element-disabled")) {
      elm.classList.remove("element-disabled");
      elm.value = "";
    }
  };

  const blockField = (e, elm) => {
    if (!elm.classList.contains("element-disabled")) {
      elm.classList.add("element-disabled");
      elm.removeAttribute("required");
      elm.removeAttribute("data-required");
      elm.value = "";

      validateInitFormContact();
      validateInitFormAddContact(e);

    }
  };

  const activeField = (e, elm) => {
    if (elm.classList.contains("element-disabled")) {
      elm.classList.remove("element-disabled");
      elm.setAttribute("required", "");
      elm.setAttribute("data-required", "");
      elm.value = "";

      validateInitFormContact();
      validateInitFormAddContact(e);
    }
  };

  const removeIsError = () => {
    const $elms = document.querySelectorAll(".email.is-error");

    $elms.forEach(elm => {
      if (elm.classList.contains("is-error"))
        elm.classList.remove("is-error");

      const $error = elm.closest(".form-group")?.querySelector(".input-msg");

      if ($error) $error.remove();
    });
  };

  const divAddContact = () => {
    const template = `
        <div>
        ${createButtonAdd()}
        <div>`;

    return confi.createVirtualDOM(template);

  };


  const listContact = () => {
    const template = `
        <div class="content-contact-list">
          <div class="title-list">
           <h5>${getConfigMessage.strings.Lead.ContactList}</h5>
          <div>
        <div>`;
    return confi.createVirtualDOM(template);
  };

  const infoContacts = () => {
    const template = `
        <div class="info-contacts">
           <h5>${getConfigMessage.strings.Lead.InfoContacts}</h5>
        <div>`;
    return confi.createVirtualDOM(template);
  };

  const expandToggleEditContact = (element) => {
    const $contentContentContact = element.closest(".content-contact");
    const $links = $contentContentContact.querySelector(".content-link");
    $links.classList.toggle("d-none");

    $contentContentContact.classList.toggle("expand-collapse");

    return $contentContentContact;
  }

  const electronicBill = () => {
    const template = `<div class="content-electronic-bill">
                        <div class="row-title">
                          <div class="title-bill">${getConfigMessage.strings.Lead.ElectronicBill}</div>
                        </div>
                        <div class="row-body-content">
                          <div class="paragraph-bill">${getConfigMessage.strings.Lead.ChooseContact}</div>
                          <div class="notification-static">
                             <div class="content-img">
                              <i class="icon-bill"></i>
                              <div class="paragraph-assigning">${getConfigMessage.strings.Lead.EmailAssignment}</div>
                             </div>
                             <button type="button" id="btnAssignEmail" onClick="contactLead.handleClickAssignEmail();return false;" class="btn btn-medium-short btn-white-short">
                              ${getConfigMessage.strings.Lead.AssigningMail}
                             </button>
                          </div>
                        </div>
                        <div class="row-footer">
                          <div class="notification-static">
                            <i class="icon-ws-ico-min-info"></i>
                            <div class="paragraph-messagge">${getConfigMessage.strings.Lead.MessageBill}</div>
                          </div>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);

  };

  const emailContact = (email, contact) => {
    const template = ` <div class="content-email-contact  form-group">
                         <div class="multi-selection-form radio">
                           <div class="row-email">
                             <label class="container-label radio email-contact">${getConfigMessage.strings.Lead.Email}</label>
                             <p>${email}</p>
                            ${contact.type === contactType.representative ? "" : `<div class="button-check-email">
                             <button
                               type="button"
                               id="btnCheckEmail"
                               onClick="validationEmail.handleClickCheckEmail(this,true)"
                               class="btn btn-medium btn-white"
                             >
                               ${getConfigMessage.strings.Lead.ValidateEmail}
                             </button></div>`}
                           </div>
                         </div>
                         ${contact.type === contactType.representative ? "" :
        `<div class="notification-static-contact">
                          <div class="notification-static info">
                           <p>${getConfigMessage.strings.Lead.TextValidateLater}</p>
                          </div>
                         </div>`}
                         <div class="content-multiselection check-email">
                           <label class="container-label check form-group">
                             ${getConfigMessage.strings.Lead.OtherEmailContact}
                             <input type="checkbox" id="checkOtherEmailFact" onClick="contactLead.handleClickOtherContactBill(this);" />
                             <span class="checkmark"></span>
                           </label>
                         </div>
                       </div>`;

    return confi.createVirtualDOM(template);
  };

  const emailListContact = (emails, contact) => {

    let $email1 = "";
    let $email2 = "";

    if (emails) {
      $email1 = emails[0];
      $email2 = emails[1];
    }

    const template = `<div class="content-email-contact form-group  list-electronic-billing">
                        <div class="content-multiselection list-email">
                          <div class="first-email">
                            <label class="container-label radio">${getConfigMessage.strings.Lead.Email}
                              <input type="radio" name="name" value="" onChange="contactLead.handleChangeEmailAlterno(this,false,'${contact.type}')" />
                              <span class="radiomark"></span>
                            </label>
                            <p>${$email1}</p>
                          </div>
                          <hr class="separator" />
                          <div class="list-email">
                            <label class="container-label radio">${getConfigMessage.strings.Lead.EmailAlterno}
                              <input type="radio" name="name" value="alterno" onChange="contactLead.handleChangeEmailAlterno(this,true)" />
                              <span class="radiomark"></span>
                            </label>
                            <p>${$email2}</p>
                          </div>
                        </div>
                        <div class="content-multiselection check-email">
                          <label class="container-label check form-group">
                            ${getConfigMessage.strings.Lead.OtherEmailContact}
                            <input type="checkbox" id="checkOtherEmailFact" onClick="contactLead.handleClickOtherContactBill(this);" />
                            <span class="checkmark"></span>
                          </label>
                        </div>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const buildDatFormContact = (form, dataContact, idContact = null) => {

    let id = null;
    let type = null;
    let company = null;
    let country = null;

    if (idContact !== null) {
      id = idContact;
      type = contacts[idContact].infoContact.type;
    }
    else {
      id = contacts.length;
      type = existContactPrincipal() ? contactType.commercialContact : contactType.representative;
    }

    const roles = getRoleByContact(dataContact);

    //const ocupation = type === contactType.representative ? `Representante legal  ${roles ? `- ${roles}` : ""}` : roles;
    const ocupation = type === contactType.representative ? `${roles ? `${roles}` : ""}` : roles;

    return {
      infoContact: {
        id,
        type,
        ocupation,
        company,
        country,
        fullName: `${dataContact.firstname} ${dataContact.lastname}`,
        ...dataContact,
      },
      formContact: form.cloneNode(true),
    };
  };

  const validateInitFormContact = () => {
    const $formLead = document.querySelector(".form-Lead");
    validateForm.init($formLead);
  };

  const validateInitFormAddContact = (e) => {
    if (e) {
      const $contentContentContact = e.closest(".content-contact");
      if ($contentContentContact) {
        const $formContact = $contentContentContact.querySelector("#contact-form");
        validateForm.init($formContact);
      }
    }
  };


  const handleClickAddContact = () => {
    debugger
    const $contentNotificationDocument = document.querySelector('.content-notification');
    if ($contentNotificationDocument) {
      if ($contentNotificationDocument.childElementCount != 0) {
        confi.scrollTo(0, 900);
        return;
      }
    }

    isClickAddContact = true;
    changeClick = false;   

    const { checkValidFields, form, getValues, trigger, reset } = validateForm.getValidation();
    trigger();

    notificationLead.setNotificationDefault();
    if (checkValidFields() && !document.getElementsByName("emailaddress3")[0].classList.contains("is-error")) {

      if (existContactPrincipal()) {
        validationEmail.SetValidateSuccessEmail(true);
      }

      //validamos si se verifo el email
      if (validationEmail.validateSuccessEmail()) {

        //validamos si el email ya existe
        const email = document.querySelector("input[name = emailaddress1]").value;
        //if (serviceEmailCode.validateExistingEmail(email)) {
        if (true) {
          notificationLead.init();
          const $checkEmail = document.querySelector(".section-content #chkOtherEmail");
          if ($checkEmail?.checked && !validationEmail.validateSuccessEmail()) {
            notificationLead.getNotificationByStep(leadForm.getState());
            confi.scrollTo(0, 900);
            return;
          }

          /// query selector search input form contact
          const objCardContact = buildDatFormContact(form.querySelector(".section-content"), getValues());

          const $contentElectronicBill = document.querySelector(".content-electronic-bill");
          const elements = $contentElectronicBill?.querySelectorAll(".content-contact").length || 0;
          ;

          if (!existContactPrincipal()) {
            const $referenceNode = document.querySelector(".title-section");
            $referenceNode.insertAdjacentElement("afterend", templateFields.createContactList(objCardContact.infoContact));

            //insertamos el contacto en la seccion de fact electronica
            if (elements > 0) {
              const $referenceElectBill = document.querySelector(".row-body-content");
              $referenceElectBill.insertAdjacentElement("afterend", templateLead.createSelectContact(objCardContact.infoContact));
            }

            if (!contactLead.isElectronicBill())
              contactLead.sectionNextDisable(false);
          }
          else {
            let $contentList = document.querySelector(".content-contact-list");

            if (!$contentList) {
              const $contentAdministrator = document.querySelector(".representative");
              const $content = $contentAdministrator.closest(".content-contact");

              let $adictionalInformation = document.querySelector(".contact-other-contact");
              let $section = $adictionalInformation.closest(".section-content");
              $section.insertBefore(listContact(), $adictionalInformation);
              $contentList = document.querySelector(".content-contact-list");
            }
            $contentList.appendChild(templateFields.createContactList(objCardContact.infoContact));

            //insertamos el contacto en la seccion de fact electronica
            if (elements > 0) {
              const $referenceElectBill = document.querySelector(".contact-new");
              $referenceElectBill.insertAdjacentElement("beforebegin", templateLead.createSelectContact(objCardContact.infoContact));
            }

            //agregamos el boton
            const buttonOtherContact = document.querySelector(".contact-other-contact");
            if (!buttonOtherContact) {
              const $referenceContactList = document.querySelector(".content-contact-list");
              const $section = $referenceContactList.closest(".section-content");
              renderAddotherContact($section, $referenceContactList);
            }
          }

          //agregamos al arreglo
          ;
          //indicativo
          let dialCode = "+";
          dialCode = dialCode.concat(intlTelInputLead.getDialCode());
          let mobilePh = dialCode.concat(objCardContact.infoContact.mobilephone);
          objCardContact.infoContact.mobilephone = mobilePh;
          addContact(objCardContact);

          //validamos si ees administrador o no
          setOptionEmailContact();

          //eliminamos iInfo contacts
          const $infoContact = document.querySelector(".info-contacts");
          $infoContact?.remove();


          if (companyLead.getCompanyId() === "XCR") {
            //eliminar DOM virtual creado solo para XCR

            const $section = document.querySelector(".section-content");
            const $contentDocument = document.querySelector("#content-Dependency-Contact");

            if ($contentDocument != null)
              $section.removeChild($contentDocument);

            document.getElementsByClassName("floating-label")[0].style.display = "none";
          }


          //boton agregar contacto otro contacto
          if (contacts.length === 1) {
            // createButtonOtherContact
            const $adictionalInformation = document.querySelector(".adictional-information");
            const $section = $adictionalInformation.closest(".section-content");
            const $sectionButton = document.querySelector(".contact-other-contact");

            const $sectionNext = document.querySelector(".section-next-step");

            if (!$sectionButton) {
              const $contactList = document.querySelector(".content-contact-list");
              if (!$contactList)
                $section.insertBefore(listContact(), $adictionalInformation);
              else
                $contactList.classList.remove("d-none");

              renderListGeneral($section, $adictionalInformation);

              if (isElectronicBill())
                renderElectronicBilling($sectionNext, $adictionalInformation);
            }
            else
              $sectionButton.classList.remove("d-none");

            // adictionalInformation(false);
          }
          adictionalInformation(false);
          notificationsShow(false);
          formAddContact(false);
          buttonContactAdd(false);
          confi.scrollTo(0, 900);

          reset();
        }
        else {
          const messages = [getConfigMessage.strings.Lead.ErrorValidateDocument];
          notificationLead.getNotificationWarning(messages);
        }

      }
      else {
        //const messages = [getConfigMessage.strings.Lead.ValidSucessEmail];
        //notificationLead.getNotificationError(messages);
      }

      //reseteamos check features
      selectFeatures = [];

      removeIsError();
    }

    //
    if (isElectronicBill())
      sectionNextDisable(true);


    const $contactsBill = document.querySelector(".content-electronic-bill")?.querySelectorAll(".content-contact");
    if ($contactsBill) {
      $contactsBill.forEach(contactBill => {
        const msg = contactBill.closest(".form-group")?.querySelector(".input-msg");
        if (msg) msg.remove();
      })
    }

    isClickAddContact = false;
    validationLeadExistence.initNotificationsForm();
    contactsXpandCollapseFact();
  };

  const adictionalInformation = (show) => {
    const $adictionalInformation = document.querySelector(".adictional-information");
    if (show) {
      $adictionalInformation.classList.remove("d-none");
    }
    else {
      $adictionalInformation.classList.add("d-none");
    }
  };

  const notificationsShow = (show) => {
    const $notificactions = document.querySelectorAll(".section-content .notification-static-contact");
    if (show) {
      $notificactions.forEach(not => {
        if (not.classList.contains("d-none"))
          not.classList.remove("d-none");
      });
    }
    else {
      $notificactions.forEach(not => {
        not.classList.add("d-none");
      });
    }
  };

  const buttonContactAdd = (show) => {
    const $contactAdd = document.querySelector(".contact-add");

    if (show) {
      $contactAdd.classList.remove("d-none");
    }
    else {
      $contactAdd.classList.add("d-none");
    }
  };

  const buttonAddContactOther = (show) => {
    const $contactAdd = document.querySelector(".contact-other-contact");
    if (show) {
      $contactAdd.classList.remove("d-none");
    }
    else {
      $contactAdd.classList.add("d-none");
    }
  };

  const representanteLegalHidden = (show) => {
    const $input = document.querySelector("input[name=SelectFeatures1]");
    const $parent = $input.closest(".container-label");

    if (show) {
      $parent.classList.remove("d-none");
      $input.checked = false;
    }
    else {
      $parent.classList.add("d-none");
      $input.checked = true;
    }
  };

  const formAddContact = (show) => {

    const $sectionForm = document.querySelector(".section-content");
    const $addContactForm = $sectionForm.querySelectorAll(":scope > .field, .input-group,.floating-label,.form-group, .multi-selection-form,.floating-label,#content-Dependency-Contact,.content-validation-email");
    const $notification = document.querySelector(".notification-static.info");

    if (show) {
      $addContactForm.forEach(elm => elm.classList.remove("d-none"));
      //$notification.classList.remove("d-none");

      if (companyLead.getCompanyId() === "XCR") {
        const $floatingLabel = document.getElementsByClassName("floating-label");
        if ($floatingLabel != null)
          $floatingLabel[0].style.display = "flex";
      }
    }
    else {
      //$notification.classList.add("d-none");
      $addContactForm.forEach(elm => elm.classList.add("d-none"));
    }


  };

  const findContact = (contact) => {
    if (contact.infoContact.id === idContactFact) {
      return contact.infoContact;
    }
  };

  const selectEmailbyContact = (idContact) => {
    const contact = contacts.find(findContact).infoContact;
    //const contact = contacts[idContact].infoContact;
    const email1 = contact.emailaddress1;
    const email3 = contact.emailaddress3;

    let template = '';

    if (email1 && email3 === "") {
      template = emailContact(email1, contact);

      //$contentElectronicBill = document.querySelector(".content-contact-list");
    }

    if (email1 && email3) {

      let emails = [];

      emails.push(email1);
      emails.push(email3);

      template = emailListContact(emails, contact);

      $contentElectronicBil2l = document.querySelector(".content-contact-list");
    }
    return template;

  };

  const handleSectionContactComplete = (e) => {
    debugger
    isClickEditContact = true;
    //cerramos las otras secciones de contactos abiertas
    contactsXpandCollapse();

    const $contentContentContact = expandToggleEditContact(e);
    const idContact = $contentContentContact.dataset.id;

    //render form
    const $formContact = $contentContentContact.querySelector("#contact-form");
    const formDataContact = contacts[idContact]?.formContact;

    const $fieldsContactForm = formDataContact.cloneNode(true).
      querySelectorAll(":scope > .field,.input-group , #content-Dependency-Contact, .multi-selection-form:not(.only-option),.floating-label,.content-validation-email");

    $fieldsContactForm.forEach(element => $formContact.appendChild(element));
    $formContact.appendChild(templateFields.createTemplateEdtionContact());
    validateForm.init($formContact);

    //asignamos el evento onchange
    const $email = document.querySelector("input[name=emailaddress1]");

    //$email.addEventListener('change', (event) => {

    //});

    const $contentVerifyEmail = document.querySelector(".content-verification-code");
    if ($contentVerifyEmail)
      $contentVerifyEmail.remove();


    selectFeatures = [];
    contactOld = -1;

    removeIsError();
    //validateInitFormContact();
    //leadForm.initValidationForm();

  };

  const handleClickCancelEdition = (e) => {

    notificationLead.init();
    const $contentContentContact = expandToggleEditContact(e);
    $contentContentContact.querySelector("#contact-form").innerHTML = '';
    removeIsError();
    validateInitFormContact();
  };

  const contactsXpandCollapse = () => {
    //cerramos las otras secciones de contactos abiertas
    const $section = document.querySelector(".section-content");
    const $sectionsContacts = $section.querySelectorAll(".content-contact.expand-collapse");
    $sectionsContacts.forEach(contact => {
      expandEditContactCancel(contact);
    });
  }
  const expandEditContactCancel = (element) => {
    const $contentContentContact = element;//element.closest(".content-contact");
    const $links = $contentContentContact.querySelector(".content-link");

    if ($contentContentContact.classList.contains("expand-collapse")) {
      if ($links) {
        if ($links.classList.contains("d-none"))
          $links.classList.remove("d-none");
      }

      $contentContentContact.classList.remove("expand-collapse");
      const $contactFormSelect = $contentContentContact.querySelector("#contact-form");
      if ($contactFormSelect)
        $contactFormSelect.innerHTML = '';

      validateInitFormContact();
    }
  };

  //fact
  const contactsXpandCollapseFact = () => {
    //cerramos las otras secciones de contactos abiertas
    const $section = document.querySelector(".content-electronic-bill");
    if ($section) {
      const $sectionsContacts = $section.querySelectorAll(".content-contact.expand-collapse");
      $sectionsContacts.forEach(contact => {
        expandEditContactCancelFact(contact);
      });
    }
  }
  const expandEditContactCancelFact = (element) => {
    const $contentContentContact = element;//element.closest(".content-contact");

    if ($contentContentContact.classList.contains("expand-collapse")) {
      const $contactFormSelect = $contentContentContact.querySelector(".content-email-contact");
      if ($contactFormSelect)
        $contactFormSelect.remove();

      $contentContentContact.classList.remove("expand-collapse");
    }
  };
  //fin fact

  const DeleteContactElectronicBill = (id) => {
    const $contactBill = document.querySelector(`.contact-bill${id}`);
    if ($contactBill)
      $contactBill.remove();
  };

  const handleDeleteSection = (e) => {

    const $contentContentContact = e.closest(".content-contact");
    const $contentList = $contentContentContact.closest(".content-contact-list");

    deleteContact(parseInt($contentContentContact.dataset.id));
    if ($contentList) {
      if (existOtherContact())
        $contentContentContact.remove();
      else {
        $contentList.remove();
      }
    }
    else {
      $contentContentContact.remove();
      formAddContact(true);
      adictionalInformation(true);
      buttonAddContactOther(false);
      buttonContactAdd(true);

      //info contacts
      const $infoContact = document.querySelector(".info-contacts");
      $infoContact?.remove();
    }

    //bloqueamos el boton siguiente paso
    if (idContactFact == $contentContentContact.dataset.id) {
      if (isElectronicBill())
        sectionNextDisable(true);
    }

    validateInitFormContact();
    setOptionEmailContact();
    DeleteContactElectronicBill($contentContentContact.dataset.id);
  };

  const handleClickUpdateContact = (e) => {
    const $contentNotificationDocument = document.querySelector('.content-notification');
    if ($contentNotificationDocument) {
      if ($contentNotificationDocument.childElementCount != 0) {
        confi.scrollTo(0, 900);
        return;
      }
    }

    isClickAddContact = true;

    const { checkValidFields, form, getValues, trigger, } = validateForm.getValidation();
    trigger();


    const $contentContentContact = e.closest(".content-contact");
    const contactId = parseInt($contentContentContact.dataset.id);
    const contactData = contacts[contactId].infoContact;
    notificationLead.setNotificationDefault();

    if (!validationEmail.validateSuccessEmail() && contactData.type === contactType.representative) {
      const messages = [getConfigMessage.strings.Lead.ValidSucessEmail];
      notificationLead.getNotificationError(messages);
      return;
    }

    if (checkValidFields() && !document.getElementsByName("emailaddress3")[0].classList.contains("is-error")) {
      const objCardContact = buildDatFormContact(form, getValues(), contactId);

      //Update contact
      updateContact(objCardContact, contactId);

      //update card
      updateCardContact(contactId);

      const $contextText = $contentContentContact.querySelector(".content-text");
      const $texFullName = $contextText.querySelector("p");
      const textOcupation = $contextText.querySelector("p:nth-child(2)");

      const { fullName, ocupation, } = objCardContact.infoContact;

      $texFullName.innerText = fullName;
      textOcupation.innerText = ocupation;
      expandToggleEditContact(e);
      $contentContentContact.querySelector("#contact-form").innerHTML = '';
      removeIsError();
      validateInitFormContact();
    }
    isClickAddContact = false;
    isClickEditContact = false;
    validationLeadExistence.initNotificationsForm();
  };

  const updateCardContact = (idContact) => {

    if (assingClick) {
      //eliminamos el contacto para actualizarlo
      DeleteContactElectronicBill(idContact);

      const $contentElectronicBill = document.querySelector(".content-electronic-bill").querySelector(".contact-new");
      const $rowBody = document.querySelector(".row-body-content");

      const contactUpdate = contacts[idContact].infoContact;
      if (contactUpdate.emailaddress1 != "") {
        if (contactUpdate.type === contactType.representative)
          $rowBody.insertAdjacentElement("afterend", templateLead.createSelectContact(contactUpdate));
        else
          $contentElectronicBill.insertAdjacentElement("beforebegin", templateLead.createSelectContact(contactUpdate));
      }
    }

  };

  const setCheckOtherEmail = () => {
    const $elm = document.querySelector("input[name = emailaddress1]");
    const $parent = $elm.parentElement;

    //check
    const $check = $elm.closest(".container-label.check");
    if (!$check)
      $parent.after(otherEmailContactPrincipal());
  };

  const deleteCheckOtherEmail = () => {
    ;
    const $elm = document.querySelector(".check");
    const $parentCheck = $elm.parentElement;
    const $notification = document.querySelector(".notification-static-contact");
    const $section = document.querySelector(".section-content");
    const $contentValidate = document.querySelector(".content-validation-email");

    if ($contentValidate != null)
      $section.removeChild($contentValidate);

    if ($elm != null) {
      //  $section.removeChild($parentCheck);

      let $email = document.querySelector('input[name = emailaddress1]');
      if (!$email) {
        const $elmNotification = document.querySelector(".notification-static-contact");
        //$elmNotification.classList.remove("d-none");
        //reconstrumimos el email anterior
        const $contentNot = document.querySelector('input[name = emailaddress3]').closest(".form-group");//document.querySelector('.notification-static-contact');
        $section.insertBefore(cloneNodeEmail, $contentNot);
      }

      $email = document.querySelector('input[name = emailaddress1]');
      if ($email?.classList.contains("element-disabled")) {
        $email.classList.remove("element-disabled");
        $email.setAttribute("required", "");
        $email.setAttribute("data-required", "");

        //leadForm.initValidationForm();  //789
        validateInitFormContact();
      }
    }
    if ($notification != null) {
      const $notificationText = document.querySelector(".notification-static-contact p");
      $notificationText.innerHTML = getConfigMessage.strings.Lead.TextInformationContactWebStore;
    } else {
      //setNotificationContact(TextInformationContactWebStore);
    }
  };

  const setNotificationContact = (text) => {
    const $elm = document.querySelector(".container-label");
    const $elmParent = $elm.parentElement;
    $elmParent.after(templateLead.templateNotificationStaticEmailContact(text));
  };

  const setOptionEmailContact = () => {

    const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();


    if (!existContactPrincipal()) {
      const $notification = document.querySelector(".notification-static-contact");
      const $email = document.querySelector('input[name = emailaddress1]');
      $email.value = completeStepts[0].dataCompany.emailaddress2;
      //$email.classList.add("element-disabled");

      //cambiamos el nombre al boton
      document.querySelector("#addContact").innerHTML = getConfigMessage.strings.Lead.AddContactAdministrator;

      //quitamos la notificacíon
      const $notificationRoles = document.querySelector(".contact-add .notification-static-contact");
      $notificationRoles?.remove();

      //check representante legal
      representanteLegalHidden(false);
    }
    else {
      if (getContacts().length < 2)
        deleteCheckOtherEmail();

      representanteLegalHidden(true);
    }
  };

  const otherEmailContactPrincipal = () => {

    const template = `<div class="field form-group">
                       <label class="container-label check">${getConfigMessage.strings.Lead.TextCheckEmailAdministrator}
                        <input type="checkbox" id="chkOtherEmail" onClick="contactLead.handleCheckOtherEmailContact(this)">
                        <span class="checkmark"></span>
                       </label>
                      </div>`;

    return confi.createVirtualDOM(template);
  };

  const cloneContentEmailAddress = () => {

    const $elmEmailContact = document.querySelector("input[name=emailaddress1]");
    const $parentEmail = $elmEmailContact.parentElement;

    cloneNodeEmail = $parentEmail.cloneNode(true);
  };

  const handleCheckOtherEmailContact = (e) => {
    const $referenceNode = e.closest(".form-group");
    const $elmNotification = document.querySelector(".notification-static-contact");

    //eliminamos email anterior
    const $elmEmailContact = document.querySelector("#contact-form input[name=emailaddress2]") || document.querySelector("input[name=emailaddress1]");
    const $parentEmail = $elmEmailContact.parentElement;
    const $sectionContent = $referenceNode.parentElement;

    if (e.checked) {
      $sectionContent.removeChild($parentEmail);

      $referenceNode.after(templateLead.templateValidationEmail(true));
      const $buttonVerify = document.querySelector(".button-check-email");
      $buttonVerify.style.position = "absolute";
      $buttonVerify.style.animation = "validatemail 0.2s";
      $buttonVerify.style.animationFillMode = "forwards";

      const $otherEmail = document.querySelector(".electronic-billing");
      const $elmEmail = e.closest(".form-group").parentElement.querySelector('input[name=emailaddress1]');;
      $elmEmail.setAttribute("required", "");
      $elmEmail.setAttribute("data-required", "");

      if ($otherEmail.classList.contains("d-none"))
        $otherEmail.classList.remove("d-none");

      //quitamos la notificacion anterior
      $elmNotification.classList.add("d-none");

      //insertamos notificacion
      const $contentNotification = document.querySelector(".content-validation-email");
      $contentNotification.appendChild(templateLead.templateNotificationStaticEmail(getConfigMessage.strings.Lead.TextInformationEmailWebStore));
      const elm = document.querySelector(".inputs-other-email");
      elm.classList.remove("d-none");


      const $formContact = e.closest("#contact-form");
      if ($formContact)
        validateForm.init($formContact);
    }
    else {
      //const $formContact = document.getElementById("contact-form");
      ////$formContact ? validateForm.init($formContact) : leadForm.initValidationForm();
      //$formContact ? validateForm.init($formContact) : null;

      const $elm = document.querySelector(".content-validation-email");
      const parent = $elm.parentElement;
      parent.removeChild($elm);

      //mostramos notificacion
      $elmNotification.classList.remove("d-none");

      //reconstrumimos el email anterior
      const $contentcheckValidate = document.querySelector("#contact-form .container-label") || document.querySelector(".container-label");
      $contentParent = $contentcheckValidate.parentElement;
      $sectionContent.insertBefore(cloneNodeEmail, $contentParent);

      const $formContact = document.getElementById("contact-form");
      $formContact ? validateForm.init($formContact) : validateInitFormContact();//789
    }


  };

  //mostramos los contactos para seleecion de facturacion eletronica
  const handleClickAssignEmail = () => {
    changeClick = true;
    const $contentElectronicBill = document.querySelector(".content-electronic-bill");
    const $notification = $contentElectronicBill.querySelector(".row-body-content").querySelector(".notification-static");

    const $footerElectronicBill = $contentElectronicBill.querySelector(".row-footer");

    //cambiamos el mensaje
    setParagraphBill(getConfigMessage.strings.Lead.SelectionElectronicBilling);

    //Eliminamos notificacion y footer del content
    $notification.remove();
    $footerElectronicBill.remove();

    //agregamos la lista de contactos creados  para su seleccion de facturacion electronica
    contacts.forEach(contact => {

      if (contact.infoContact.emailaddress1 != "")
        $contentElectronicBill.appendChild(templateLead.createSelectContact(contact.infoContact));
    });

    $contentElectronicBill.appendChild(templateLead.createSelectContactNew());

    assingClick = true;
  };

  //validamos si pais aplica para facturacion electronica
  const isElectronicBill = () => {

    const keyElectBill = leadModule.electronicBillingLead;

    if (keyElectBill.includes(companyLead.getCompanyId())) {
      return true
    }
    else return false;
  };

  //Seleccion contacto facturacion eletronica
  const handleChangeSelectContact = (e) => {
    if (changeClick) {
      const $contentContact = e.closest(".content-contact");
      const idContact = parseInt($contentContact.dataset.id);

      //cerramos si hay una seccion abierta de otro contacto
      const $contactsBill = document.querySelector(".content-electronic-bill").querySelectorAll(".content-contact");
      $contactsBill.forEach(contactBill => {
        cancelSectionSelectEmailBill(contactBill);
      })

      //quitamos los requeridos
      $contactsBill.forEach(contactBill => {
        const msg = contactBill.closest(".form-group")?.querySelector(".input-msg");
        if (msg) msg.remove();
      })

      idContactFact = idContact;
      const $contentEmailsBill = expandContactBill(e);
      $contentEmailsBill.appendChild(selectEmailbyContact(idContact));

      //seleccion de email
      if (isElectronicBill())
        selectEmailElectronicBilling(e, idContact);

    }
    changeClick = true;
  };

  //expandimos la seeccion al seleccionar contacto para facturacion eletronica
  const expandToggleContactBill = (element) => {
    const $contentContentContact = element.closest(".content-contact");
    if ($contentContentContact.classList.contains("expand-collapse"))
      $contentContentContact.classList.remove("expand-collapse");

    //$contentContentContact.classList.toggle("expand-collapse");

    return $contentContentContact;
  }

  const expandContactBill = (element) => {
    const $contentContentContact = element.closest(".content-contact");
    if (!$contentContentContact.classList.contains("expand-collapse"))
      $contentContentContact.classList.add("expand-collapse");

    return $contentContentContact;
  }


  const cancelSectionSelectEmailBill = (e) => {
    if (e.classList.contains("expand-collapse")) {
      const $contentEmailsBill = expandToggleContactBill(e);
      const formgroup = $contentEmailsBill.querySelector('.form-group');
      if (formgroup)
        formgroup.remove();

    }
  };

  //change emial facturacion electronica
  const handleChangeEmailAlterno = (e, list = false, typeContact = "") => {

    //para chile no se valida OTP
    if (companyLead.getCompanyId() != "XCL") {
      //eliminamos el boton
      let $contentButton = null;
      if (!list)
        $contentButton = e.closest(".content-multiselection").querySelector(".list-email").querySelector(".button-check-email");
      else
        $contentButton = e.closest(".content-multiselection").querySelector(".first-email").querySelector(".button-check-email");


      if ($contentButton)
        $contentButton.remove();

      //elinimos la seccion de verificacion
      const $verfifyCode = e.closest(".content-multiselection").querySelector(".content-verification-code");
      if ($verfifyCode)
        $verfifyCode.remove();



      //eliminamos la seecion de validacion de email para otro contacto
      const $contentEmailContact = e.closest(".content-email-contact");
      const $sectionValidationEmail = $contentEmailContact.querySelector(".content-validation-email");
      if ($sectionValidationEmail) $sectionValidationEmail.remove();

      //ckecked false
      $contentEmailContact.querySelector('input[type=checkbox]').checked = false;

      const $reference = document.querySelector('.check-email');
      const $not = document.querySelector(".content-email-contact > .notification-static-contact");

      //si el contacto es administrador no se muestra el boton
      if (typeContact != contactType.representative) {
        //insertamos notificacion
        if (!$not)
          $reference.insertAdjacentElement("beforebegin", templateLead.templateNotificationStaticEmailContact(getConfigMessage.strings.Lead.TextValidateLater));

        if (e.checked === true) {
          let $contentEmail = null;

          if (list)
            $contentEmail = e.closest(".list-email");
          else
            $contentEmail = e.closest(".first-email");

          $contentEmail.appendChild(templateLead.templateButttonEmailAlterno());
        }
      } else {

        //elinimos la seccion de verificacion
        const $verfifyCode = e.closest(".content-multiselection").querySelector(".content-verification-code");
        if ($verfifyCode)
          $verfifyCode.remove();
      }
    }
    else {
      //elminamos la notificacion
      const $not = document.querySelector(".content-email-contact > .notification-static-contact");
      if ($not)
        $not.remove();


      //eliminamos la seecion de validacion de email para otro contacto
      const $contentEmailContact = e.closest(".content-email-contact");
      const $sectionValidationEmail = $contentEmailContact.querySelector(".content-validation-email");
      if ($sectionValidationEmail) $sectionValidationEmail.remove();

      //ckecked false
      $contentEmailContact.querySelector('input[type=checkbox]').checked = false;

      //eliminamos la notificacion
      if ($not)
        $not.remove();
    }
    sectionNextDisable(false);
  };

  //establacemos el mensaje de la seccion de facturacion electronica
  const setParagraphBill = (message) => {
    const $paragraphBill = document.querySelector(".paragraph-bill");
    if ($paragraphBill) $paragraphBill.innerHTML = message;
  };

  //otro correo para facturacion electronica
  const handleClickOtherContactBill = (e) => {
    debugger
    const $contentotherEmailBill = e.closest(".content-email-contact");
    const $button = $contentotherEmailBill.querySelector(".button-check-email");
    if (e.checked) {
      const $rowEmail = $contentotherEmailBill.querySelector(".row-email");

      //quitamos las opciones del email seleccionados anteriormente
      const $radioEmails = $contentotherEmailBill.querySelectorAll('input[type=radio]');
      $radioEmails.forEach(radio => { radio.checked = false; });

      const $not = document.querySelector(".content-email-contact > .notification-static-contact");
      //quitamos el boton
      if (!$rowEmail) {
        if ($button) $button.remove();

        //quitamos notificacion
        if ($not) $not.remove();
      }
      else {
        if ($button)
          $button.classList.add("d-none");
        if ($not)
          $not.classList.add("d-none");
      }

      // si existe una seccion anterior de validacion la eliminamos
      const $contentValidation = $contentotherEmailBill.querySelector(".content-verification-code");
      if ($contentValidation) $contentValidation.remove();

      //insertamos la seccion de validacion de email
      $contentotherEmailBill.appendChild(templateLead.templateValidationEmail(false, false));
      //colocamos notificacion
      document.querySelector('.content-validation-email').appendChild(templateLead.templateNotificationStaticEmailContact(getConfigMessage.strings.Lead.TextValidateLater));


      //si es chile quitamos el boton validacon otp
      if (companyLead.getCompanyId() === "XCL") {
        const $contentVal = document.querySelector(".content-electronic-bill .content-validation-email");
        const $buttonVal = $contentVal.querySelector("#btnCheckEmail");

        if ($buttonVal) $buttonVal.remove();
      }


      //habilitamos el boton
      sectionNextDisable(false);
    }
    else {
      $contentotherEmailBill.querySelector(".content-validation-email").remove();
      const $not = document.querySelector(".content-email-contact > .notification-static-contact");

      if ($button)
        $button.classList.remove("d-none");

      if ($not)
        $not.classList.remove("d-none");


      //deshabilitamos el boton
      sectionNextDisable(true);
    }

    leadForm.initValidationForm();

  };

  const sectionNextDisable = (disabledSection = false) => {
    const $sectionNext = document.querySelector(".section-next-step");
    const $buttonNext = $sectionNext.querySelector(".next");
    if (disabledSection) {
      $sectionNext.classList.add("section-next-step-disabled");
      $buttonNext.setAttribute("disabled", "");

    }
    else {
      if ($sectionNext.classList.contains("section-next-step-disabled")) {
        $sectionNext.classList.remove("section-next-step-disabled");
        $buttonNext.removeAttribute("disabled");
      }
    }
  };

  //guardamos el email que se seleeciono
  const selectEmailElectronicBilling = (element, idContact) => {
    const $sectionContact = element.closest(".content-contact");
    const $contentEmail = $sectionContact.querySelector(".content-email-contact");

    const $rowEmailtemplate = $contentEmail.querySelector(".row-email");

    //si se habia selecionado otro contacto ateriormente lo seteamos el guid de facturacion electronica
    setGuidElectronicBillingByContacts();

    if ($rowEmailtemplate) {

      let infoContact = contacts[idContact].infoContact;

      //agregamos la informacion de facturacion electronica
      infoContact.GuidElectronicBilling = "4538f713-c414-eb11-a813-000d3a5915b2";

      const email = $rowEmailtemplate.querySelector("p").innerHTML;

      updateInfoLeadAtributes(email, false, false);
      //habilitamos la seccion siguiente
      sectionNextDisable(false);
      successElectronicBilling = true;
    }
    else {
      sectionNextDisable(true);
      successElectronicBilling = false;
    }

  };

  const validateSuccessElectronicBilling = () => successElectronicBilling;

  const assignRolContactElectronicBilling = (idContact) => {

  };

  const handleValidChangeEmail = (e) => {
    const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();
    if (initialSteps[currenIndexStep].SteptName === getConfigMessage.strings.Lead.ContactsInformation) {
      const emailOld = validationEmail.getEmailValid();
      const email = e.value;

      if (emailOld != "") {
        if (emailOld != email) {
          validationEmail.SetValidateSuccessEmail(false);
        }
        else
          validationEmail.SetValidateSuccessEmail(true);
      }
    }
  };


  //actualizamos la informacion hacia CRM
  const updateInfoLeadAtributes = (email, isEmailAlternate, isValidOTP) => {
    //let { state } = leadForm.getState();
    //const { initialSteps, completeStepts, currenIndexStep } = leadForm.getState();
    //let parentLead_atributes = completeStepts[0].dataCompany;

    //if (isEmailAlternate) {
    //  parentLead_atributes.emailaddress1 = email;
    //} else {
    //  parentLead_atributes.ph_invoiceemail = email;
    //  parentLead_atributes.emailaddress1 = email;
    //  parentLead_atributes.emailaddress1 = email;
    //}

    //parentLead_atributes.IsValidOTP = isValidOTP;
  };

  const validateCheckOtherEmail = () => {
    let resultValidate = true;
    const $check = document.querySelector("#checkOtherEmailFact");
    if ($check) {
      if ($check.checked) {
        const $emailCheck = document.querySelector("input[name=ph_invoiceemail]");
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (emailRegex.test($emailCheck.value))
          resultValidate = true;
        else
          resultValidate = false;
      }
    }
    return resultValidate;
  };

  const setGuidElectronicBillingByContacts = () => {
    contacts.forEach(contact => {
      contact.GuidElectronicBilling = null;
    });

  };

  const handleClickSelectFeatures = (e) => {

    if (existContactPrincipal()) {
      const typeContact = e.closest(".content-contact")?.querySelector(".representative");

      if (typeContact)
        return;

      const $contentContact = e.closest(".content-contact");
      const labelCheck = e.closest(".container-label").innerText;
      //const $email = document.querySelector("input[name = emailaddress1]");
      //const $email = e.closest("#contact-form")?.querySelector("input[name = emailaddress1]") || document.querySelector("input[name = emailaddress1]");
      let $email = "";//e.closest("#emailaddress1");
      if ($contentContact)
        $email = e.closest("#contact-form")?.querySelector("input[name = emailaddress1]");
      else
        $email = document.querySelector("input[name = emailaddress1]");

      const $contentEmail = $email.closest(".form-group");
      const $errorContent = $contentEmail.querySelector(".input-msg");

      const $emailAlterno = e.closest("#contact-form")?.querySelector("input[name = emailaddress3]") || document.querySelector("input[name = emailaddress3]");
      const $ref = e.closest("#contact-form")?.querySelector(".notification-static-contact") || document.querySelector(".notification-static-contact");


      //if ($email.classList.contains("is-valid"))
      //  $email.classList.remove("is-valid");

      //if ($email.classList.contains("is-error"))
      //  $email.classList.remove("is-error");

      if ($errorContent) $errorContent.remove();

      // const cloneNodeEmail = $contentEmail
      //const referenceInsertEmail = $emailAlterno.closest(".notification-static-contact");

      //validamos si es un contacto ya creado
      let idContact = -1;
      if ($contentContact)
        idContact = parseInt($contentContact.dataset.id);
      //
      if ((idContact >= 0) && (contactOld != idContact)) {
        const infoContactEdit = contacts[idContact].infoContact;
        selectFeatures = infoContactEdit.ocupation.split("-").map(rol => rol.trim());
      }

      if (e.checked) {
        //agregamos el valor del check seleccionado
        selectFeatures.push(labelCheck);
      }
      else {
        removeSelectFeatures(selectFeatures, labelCheck);
      }


      //validamos el arreglo
      if (selectFeatures.length > 1) {
        if ($email.classList.contains("is-error"))
          $email.classList.remove("is-error");
        activeField(e, $email);
        activeFieldNotRequired($emailAlterno);
      }
      else if (selectFeatures.some(existSelectFeatures)) {
        if ($email.classList.contains("is-error"))
          $email.classList.remove("is-error");
        activeField(e, $email);
        activeFieldNotRequired($emailAlterno);
      }
      else {
        if ($email.classList.contains("is-valid"))
          $email.classList.remove("is-valid");

        if ($email.classList.contains("is-error"))
          $email.classList.remove("is-error");
        // $contentEmail.remove();
        // insertEmail($ref);
        blockField(e, $email);
        blockFieldNotRequired($emailAlterno);
        /// si existe el template de validacion de email lo eliminamos
        const $templateExistEmail = document.querySelector(".content-email-already-register");
        if ($templateExistEmail) $templateExistEmail.remove();
      }

      contactOld = idContact;
    }
  };


  const insertEmail = (reference) => {
    //const $section = document.querySelector(".section-content");
    //$section.insertBefore(cloneNodeEmail, reference);

    reference.insertAdjacentElement("afterend", cloneNodeEmail);
  };

  const existSelectFeatures = (element) => {
    return element === getConfigMessage.strings.Lead.Shop || element === getConfigMessage.strings.Lead.CloudContact || element === getConfigMessage.strings.Lead.PurchasingContact
      || element === getConfigMessage.strings.Lead.SignatureInvoice || element === getConfigMessage.strings.Lead.Marketing
      || element === getConfigMessage.strings.Lead.OtherContact || element === getConfigMessage.strings.Lead.InvoicePay
      || element === getConfigMessage.strings.Lead.LegalRepresentative;
  };

  var removeSelectFeatures = (arr, item) => {
    var i = arr.indexOf(item);
    i !== -1 && arr.splice(i, 1);
  };


  return {
    init,
    addContact,
    getContacts,
    handleSectionContactComplete,
    handleDeleteSection,
    deleteContact,
    existContactPrincipal,
    handleClickAddContact,
    handleClickCancelEdition,
    handleClickUpdateContact,
    handleCheckOtherEmailContact,
    validateInitFormContact,
    handleClickOtherContact,
    handleClickAssignEmail,
    handleChangeSelectContact,
    handleChangeEmailAlterno,
    handleClickOtherContactBill,
    sectionNextDisable,
    isElectronicBill,
    handleValidChangeEmail,
    handleClickSelectFeatures,
    validateCheckOtherEmail,
    getisClickAddContact,
    getisClickEditContact
  };

})();

document.addEventListener("DOMContentLoaded", () => {
});
