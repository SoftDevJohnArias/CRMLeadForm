/// <reference path="../intltelinput/utils.js" />
/// <reference path="../intltelinput/utils.js" />

/*Pruebaaaaaa */

const leadForm = (() => {

  const state = {
    initialSteps: [],
    completeStepts: null,
    currenIndexStep: 0,
    companyId: "",
    countryId: "",
    contactDocument: "",
  };

  //const TEXT_BOTTON_SEND = getConfigMessage.strings.Lead.Send;
  //const TEXT_BOTTON_NEXT = "CONTINUAR AL SIGUIENTE PASO";

  const getState = () => state;

  const init = async (companyId, sourceId) => {

    state.companyId = companyId;
    confi.initLoader();

    const resutlJson = await serviceRegisterLead.getSteptsSectionsFields(companyId);
    const { stepts, CountryID, companyPhone, ContactDocument } = JSON.parse(resutlJson);

    document.getElementById("companyPhone").innerText = companyPhone;
    //document.getElementById("countryId").innerText = countryId;
    state.initialSteps = stepts;
    state.countryId = CountryID;
    state.contactDocument = ContactDocument;

    //render steps
    stepsModule.renderSteps({ steps: state.initialSteps });

    //header - footer
    renderHeader(sourceId);
    renderFooter(sourceId);

    const [fristStep] = state.initialSteps;
    renderFormByCompany(fristStep);

    //validationRules.validateSectionNextEmail();
    confi.stopLoader();
  };

  const initValidationForm = () => {
    const $formLead = document.querySelector(".form-Lead");
    validateForm.init($formLead);
    $formLead.removeEventListener("submit", handleSubmit);
    $formLead.addEventListener("submit", handleSubmit);
  }

  const validateInputsPhone = (contentFields) => {
    const $inputs = contentFields.querySelectorAll(".input-phone");
    $inputs.forEach(phone => iMaskPhone.validateMaskPhone(phone, state.companyId));

    const $inputscell = contentFields.querySelectorAll(".input-cellphone");
    $inputscell.forEach(cell => iMaskPhone.validateMaskPhone(cell, state.companyId));
  };

  const validateInputsDocument = (sectionContent) => {
    //const $content = Array.from(sectionContent.getElementsByClassName("section-content"));
    const $content = Array.from(sectionContent.children);

    $content.forEach(field => iMaskDocument.validateMaskDocument(field, state.companyId, state.currenIndexStep));
  };

  const groupFields = (fields) => {
    const group = fields.reduce((prev, current) => {
      const groupId = current.group?.groupId;
      let groupItem = groupId ? `group-${groupId}` : current.name;
      if (!prev[groupItem])
        prev[groupItem] = [];
      prev[groupItem].push(current);

      return prev;
    }, {});

    const groupArray = Object.keys(group).map(key => group[key]);

    return groupArray.flatMap(value => value.length > 1 ? [[value]] : value);
  };

  const renderFormByCompany = ({ Sections }) => {

    try {

      const {
        createSectionFields,
        createSectionNextStep,
      } = templateFields;

      const htmlResult = Sections.map(({ SectionName, SubTitle, fields }) => {

        const htmlFields = renderFields(fields);
        return createSectionFields({ SectionName, SubTitle, htmlFields })
      }).join('');

      const $contentFields = document.querySelector(".content-fields");
      $contentFields.innerHTML = htmlResult;
      $contentFields.classList.add("fade-anima");

      ///validate phone numbers steps  
      validateInputsPhone($contentFields);
      validateInputsDocument($contentFields);

      ///Verify currentIndex step
      //firstStep
      if (state.currenIndexStep === 1) {
        ////render validation email
        validationEmail.initValidation();
      }

      if (state.currenIndexStep === 1)
        contactLead.init($contentFields);

      ///Render section next step(botton)
      $contentFields.appendChild(createSectionNextStep({ goBack: state.currenIndexStep > 0 }));

      if (state.currenIndexStep === 1) {
        //if (contactLead.isElectronicBill())
          contactLead.sectionNextDisable(true);
      }

      if (state.currenIndexStep === 2) {
        reCaptcha.initCaptcha();

        const $localeString = window.location.pathname;
        const $languageString = $localeString.split('/');

        let $language = $languageString[1];

        if ($language === 'LeadRegister') {
          $language = 'es';
        }

        let $keyUrl = leadModule.urlStoreService;

        if (state.companyId === 'XCB')
          $keyUrl = leadModule.urlStoreServiceXCB;

        const $tempUrl = $keyUrl.replace('{language}', $language);
        const $url = $tempUrl.replace('{company}', state.companyId);

        const $nodeSegment = document.querySelector('.content-google-recaptcha');
        $nodeSegment.insertAdjacentElement("beforebegin", templateLead.checkAcceptterms($url));
      }

      documentLead.init($contentFields);
      initValidationForm();

    } catch (e) {
      console.error(e.toString());
    }
  };

  const renderFields = (fields) => {
    const { getTemplateInput, createTemplateGroupFields } = templateFields;

    const resultGroup = groupFields(fields)

    return resultGroup.map(dataField => {
      ///array group fields
      if (Array.isArray(dataField)) {
        const [fields] = dataField;
        const htmlFields = fields.map(field => getTemplateInput(field)).join("");
        debugger
        return createTemplateGroupFields(htmlFields)
      }
      return getTemplateInput(dataField)
    }).join('');

  };

  const renderForm = (form) => {
    const $contentForm = document.querySelector(".form-Lead");
    $contentForm.innerHTML = "";

    [...form.childNodes].forEach(element => {
      $contentForm.appendChild(element);
    });

    const $contentFields = document.querySelector(".content-fields");
    const $sectionContent = document.querySelector(".section-content");

    documentLead.init($contentForm);
    validateInputsPhone($contentForm);
    validateInputsDocument($sectionContent);
    initValidationForm();

    if (state.currenIndexStep === 0) {
      if (companyLead.getCompanyId() === "XSV") {
        if (state.completeStepts[0].dataCompany.ph_IVATaxpayer1 !== null) {
          document.querySelector("input[name=ph_nrc1]").addEventListener("change", handleFieldNotRequired);
          document.querySelector("input[name=ph_nrc]").addEventListener("change", handleFieldNotRequired);

        }
      }
    }

    if (state.currenIndexStep === 2) {
      const $contentCaptcha = document.querySelector('.content-google-recaptcha');
      if ($contentCaptcha)
        $contentCaptcha.remove();

      reCaptcha.initCaptcha();
    }
  }

  const cloneForm = (form) => {


    if (form.id === "contact-form") {
      initValidationForm();
      const { form } = validateForm.getValidation();
      return mapFormSelect(form);
    }

    return mapFormSelect(form);
  };

  const mapFormSelect = (form) => {

    const $cloneForm = form.cloneNode(true);
    //clone value selects
    const $formSelects = form.querySelectorAll("select");

    if ($formSelects.length > 0) {
      $cloneForm.querySelectorAll("select").forEach((select, index) => {
        select.value = $formSelects[index].value;
      });
    }

    return $cloneForm;
  };

  const updateTextButtonSubmit = (button, textMessage) => {
    button.innerText = textMessage;
  };


  const updateCompleteStepts = (dataForm, currentIndexStep, form, typeDocument) => {
    let updateFields = ['geographic_level_2', 'geographic_level_3', 'geographic_level_4']
    switch (currentIndexStep) {

      case 0: { //step Contact
        state.completeStepts = {
          ...state.completeStepts,
          [currentIndexStep]: {
            content: cloneForm(form),
            dataCompany: dataForm,
            typeDocumentSelect: typeDocument,
            indicative: document.querySelector(".input-group-addon").innerHTML
          }
        };

        //update dataCompany
        updateFields.forEach(function (value) {
          const optionSelect = document.getElementsByName(value)[0]?.options;
          if (optionSelect) {
            const selectText = Array.prototype.slice.call(optionSelect).filter(x => x.value == dataForm[value])[0]?.innerHTML.trim();
            state.completeStepts[0].dataCompany[value] = { selectedValue: dataForm[value], text: selectText };
          }
        });

        break;
      }

      case 1: { //step Contact
        state.completeStepts = {
          ...state.completeStepts,
          [currentIndexStep]: {
            content: cloneForm(form),
            contactsData: contactLead.getContacts(),
          }
        };

        break;
      }
      case 2: {  //step documents

        const token = reCaptcha.getToken();

        state.completeStepts = {
          ...state.completeStepts,
          [currentIndexStep]: {
            content: cloneForm(form),
            filesLead: documentLead.getFiles(),
            token: token,
            acceptTerms: dataForm,

          }
        };

        break;
      }
      default:
    }

  };

  const validateLeadExistence = async (element) => {
    debugger
    const isAddContact = contactLead.getisClickAddContact();

    if (isAddContact === false || isAddContact === undefined) {
      validationLeadExistence.init();

      const $company = state.companyId;

      if (state.currenIndexStep === 1) {
        if (element.name === 'emailaddress1')
          validationLeadExistence.blockButtonContact(true);
      }

      if ($company === 'XGT' || $company === 'XCB') {
        const $isCompleted = validationLeadExistence.validateFieldByCompany();

        if (!$isCompleted)
          return
      }

      let $resultLead = '';
      let $resultForm = '';
      const $contacts = contactLead.getContacts();

      if (state.currenIndexStep === 0)
        $resultLead = await validationLeadExistence.validateParent(state.companyId, element);

      if (state.currenIndexStep === 1) {
        $resultLead = await validationLeadExistence.validateChild(element);

        if ($contacts.length >= 1) {
          $resultForm = await validationLeadExistence.validationByContact(state, element);
        }
      }

      if ($resultLead != undefined) {
        if ($resultLead.end) {
          if ($resultLead.type === 'D') {
            validationLeadExistence.renderMessageDocument($resultLead.name, true, state.companyId);
            confi.scrollTo(0, 900);
          }
          else {
            const $msg = validationLeadExistence.getMessagesToEmail($resultLead);
            validationLeadExistence.renderMessageEmail($msg, true, state.currenIndexStep);
          }
        } else {
          if ($resultLead.type === 'D') {
            validationLeadExistence.renderMessageDocument("", false);
          }
          else {
            validationLeadExistence.blockButtonContact(false);
            validationLeadExistence.renderMessageEmail("", false);
          }
        }
      }

      if ($resultForm != "") {
        if ($resultForm.statusForm) {
          if ($resultForm.typeForm === 'D') {
            const $contentNot = document.querySelector('.notifications');
            if ($contentNot.childElementCount === 0) {
              validationLeadExistence.paintMessages(true, $resultForm.typeForm);
              confi.scrollTo(0, 900);
            }
          } else {
            const $contentEmail = document.querySelector('.content-email-already-register');
            if ($contentEmail) {
              if ($contentEmail.childElementCount === 0) {
                const $msg = validationLeadExistence.getMessagesToEmail('', true);
                validationLeadExistence.blockButtonContact(true);
                validationLeadExistence.renderMessageEmail($msg, true);
              }
            } else {
              const $msg = validationLeadExistence.getMessagesToEmail('', true);
              validationLeadExistence.blockButtonContact(true);
              validationLeadExistence.renderMessageEmail($msg, true, state.currenIndexStep);
            }
          }
        } else {
          if ($resultForm.typeForm === 'D') {
            validationLeadExistence.paintMessages(false, $resultForm.typeForm);
          } else {
            const $contentEmail = document.querySelector('.content-email-already-register');
            if ($contentEmail) {
              if ($contentEmail.childElementCount === 0) {
                validationLeadExistence.blockButtonContact(false);
                validationLeadExistence.renderMessageEmail("", false);
              }
            }
          }
        }
      }

    }
  };


  ///Events 

  //Netx and finally form
  const handleSubmit = async (e) => {
    debugger
    const TEXT_BOTTON_SEND = getConfigMessage.strings.Lead.Send;
    e.preventDefault();

    const $isNotificationDoc = document.getElementsByClassName('content-notification')[0];
    const $isNotificationEma = document.getElementsByClassName('content-email-already-register')[0];

    if ($isNotificationDoc !== undefined) {
      const $countChild = $isNotificationDoc.childElementCount;

      if ($countChild === 3)
        return;
    }

    if ($isNotificationEma !== undefined) {
      return;
    }

    const { checkValidFields, form, getValues } = validateForm.getValidation();
    notificationLead.init();

    const { validateContact, validateEmail } = validationRules.initValidationsRules(state);

    const isValidContact = validateContact();
    const isValidEmail = validateEmail();

    if (state.currenIndexStep === 1) {
      if (!contactLead.validateCheckOtherEmail())
        return;

      if (!isValidContact) {
        notificationLead.getNotificationByStep(state, isValidEmail, isValidContact);
        confi.scrollTo(0, 900);
        return;
      }
    } else {
      let validateNotRequiered = true;
      if (state.currenIndexStep === 0) {
        if (document.querySelector(".form-Lead").querySelectorAll("[data-not-required].is-error").length > 0) {
          validateNotRequiered = false;
        }
        else {
          validateNotRequiered = true;
        }
      }
      if ((!checkValidFields()) || (!isValidContact) || (!isValidEmail) || (!validateNotRequiered)) {
        notificationLead.getNotificationByStep(state, checkValidFields, isValidEmail, isValidContact);
        confi.scrollTo(0, 900);
        return;
      }
    }

    const currentIndexStep = state.currenIndexStep;
    const indexLastStep = state.initialSteps.length - 1;

    let typeDocument = "";
    if (state.currenIndexStep === 0) {
      const $typeTemp = document.getElementsByName('ph_companyidentification')[0];
      if ($typeTemp) {
        const $temp = $typeTemp.id;
        typeDocument = $temp.slice(1);
      }
    }

    updateCompleteStepts(getValues(), currentIndexStep, form, typeDocument);

    const jsonData = JSON.parse(JSON.stringify(state));
    ///Submit form save lead
    if (currentIndexStep === indexLastStep) {
      //Validamos el token de Google_reCaptcha
      //const tokenValidate = state.completeStepts[2].token;
      //var tokenCaptcha = { token: tokenValidate }
      //const { success } = await serviceRegisterLead.google_reCaptcha(tokenCaptcha);

      //if (success) {

      //parent

      debugger
      let parentLead_atributes = state.completeStepts[0].dataCompany;
      const $typeDocumentParent = state.completeStepts[0].typeDocumentSelect;

      //parentLead_atributes.ph_urlfilesharepoint = 'https://intcomexonline.sharepoint.com/sites/DVLPCRM1/lead/torei%20prueba2_34e4eba8-b62f-eb11-a813-000d3a33a5cc';
      //parentLead_atributes.ph_agreepersonaldatause = isCheckagreepersonal;
      parentLead_atributes.ownerid = state.companyId;
      parentLead_atributes.ph_voluntarydeclarationfundsource = 881980000;
      parentLead_atributes.country_id = state.countryId;
      parentLead_atributes.ph_agreepersonaldatause = true;
      parentLead_atributes.telephone1 = state.completeStepts[0].indicative.concat(parentLead_atributes.telephone1);
      parentLead_atributes.telephone2 = state.completeStepts[0].indicative.concat(parentLead_atributes.telephone2);
      parentLead_atributes.document_type_id = $typeDocumentParent;
      if (parentLead_atributes.companyname)
        parentLead_atributes.companyname = parentLead_atributes.companyname.toUpperCase();
      if (parentLead_atributes.ph_commercialname)
        parentLead_atributes.ph_commercialname = parentLead_atributes.ph_commercialname.toUpperCase();

      if (parentLead_atributes.geographic_level_2)
        parentLead_atributes.geographic_level_2 = state.completeStepts[0].dataCompany.geographic_level_2?.selectedValue;
      if (parentLead_atributes.geographic_level_3)
        parentLead_atributes.geographic_level_3 = state.completeStepts[0].dataCompany.geographic_level_3?.selectedValue;
      if (parentLead_atributes.geographic_level_4)
        parentLead_atributes.geographic_level_4 = state.completeStepts[0].dataCompany.geographic_level_4?.selectedValue;

      delete parentLead_atributes.lbcode;

      if (isCheckacceptterms) {
        parentLead_atributes.ph_acceptterms = "YES";
      } else {
        parentLead_atributes.ph_acceptterms = "NO";
      }



      if (state.companyId === 'XCB') {
        parentLead_atributes.ph_voluntarydeclarationfundsource = state.completeStepts[2].acceptTerms.ph_voluntarydeclarationfundsource;
        parentLead_atributes.ph_specifyfundsourceanddestination = state.completeStepts[2].acceptTerms.ph_specifyfundsourceanddestination;
        if (isCheckAcceptsarlaft) {
          parentLead_atributes.ph_acceptsarlaft = true;
        } else {
          parentLead_atributes.ph_acceptsarlaft = false;
        }

        if (parentLead_atributes.ph_documenttypedigitid) {
          if (parentLead_atributes.ph_documenttypedigitid.charAt(0) === "4") {
            parentLead_atributes.ph_companyidentification = parentLead_atributes.ph_companyidentification + parentLead_atributes.ph_documentdigitid;
          }
        }

      }

      if (state.companyId === 'XCL') {
        if (parentLead_atributes.company_type_id.charAt(0) === 'c') {
          const concatName = parentLead_atributes.firstname + ' ' + parentLead_atributes.middlename + ' ' + parentLead_atributes.lastname + ' ' + parentLead_atributes.ph_secondlastname;
          parentLead_atributes.companyname = concatName;
        }
        parentLead_atributes.document_type_id = "0e54e95d-be3b-eb11-a813-00224802c009";
      }

      if (state.companyId === 'XMX') {
        if (parentLead_atributes.company_type_id.charAt(0) === '8') {
          const concatName = parentLead_atributes.firstname + ' ' + parentLead_atributes.middlename + ' ' + parentLead_atributes.lastname + ' ' + parentLead_atributes.ph_secondlastname;
          parentLead_atributes.companyname = concatName;
          delete parentLead_atributes.ph_ivataxpayer;
          delete parentLead_atributes.ph_politicallyexposed;
        }
      }

      if (state.companyId === 'XUY') {
        delete parentLead_atributes.company_type_id;
      }

      if (state.companyId === 'XSV') {
        parentLead_atributes.ph_ivataxpayer = ischeckivatax;
        parentLead_atributes.ph_politicallyexposed = ischeckpoliticalties;
        parentLead_atributes.ph_nrc = parentLead_atributes.ph_nrc + parentLead_atributes.ph_nrc1;
        parentLead_atributes.ph_companyidentification = parentLead_atributes.ph_companyidentification.replaceAll('-', "");
        parentLead_atributes.ph_dui = parentLead_atributes.ph_dui.replaceAll('-', "");
      }

      if (state.companyId === 'XGT') {
        parentLead_atributes.ph_companyidentification = parentLead_atributes.ph_companyidentification + parentLead_atributes.ph_documentdigitid;

      }

      parentLead_atributes.ph_companyidentification.toUpperCase();

      //contactos
      let childLead_attributes = [];
      state.completeStepts[1].contactsData.forEach(contactBycontact => {
        contactBycontact.infoContact.ownerid = state.companyId;
        contactBycontact.infoContact.country_id = state.countryId;
        contactBycontact.infoContact.ph_identification.toUpperCase();

        const $temp1 = contactBycontact.infoContact.ph_identification.replaceAll('.', '');
        const $temp2 = $temp1.replaceAll('-', '');
        const $temp3 = $temp2.replaceAll(' ', '');

        contactBycontact.infoContact.ph_identification = $temp3;

        if (state.companyId !== 'XCR') {
          contactBycontact.infoContact.contact_document_type_id = state.contactDocument;
        }
        childLead_attributes.push(contactBycontact.infoContact);
      });

      //documentos
      let documents = [];
      state.completeStepts[2].filesLead.forEach(filesByfiles => {
        documents.push(filesByfiles);
      });


      var objDataCompany = {
        parentLead_atributes,
        childLead_attributes,
        documents
      }

      try {
        confi.initLoader();
        const { Success } = await serviceRegisterLead.sendDataLead(objDataCompany);

        debugger

        if (Success) {
          confi.stopLoader();
          summaryLead.init(jsonData);
        }
        else {
          confi.stopLoader();
          console.log('Error sendDataLead');
        }
      }
      catch {
        confi.stopLoader();
        console.log('Error sendDataLead');
      }

      return;

      //} else {
      //  console.log('Captcha inválido');
      //}
    } else {
      ///Update next state
      const nextIndexStep = currentIndexStep + 1;
      state.currenIndexStep = nextIndexStep;

      //render next step
      const completeNextStep = state.completeStepts[nextIndexStep];
      if (completeNextStep) {
        renderForm(completeNextStep.content);

      } else {

        renderFormByCompany(state.initialSteps[nextIndexStep]);
      }

      //set netx step 
      stepsModule.setNextStep(
        {
          stepIdComplete: currentIndexStep,
          nextStepId: nextIndexStep,
        });

      //verify if next step  is last
      if (nextIndexStep === indexLastStep) {
        updateTextButtonSubmit(e.target.querySelector(".btn-save-lead"), TEXT_BOTTON_SEND);
      }
    }

  };

  const handleClickGoBack = (e) => {
    const TEXT_BOTTON_NEXT = "CONTINUAR AL SIGUIENTE PASO";
    const { completeStepts, currenIndexStep, initialSteps } = state;
    const prevStep = currenIndexStep - 1;

    notificationLead.init();

    //set go back step 
    stepsModule.goBackStep(
      {
        currentStepId: currenIndexStep,
        prevStepId: prevStep,
      });

    //update state
    const { form } = validateForm.getValidation();
    state.currenIndexStep = prevStep;
    state.completeStepts[currenIndexStep] = {
      ...state.completeStepts[currenIndexStep],
      content: cloneForm(form),
    }

    renderForm(completeStepts[prevStep].content);
    if (currenIndexStep === initialSteps.length - 1) {

      updateTextButtonSubmit(e.parentElement.querySelector(".btn-save-lead"), TEXT_BOTTON_NEXT);
    }

  };

  const validTextEntry = (e) => {
    const letras = e.value.split("");
    const patron = "^[a-zA-Z ]";
    for (var x in letras) {
      let letra = letras[x]
      if (!(new RegExp(patron, "i")).test(letra)) {
        letras[x] = "";
      }
    }
    e.value = letras.join("");
  }

  const validEmail = (e) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(e.value) || e.value.length === 0) {

      if (e.value.length > 0)
        e.classList.add("is-valid");

      e.classList.remove("is-error");
      e.nextElementSibling.nextElementSibling.classList.remove("is-error");
      e.nextElementSibling.nextElementSibling.classList.add("is-valid");
      e.nextElementSibling.nextElementSibling.innerText = "";
    }
    else {
      e.classList.add("is-error");
      e.nextElementSibling.nextElementSibling.innerText = getConfigMessage.strings.Lead.InvalidEmail;
      e.nextElementSibling.nextElementSibling.classList.add("is-error");
      e.nextElementSibling.nextElementSibling.classList.remove("is-valid");

    }
  }

  const orderAsc = (p_array_json, p_key) => {
    p_array_json.sort(function (a, b) {
      var textA = a.fieldID;
      var textB = b.fieldID;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  const DeleteForIdField = (fields, hide) => {
    fields.forEach(function (currentValue, index, arr) {
      if (fields[index].fieldID === hide.field) {
        fields.splice(index, 1);
      }
    })
  }

  const hadleOnChangeDependency = async (options = [], element) => {

    const companyId = companyLead.getCompanyId();

    const { dependency } = options.find(option => option.optionId === parseInt(element.selectedIndex));
    const { fieldsShow } = options.find(option => option.optionId === parseInt(element.selectedIndex));
    const { fieldsHide } = options.find(option => option.optionId === parseInt(element.selectedIndex));

    if (dependency) {
      await handleFieldsThatDependsActive(element, options);
    }

    if (state.currenIndexStep === 1) {

      if (fieldsHide) {
        //const stepHide = fieldsHide.filter(e => e.SteptID === state.currenIndexStep + 1);
        //stepHide.forEach(hide => {
        //  state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        //});

        //const thirdStepHide = fieldsHide.filter(o => o.SteptID === state.currenIndexStep + 2);
        //thirdStepHide.forEach(hide => {
        //  state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        //});
        debugger
        fieldsHide.forEach(hide => {
          if (state.initialSteps[hide.step - 1]?.Sections[hide.section - 1]?.fields !== undefined) {
            DeleteForIdField(state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields, hide);
          }
        });
      }

      if (fieldsShow) {
        const fields = await serviceRegisterLead.fieldsShowDependency({
          companyId: companyId,
          steptId: 1,
          SectionId: 1,
          fieldsShow,
        });

        const fieldJson = JSON.parse(fields);
        let htmlFields = "";

        for await (e of fieldJson) {
          if (e.SteptID === state.currenIndexStep + 1) {
            htmlFields = htmlFields + templateFields.getTemplateInput(e) + '';
          } else {
            if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
              state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);

            }
          }
        }

        const $node = confi.createVirtualDOM(`<div id="content-Dependency-Contact">${htmlFields}</div>`);

        const $sectionContent = element.closest(".section-content");
        const $contentDependency = document.querySelector(".section-content > #content-Dependency-Contact");

        if ($contentDependency != null)
          $sectionContent.removeChild($contentDependency);

        $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);

        validateInputsDocument($sectionContent);
      }

    } else {

      if (fieldsHide) {
        //const stepHide = fieldsHide.filter(e => e.step === state.currenIndexStep + 1);
        //stepHide.forEach(hide => {
        //  state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        //});

        //const thirdStepHide = fieldsHide.filter(o => o.step === state.currenIndexStep + 3);
        //thirdStepHide.forEach(hide => {
        //  state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        //});
        debugger
        fieldsHide.forEach(hide => {
          if (state.initialSteps[hide.step - 1]?.Sections[hide.section - 1]?.fields !== undefined) {
            DeleteForIdField(state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields, hide);
          }
        });
      }

      if (fieldsShow) {

        const fields = await serviceRegisterLead.fieldsShowDependency({
          companyId: companyId,
          steptId: 1,
          SectionId: 1,
          fieldsShow,
        });

        const fieldJson = JSON.parse(fields);
        let htmlFields = "";
        let array = [];

        for await (e of fieldJson) {
          if (e.SteptID === state.currenIndexStep + 1) {
            htmlFields = htmlFields + templateFields.getTemplateInput(e) + '';
            state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);

          } else {
            if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
              state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
            }
          }
        }
        orderAsc(state.initialSteps[0].Sections[0].fields, "fieldID")
        array = state.initialSteps[2].Sections[0].fields;
        array.sort((a, b) => (a.fieldID > b.fieldID) ? 1 : ((b.fieldID > a.fieldID) ? -1 : 0));


        if (companyId !== 'XCB' && companyId !== 'XSV') {

          if (companyId === 'XMX') {
            let FieldsForGroup = [];

            for await (e of fieldJson) {
              if (e.SteptID === state.currenIndexStep + 1) {
                FieldsForGroup.push(e);
              } else {
                if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
                  state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
                }
              }
            }

            const $htmlFieldsForGroup = renderFields(FieldsForGroup);

            const $node = confi.createVirtualDOM(`<div id="content-Dependency">${$htmlFieldsForGroup}</div>`);

            const $sectionContent = element.closest(".section-content");
            const $contentDependency = document.querySelector(".section-content > #content-Dependency");
            const $contentDependencyTwo = document.querySelector(".section-content > #content-DependencyTwo");

            if ($contentDependency != null)
              $sectionContent.removeChild($contentDependency);

            if ($contentDependencyTwo != null)
              $sectionContent.removeChild($contentDependencyTwo);

            $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);


            validateInputsDocument($sectionContent);

          } else {
            const $node = confi.createVirtualDOM(`<div id="content-Dependency">${htmlFields}</div>`);

            const $sectionContent = element.closest(".section-content");
            const $contentDependency = document.querySelector(".section-content > #content-Dependency");
            const $contentDependencyTwo = document.querySelector(".section-content > #content-DependencyTwo");

            if ($contentDependency != null)
              $sectionContent.removeChild($contentDependency);

            if ($contentDependencyTwo != null)
              $sectionContent.removeChild($contentDependencyTwo);

            $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);

            if (companyId !== 'XEC') {
              validateInputsDocument($sectionContent);
            }
          }
        }

        if (companyId === 'XCB') {

          const $firstSelectExist = document.querySelector("select[name = company_type_id]").name;

          if (element.name === $firstSelectExist) {
            const $node = confi.createVirtualDOM(`<div id="content-Dependency">${htmlFields}</div>`);

            const $sectionContent = element.closest(".section-content");
            const $contentDependency = document.querySelector("#content-Dependency");
            const $contentDependencyTwo = document.querySelector("#content-DependencyTwo");


            if ($contentDependency != null)
              $sectionContent.removeChild($contentDependency);

            if ($contentDependencyTwo != null)
              $sectionContent.removeChild($contentDependencyTwo);

            $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);

            validateInputsDocument($sectionContent);

          } else {

            let FieldsForGroup = [];

            for await (e of fieldJson) {
              if (e.SteptID === state.currenIndexStep + 1) {
                FieldsForGroup.push(e);
              } else {
                if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
                  state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
                }
              }
            }

            const $htmlFieldsForGroup = renderFields(FieldsForGroup);

            const $nodeTwo = confi.createVirtualDOM(`<div id="content-DependencyTwo">${$htmlFieldsForGroup}</div>`);
            const $sectionContentTwo = element.closest(".section-content");
            const $contentDependencyTwo = document.querySelector("#content-DependencyTwo");

            if ($contentDependencyTwo != null)
              $sectionContentTwo.removeChild($contentDependencyTwo);

            $sectionContentTwo.insertBefore($nodeTwo, element.closest("#content-Dependency").nextSibling);

            validateInputsDocument($sectionContentTwo);
          }

        }

        if (companyId === 'XSV') {

          let FieldsForGroup = [];

          for await (e of fieldJson) {
            if (e.SteptID === state.currenIndexStep + 1) {
              FieldsForGroup.push(e);
            } else {
              if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
                state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
              }
            }
          }

          const $htmlFieldsForGroup = renderFields(FieldsForGroup);

          const $node = confi.createVirtualDOM(`<div id="content-Dependency">${$htmlFieldsForGroup}</div>`);

          const $sectionContent = element.closest(".section-content");
          const $contentDependency = document.querySelector("#content-Dependency");

          if ($contentDependency != null)
            $sectionContent.removeChild($contentDependency);

          $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);

          validateInputsDocument($sectionContent);
        }

      }
    }

    initValidationForm();
    if (state.companyId != 'XEC') {
      let $contentFields = document.querySelector(".content-fields");
      validateInputsDocument($contentFields);
    }

  };



  var isCheckagreepersonal = false;
  var isCheckacceptterms = false;
  var ischeckpoliticalties = false;
  var ischeckivatax = false;
  var isCheckAcceptsarlaft = false;

  const handleFieldNotRequired = (element) => {
    validationMessages.validateFieldNotRequired(element);
  };

  const handleFieldsCheck = async (options = [], element) => {

    if (state.currenIndexStep === 0) {

      let name = element[0].optionGuid;

      if (name === "politically") {
        ischeckpoliticalties = !ischeckpoliticalties;
        await handleFieldsThatDependsShow(options, element);
      }
      if (name === "agreepersonal") {
        isCheckagreepersonal = !isCheckagreepersonal;

        //if (isFieldsComplete()) {
        //contactLead.sectionNextDisable(false);
        //}

      }
      if (name === 'ivatax') {
        ischeckivatax = !ischeckivatax;
        await handleFieldsThatDependsRequired(options, element);
      }
    }
    if (state.currenIndexStep === 2) {
      if (element.name === 'ph_acceptterms1') {
        isCheckacceptterms = !isCheckacceptterms
      }

      if (options.name === 'ph_acceptsarlaft1') {
        isCheckAcceptsarlaft = !isCheckAcceptsarlaft;
      }
    }
  };

  const handleTextWrite = async (element) => {
    debugger
    if (state.companyId === 'XPE') {

      const number = element.value.charAt(0);
      let fieldsShow = [];
      let fieldsHide = [];

      if (number === "1") {
        document.getElementsByName('company_type_id')[0].selectedIndex = 1;
        fieldsShow = [{ step: 3, section: 1, field: 1 }, { step: 3, section: 1, field: 2 }];
        fieldsHide = [{ step: 3, section: 1, field: 3 }];

      } else if (number === "2") {
        document.getElementsByName('company_type_id')[0].selectedIndex = 2;
        fieldsShow = [{ step: 3, section: 1, field: 3 }];
        fieldsHide = [{ step: 3, section: 1, field: 1 }, , { step: 3, section: 1, field: 2 }];
      }

      if (fieldsHide) {
        const stepHide = fieldsHide.filter(e => e.step === state.currenIndexStep + 1);
        stepHide.forEach(hide => {
          state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        });

        const thirdStepHide = fieldsHide.filter(o => o.step === state.currenIndexStep + 3);
        thirdStepHide.forEach(hide => {
          state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields = state.initialSteps[hide.step - 1].Sections[hide.section - 1].fields.filter(e => e.fieldID !== hide.field)
        });
      }

      if (fieldsShow) {

        const fields = await serviceRegisterLead.fieldsShowDependency({
          companyId: 'XPE',
          steptId: 1,
          SectionId: 1,
          fieldsShow,
        });

        const fieldJson = JSON.parse(fields);
        let htmlFields = "";

        for await (e of fieldJson) {
          if (e.SteptID === state.currenIndexStep + 1) {
            htmlFields = htmlFields + templateFields.getTemplateInput(e) + '';
          } else {
            if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
              state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
            }
          }
        }
        const $node = confi.createVirtualDOM(`<div id="content-Dependency">${htmlFields}</div>`);

        const $sectionContent = element.closest(".section-content");
        const $contentDependency = document.querySelector("#content-Dependency");
        const $contentDependencyTwo = document.querySelector("#content-DependencyTwo");

        if ($contentDependency != null)
          $sectionContent.removeChild($contentDependency);

        if ($contentDependencyTwo != null)
          $sectionContent.removeChild($contentDependencyTwo);

        $sectionContent.insertBefore($node, element.closest(".form-group").nextSibling);

      }
      initValidationForm();
      let $contentFields = document.querySelector(".content-fields");
      validateInputsDocument($contentFields);
    }

    if (state.companyId === 'XCB') {
      const $num = element.value;

      if (element.placeholder === 'NIT') {
        if (validationRules.validateDocumentNit_XCB($num)) {
          validationMessages.validateDocumentIdentification(element, false);
          return;
        } else {
          validationMessages.validateDocumentIdentification(element);
          return;
        }
      } else {
        return;
      }
    }
    if (state.companyId === 'XCL') {
      const $rut = element.value;

      if (element.placeholder === 'RUT') {
        if (validationRules.validateDocumentRut_XCL($rut)) {
          validationMessages.validateDocumentIdentification(element, false);
          return;
        } else {
          validationMessages.validateDocumentIdentification(element, true);
          return;
        }
      } else {
        return;
      }

    }

    if (state.companyId === 'XUY') {
      const $num = element.value;

      if (element.placeholder === 'CI') {
        if (validationRules.validateDocumentCI_XUY($num)) {
          validationMessages.validateDocumentIdentification(element, false);
          return;
        } else {
          validationMessages.validateDocumentIdentification(element);
          return;
        }
      } else if (element.placeholder === 'RUT') {
        if (validationRules.validateDocumentRut_XUY($num)) {
          validationMessages.validateDocumentIdentification(element, false);
          return;
        } else {
          validationMessages.validateDocumentIdentification(element);
          return;
        }
      } else {
        return;
      }
    }

  };

  const handleCheckSpecify = async (options = [], element) => {
    const companyId = companyLead.getCompanyId();
    confi.initLoader();

    const { fieldsShow } = element.find(ele => ele.optionId === parseInt(options.id));
    const { fieldsHide } = element.find(ele => ele.optionId === parseInt(options.id));

    if (fieldsHide) {

      const stepHide = fieldsHide.filter(e => e.SteptID !== state.currenIndexStep + 1);
      stepHide.forEach(hide => {
        if (document.getElementById('content-Dependency-Specify') !== null) {
          document.getElementsByName('ph_specifyfundsourceanddestination')[0].removeAttribute("required");
          document.getElementsByName('ph_specifyfundsourceanddestination')[0].removeAttribute('data-required');
          document.getElementById('content-Dependency-Specify').style.display = 'none';
        }
      });
    }

    if (fieldsShow) {

      const fields = await serviceRegisterLead.fieldsShowDependency({
        companyId: companyId,
        steptId: 1,
        SectionId: 1,
        fieldsShow,
      });

      const fieldJson = JSON.parse(fields);
      let htmlFields = "";

      for await (e of fieldJson) {
        if (e.SteptID === state.currenIndexStep + 1) {
          htmlFields = htmlFields + templateFields.getTemplateInput(e) + '';
        } else {
          if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
            state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
          }
        }
      }

      const $node = confi.createVirtualDOM(`<div id="content-Dependency-Specify">${htmlFields}</div>`);

      const $sectionContent = options.closest(".section-content");
      const $contentDependency = document.querySelector("#content-Dependency-Specify");

      if ($contentDependency != null)
        $sectionContent.removeChild($contentDependency);

      $sectionContent.insertBefore($node, options.closest(".multi-selection-form").nextSibling);

    }
    initValidationForm();
    confi.stopLoader();
  };

  const handleOninputDeleteRequired = () => {
    debugger

    const $optionSelected = document.querySelector('select[name=company_type_id]');

    if ($optionSelected.selectedIndex === 1) {
      const $nrc = document.querySelector("[id^='4']");
      const $nrcDigit = document.querySelector("[id^='5']");

      if ($nrc) {
        if ($nrc.value.length <= 2) {
          $nrc.classList.remove('is-error');
          const $field = $nrc.closest('.field');

          if ($field.childElementCount > 3)
            $field.children[3].remove();
        }
      }


      if ($nrcDigit) {
        if ($nrcDigit.value.length <= 0) {
          $nrcDigit.classList.remove('is-error');
          const $fieldD = $nrcDigit.closest('.field');

          if ($fieldD.childElementCount > 3)
            $fieldD.children[3].remove();
        }
      }
    }

    if ($optionSelected.selectedIndex === 2) {
      const $dui = document.querySelector('input[name=ph_dui]');

      if ($dui) {
        if ($dui.value.length <= 9) {
          $dui.classList.remove('is-error');
          const $fieldDui = $dui.closest('.field');

          if ($fieldDui.childElementCount > 3)
            $fieldDui.children[3].remove();
        }
      }
    }


  };

  const handleFieldsThatDependsRequired = (e, options) => {
    debugger
    if (ischeckivatax) {
      //Si es check, elimina el requerido
      let fieldsThatDependsActive = [];
      fieldsThatDependsActive?.push(options[0].dependency.fieldsThatDependsActive);

      let $num = [];
      for (let i = 0; i < fieldsThatDependsActive.length; i++) {
        $num = fieldsThatDependsActive[i];
      };

      $num.forEach(value => {
        const $elm = document.querySelectorAll("[id^='" + value + "']");
        if ($elm.length > 0) {
          if ($elm[0].value === "" && $elm[0].classList.contains("is-error")) {
            const $div = $elm[0].closest('.form-group');
            const $elmmessage = $div.querySelector('.input-msg');
            $elmmessage.innerHTML = "";
            $elm[0].classList.remove("is-error");
          }

          $elm[0].removeAttribute("required");
          $elm[0].removeAttribute("data-required");
          $elm[0].setAttribute("DoNotValidate", "true");
          $elm[0].setAttribute("data-not-required", "");
          $elm[0].addEventListener("change", handleFieldNotRequired);

        }
      });

    } else {
      //Si no es check, agrega el requerido
      let fieldsThatDependsBlock = [];
      fieldsThatDependsBlock.push(options[0].dependency.fieldsThatDependsBlock);

      let $num = [];
      for (let i = 0; i < fieldsThatDependsBlock.length; i++) {
        $num = fieldsThatDependsBlock[i];
      };

      $num.forEach(value => {
        const $elm = document.querySelectorAll("[id^='" + value + "']");
        if ($elm.length > 0) {
          $elm[0].setAttribute("required", "");
          $elm[0].setAttribute("data-required", "");
          $elm[0].setAttribute("DoNotValidate", "false")
          $elm[0].removeAttribute("data-not-required");
          $elm[0].removeEventListener("change", handleFieldNotRequired);
        }
      });
    }

    initValidationForm();

  };

  const handleFieldsThatDependsBlock = async (e, options) => {
    debugger
    if (state.companyId === 'XCL') {
      const { dependency } = options[e.selectedIndex - 1];

      dependency.fieldsThatDependsActive?.forEach(value => {
        const $elm = document.getElementById(`${value}`);
        if ($elm.classList.contains("element-disabled")) {
          $elm.classList.remove("element-disabled");
          $elm.setAttribute("required", "");
          $elm.setAttribute("data-required", "");
          $elm.value = "";
        }
      });

      dependency.fieldsThatDependsBlock?.forEach(value => {
        const $elm = document.getElementById(`${value}`);
        if (!$elm.classList.contains("element-disabled")) {
          $elm.classList.add("element-disabled");
          $elm.removeAttribute("required");
          $elm.removeAttribute("data-required");
          $elm.value = "";
        }
      });

    }

    if (state.companyId === 'XMX') {

      const $fieldDigits = document.querySelector('input[name=ph_lastdigits]');

      if (e.selectedIndex === 1) {
        $fieldDigits.classList.add("element-disabled");
        $fieldDigits.removeAttribute("required");
        $fieldDigits.removeAttribute("data-required");
        $fieldDigits.value = "";
        $fieldDigits.setAttribute("readonly", "readonly");
      } else {
        $fieldDigits.classList.remove("element-disabled");
        $fieldDigits.setAttribute("required", "");
        $fieldDigits.setAttribute("data-required", "");
        $fieldDigits.removeAttribute("readonly");
        $fieldDigits.value = "";
      }
    }

    leadForm.initValidationForm();
  };

  const handleFieldsThatDependsShow = async (ele, options) => {
    let fieldsShow = [];
    fieldsShow.push(options[0].fieldsShow[0]);

    if (ischeckpoliticalties) {

      const fields = await serviceRegisterLead.fieldsShowDependency({
        companyId: state.companyId,
        fieldsShow,
      });

      const fieldJson = JSON.parse(fields);
      let htmlFields = "";

      for await (e of fieldJson) {
        if (e.SteptID === state.currenIndexStep + 1) {
          htmlFields = htmlFields + templateFields.getTemplateInput(e) + '';
        } else {
          if (state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.find(l => l.fieldID === e.fieldID) === undefined) {
            state.initialSteps[e.SteptID - 1].Sections[e.SectionID - 1].fields.push(e);
          }
        }
      }

      const $node = confi.createVirtualDOM(`<div id="content-Dependency-Specify">${htmlFields}</div>`);
      const $sectionContent = ele.closest(".section-content");
      $sectionContent.insertBefore($node, ele.closest(".multi-selection-form").nextSibling);

      const $elm = document.getElementsByName('ph_politicalties')[0];
      $elm.setAttribute("required", "");
      $elm.setAttribute("data-required", "");

    } else {

      const $sectionContent = ele.closest(".section-content");
      const $contentDependency = document.querySelector("#content-Dependency-Specify");

      if ($contentDependency != null) {
        const $elem = document.getElementsByName('ph_politicalties')[0];
        $elem.removeAttribute("required");
        $elem.removeAttribute("data-required");
        $sectionContent.removeChild($contentDependency);
      }
    }

    initValidationForm();
    confi.stopLoader();
  };

  const handleFieldsThatDependsActive = async (e, options) => {
    debugger
    if (state.companyId === 'XSV') {

      const $otionSelected = e.selectedIndex;
      const $elm = document.querySelector('input[name=ph_IVATaxpayer1]');

      const { dependency } = options.find(option => option.optionId === parseInt(e.selectedIndex));

      if ($otionSelected === 1) {
        if (!$elm.classList.contains("element-disabled")) {
          $elm.removeAttribute('disabled');
        }

        const $dui = document.querySelector('input[name=ph_dui]');
        $dui.setAttribute("required", "");
        $dui.setAttribute("data-required", "");
        //$dui.removeEventListener("input", handleOninputDeleteRequired);
        //$dui.removeEventListener("change", handleOninputDeleteRequired);
      }

      if ($otionSelected === 2) {
        ischeckivatax = false;
        if ($elm.checked)
          $elm.checked = false;

        if (!$elm.classList.contains("element-disabled")) {
          $elm.disabled = true;
        }

        const $dui = document.querySelector('input[name=ph_dui]');

        $dui.removeAttribute('required');
        $dui.removeAttribute('data-required');
        //$dui.addEventListener("input", handleOninputDeleteRequired);
        //$dui.addEventListener("change", handleOninputDeleteRequired);


        let $num = [];
        for (let i = 0; i < dependency.fieldsThatDependsActive.length; i++) {
          $num = dependency.fieldsThatDependsActive[i];

          const $elm = document.querySelectorAll("[id^='" + $num + "']");
          if ($elm.length > 0) {
            $elm[0].setAttribute("required", "");
            $elm[0].setAttribute("data-required", "");
          }
        };
      }
    }
  };

  const handleGeographicLevel = async (options = [], element, level) => {
    const companyId = companyLead.getCompanyId();

    const fields = await serviceRegisterLead.geographyLevelDependency({
      levelId: level,
      companyId: companyId,
      parentOption: parseInt(element.options[element.selectedIndex].getAttribute("optionid")),
      //parentOption: element.selectedIndex,
    });

    const fieldsValues = JSON.parse(fields.optionsSelect);
    const $elmSelect = document.querySelector(`select[name=geographic_level_${fields.nextLevel}]`);
    $elmSelect.innerHTML = "";
    if (fieldsValues.length > 0) {
      $elmSelect.add(confi.createVirtualDOM(templateFields.getTemplateOptionSelect("", "")));

      fieldsValues.map(({ optionGuid, optionValue, optionId }) => {
        $elmSelect.add(confi.createVirtualDOM(templateFields.getTemplateOptionSelect(optionGuid, optionValue, null, optionId)));
      });
    }
  };

  const renderHeader = async (source) => {
    const header = document.querySelector("#header");
    header.appendChild(templateLead.templateHeaderSource(source));
  };

  const renderFooter = async (source) => {
    const footer = document.querySelector("#footer");
    footer.appendChild(templateLead.templateFooterSource(source));
  };

  return {
    init,
    handleClickGoBack,
    initValidationForm,
    getState,
    handleFieldsThatDependsBlock,
    handleFieldsCheck,
    handleCheckSpecify,
    hadleOnChangeDependency,
    handleGeographicLevel,
    validTextEntry,
    validEmail,
    handleTextWrite,
    validateLeadExistence,
    validateInputsPhone,
    handleOninputDeleteRequired,
    handleFieldNotRequired
  }

})();

//document.addEventListener("DOMContentLoaded", async () => {
//  await leadForm.init();

//});
