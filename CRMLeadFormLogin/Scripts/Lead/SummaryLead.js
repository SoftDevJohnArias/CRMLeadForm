const summaryLead = (() => {

  const init = (state) => {
    document.querySelector('.notifications').style.display = "none";
    document.querySelector('.content-steps').style.display = "none";


    const $contentLead = document.querySelector('.content-body-lead');
    $contentLead.innerHTML = '';

    document.querySelector('.content-body-lead').style.flexDirection = "column";
    document.querySelector('.content-body-lead').style.alignItems = "normal";

    summaryRender(state, $contentLead);
  };

  const dataContacts = { contacts: [] };
  let dataCompanyValue = "";
  const summaryRender = ({ initialSteps, completeStepts }, form) => {

    //notificacion de confirmacion
    form.appendChild(notificationLead.getNotificationConfirmLead());

    //template summary
    form.appendChild(getTemplateSummary());

    //fields
    const sumaryData = Object.keys(completeStepts).map(step => {

      const fieldsSummary = initialSteps[step].Sections.map(section => {
        const { dataCompany, contactsData, filesLead } = completeStepts[step];

        return {
          sectionName: section.SectionName,
          fieldsCompany: !dataCompany ? null : section.fields.filter(({ showSummary }) => showSummary).map(({ label, name, options, groupSumary, }) => {

            let value = '';
            if (name === 'geographic_level_2' || name === 'geographic_level_3' || name === 'geographic_level_4') {
              value = dataCompany[name].text;
            }
            else {
              //value = options ? options.find(option => 
              //  option.optionGuid || option.optionId || option.value == dataCompany[name])?.optionValue : dataCompany[name];
              dataCompanyValue = dataCompany[name];
              value = options ? options.find(selectValueSummary)?.optionValue : dataCompany[name];

              if (name === 'companyname' || name === 'ph_commercialname' || name === 'ph_companyidentification' || name === 'ph_identification') {
                value = value.toUpperCase();
              }

            }


            return {
              label,
              value,
              groupSumary
            };
          }),
          contacts: contactsData,//getDataContact(section.fields, contactsData),
          filesLead: filesLead,
        }
      });

      return fieldsSummary;

    });

    sectionRender(sumaryData);
  };

  function selectValueSummary(element) {
    debugger;
    const valueSelect = element.optionGuid || element.optionId || element.value;
    const valueCompany = dataCompanyValue;

    if (valueSelect) {

      if (valueSelect == valueCompany)
        return element;
      else
        return null;
     
    }
  }

  const sectionRender = (sumaryData) => {

    const $sections = document.querySelector('.content-info');

    sumaryData.forEach(step => step.forEach(({ sectionName, fieldsCompany, contacts, filesLead }) => {

      $sections.appendChild(templateSectionSummary(sectionName))
      const $contentRows = document.createElement('div');

      if (fieldsCompany) {
        $contentRows.setAttribute('class', 'content-rows');
        $sections.appendChild($contentRows);
        const itemGroupSummary = { label: '', value: '' };
        let group = 0;
        let fieldSummaryGroupCheck = [];

        const sectionFields = fieldsCompany.map(field => {
          const elmSome = (element) => element === field.label;
          if (fieldSummaryGroupCheck.some(elmSome))
            return;

          if (field.groupSumary) {
            let { groupId, order, } = field.groupSumary;

            const groupFilterSummary = fieldsCompany.filter(({ groupSumary }) => groupSumary).filter(({ groupSumary }) => groupSumary.groupId === groupId)
            let separatorItem = "";

            groupFilterSummary.map(fieldSummary => {
              let { groupId, order, separator } = fieldSummary.groupSumary;
              if (order === 1)
                itemGroupSummary.label = fieldSummary.label;

              separatorItem = separator ? separator : "";
              fieldSummaryGroupCheck.push(fieldSummary.label);
              itemGroupSummary.value = itemGroupSummary.value.concat(fieldSummary.value, separatorItem);
            });


            const templateGroup = templateRow(itemGroupSummary);
            itemGroupSummary.label = '';
            itemGroupSummary.value = '';
            return templateGroup;

          } else {
            return templateRow(field);
          }



        }).join('');

        $contentRows.innerHTML = sectionFields;
      }
      else if (contacts) {
        $contentRows.setAttribute('class', 'section-contacts');
        $sections.appendChild($contentRows);
        const sectionContact = contacts.map(({ infoContact }) => {

          dataContacts.contacts.push(infoContact);
          return templateContact(infoContact);
        }).join('');
        $contentRows.innerHTML = sectionContact;
      }
      else if (filesLead) {

        $contentRows.setAttribute('class', 'content-rows');
        $sections.appendChild($contentRows);
        const sectionFiles = filesLead.map(file => {
          return templateDocument(file);
        }).join('');
        $contentRows.innerHTML = sectionFiles;
      }
    }));

  };

  const templateRow = ({ label, value }) => {

    return `<div class="row-info">
                        <span>${label}  </span><span class="text-ellipsis">${value}</span>                      
            </div>
            <hr class="separator" />`;

  };

  const separatorRow = () => {
    const template = `<hr class="separator" />`;
    return confi.createVirtualDOM(template);
  };

  const templateSectionSummary = (sectionName) => {
    const template = `<div class="title-section">
                        <h5>${sectionName}</h5>
                    </div> `;
    return confi.createVirtualDOM(template);
  };


  const templateContact = (contact) => {
    return `<div class="content-contact content-style"  data-id=${contact.id}>
                        <div class="notification-contact js-content">
                           <div class="content-contact-header ${contact.type}">
                             <div class="content-text">
                              <p>${contact.fullName}</p>
                              <p>${contact.ocupation}</p>
                            </div>
                         </div>                    
                         <div class="content-link">
                            <a href="#" id="lnkEdit" class="lnk-main" 
                            onclick="summaryLead.handleSectionContactSummary(this);return false;">${getConfigMessage.strings.Lead.ViewMore}</a>
                            <i class="icon-ws-ico-min-down" id="icon-expand" onclick="summaryLead.handleSectionContactSummary(this);return false;"></i>
                          </div>
                        </div> 
                          <hr class="separator" />
                        <div id="contact-form" class="content-rows"></div>
                      </div>`;
  };

  const templateDocument = ({ document_name_summary, fileName }) => {

    return `<div class="content-document">
             <i class="icon-ws-ico-min-circle-check"></i>
             <div class="document-file">
                 <span>${document_name_summary}</span>
                 <span>${fileName}</span>
             </div>
            </div>`;
  }

  const templateContactData = (contact) => {

    contact = contact[0];
    return `<div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Names}</span><span>${contact.firstname} ${contact.middlename}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Surnames}</span><span>${contact.lastname} ${contact.ph_secondlastname}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Email}</span><span>${contact.emailaddress1}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.DocumentNumber}</span>${contact.ph_identification}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Jobtitle}</span><span>${contact.jobtitle}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Permissions}</span><span>${contact.ocupation}</span>                      
            </div>
            <hr class="separator" />
            <div class="row-info">
                        <span>${getConfigMessage.strings.Lead.Celular}</span><span>${contact.mobilephone}</span>                      
            </div>`;

  }

  const getTemplateSummary = () => {
    return templateLead.templateSummary();
  };

  const handleSectionContactSummary = (e) => {




    const $contentContentContact = expandToggleEditContact(e);
    if ($contentContentContact) {
      const idContact = $contentContentContact.dataset.id;
      const contact = dataContacts.contacts.filter(contact => contact.id == idContact);

      //render form
      const $formContact = $contentContentContact.querySelector("#contact-form");
      const template = templateContactData(contact);
      $formContact.innerHTML = template;
    }

  };

  const expandToggleEditContact = (element) => {
    const $contentContentContact = element.closest(".content-contact");
    const $links = $contentContentContact.querySelector(".content-link > a");
    $contentContentContact.classList.toggle("expand-collapse");

    const isExpand = $contentContentContact.classList.contains("expand-collapse");

    if (element.id === "icon-expand") {

      if (isExpand) {

        element.classList.add("icon-ws-ico-min-up");
        element.classList.remove("icon-ws-ico-min-down");
      }
      else {
        element.classList.remove("icon-ws-ico-min-up");
        element.classList.add("icon-ws-ico-min-down");
      }

    }
    else {

      if (isExpand)
        $links.innerHTML = getConfigMessage.strings.Lead.SeeLess;
      else {
        $links.innerHTML = getConfigMessage.strings.Lead.ViewMore;
        return false;
      }
    }
    return $contentContentContact;
  }


  return {
    init,
    handleSectionContactSummary
  };
})();
