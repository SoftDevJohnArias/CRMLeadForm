
const configCatalogTemplates = (() => {

    const OPERATOR_COMPARISON = [
        "IN",
        "NOTIN",
        "CONTAINS",
        "NOTCONTAINS"
    ];

    const fieldRule = {
        manufacturer: "mn",
        brand: "br",
        category: 'ct',
        producType: "pt",
        sku: 'SKU'
    };


    const getTypesFieldRule = async (fieldName) => {

        switch (fieldName) {
            case fieldRule.manufacturer:
                return await fetchConfigCatalog.getManufacturers();
            case fieldRule.brand:
                return await fetchConfigCatalog.getBrands();
            case fieldRule.category:
                return await fetchConfigCatalog.getCategories();
            case fieldRule.producType:
                return await fetchConfigCatalog.getProductTypes();
            default:
                return await fetchConfigCatalog.getManufacturers();
        }
    };

    const getTemplateOptionSelect = (value, text, selectedValue = null) => (
        `<option ${selectedValue && "selected"}
              value="${value}">
              ${text}
     </option>`
    );

    const renderFieldRules = async (selectedValue = null) => {

        const fieldRules = await fetchConfigCatalog.getFieldsRules();

        return `<div class="floating-label">
              <select class="select-big js-field-rules">
                ${fieldRules.map(({ Value, Field }) => getTemplateOptionSelect(Value, Field, selectedValue === Value))}
              </select>
              <label class="label-select">${getConfigMessage.strings.ConfigCatalog.FieldName}</label>
           </div>`;
    };

    const renderOperatorLogic = async (selectedValue = null) => {
        const { logic } = await fetchConfigCatalog.getSQlOperator();

        return `<div class="floating-label">
              <select class="select-small js-operator-logic">
                ${logic.map(({ IdOperator, OperatorText }) =>
            getTemplateOptionSelect(IdOperator, OperatorText, IdOperator === selectedValue))}
              </select>
              <label class="label-select">Operador</label>
           </div>`;
    };

    const renderOperatorComparison = async (selectedValue = 1) => {

        const { comparison } = await fetchConfigCatalog.getSQlOperator();

        return `<div class="floating-label">
              <select class="select-small js-operator-comparison">
                ${comparison.map(({ IdOperator, OperatorText }) =>
            (getTemplateOptionSelect(IdOperator, OperatorText, IdOperator === selectedValue)))}
              </select>
              <label class="label-select">${getConfigMessage.strings.ConfigCatalog.ValueFilter}</label>
           </div>`;
    }


    //renders type select and tyep input 

    const renderInputSelect = (typeRules, selectedValue) => {
        return `<div class="floating-label fade-anima" >
              <select class="select-big js-input-select js-type-rules">
                ${typeRules.map(({ value, text }) => getTemplateOptionSelect(value, text, selectedValue === value))}
              </select>
              <label class="label-select">${getConfigMessage.strings.ConfigCatalog.FilterType}</label>
           </div>`;
    };

    const renderInputText = (value = null) => {

        return `<div class="field fade-anima">
            <input type="text" class="input-big js-input-type-rule js-type-rules" required ${value && `value=${value}`}>
            <label title=${getConfigMessage.strings.ConfigCatalog.SeparatedValues} data - title=${getConfigMessage.strings.ConfigCatalog.SeparatedValues} ></label >
           </div>`;
    };

    const renderMessageEmptyRules = (content) => {
        content = document.querySelector(".filter-preview-content");
        const template = `<div class="message-rules-empty">
                  <img src="/Content/img/ws-ico-min-info.svg" />
                <span>${getConfigMessage.strings.ConfigCatalog.MessageEmptyFilter}</span>
              </div>`;
        const htmlVirtual = document.implementation.createHTMLDocument();
        htmlVirtual.body.innerHTML = template;
         
        content.parentElement.insertBefore(htmlVirtual.body.children[0], content);
    };
    const renderTemplate = (querySelector, state) => {
        const $content = document.querySelector(querySelector);
        if (!state) {
            $content.classList.add("d-none");

        } else {
            $content.classList.remove("d-none");

        }
    };
    const renderTypeFieldRule = async (fieldName = null, selectedValue = null, comparisonValue = null) => {

        const isMatchComparison = comparisonValue && confi.contains(comparisonValue, OPERATOR_COMPARISON);
        const isSku = fieldName && confi.contains(fieldName, [fieldRule.sku]);

        if (isSku || isMatchComparison) {
            return renderInputText(selectedValue);
        }

        const typeRules = await getTypesFieldRule(fieldName);
        return renderInputSelect(typeRules, selectedValue);
    };



    const createTemplateRow = async (
        isRenderOperatorLoic,
        operatorValue = null,
        comparisonValue = null,
        FieldName = null,
        FieldValue = null) => {

         
        let htmlRow = null;
        const htmlOperator = isRenderOperatorLoic && await renderOperatorLogic(operatorValue);
        const htmlFielRules = await renderFieldRules(FieldName);
        const htmloperatorComparison = await renderOperatorComparison(comparisonValue ?.IdOperator);
        const htmlTypeFiledRule = await renderTypeFieldRule(FieldName, FieldValue, comparisonValue ?.OperatorText);

        htmlRow = `<div  class="row-filter fade-add-item"> 
                    ${htmlOperator || `<div class='space-blank'></div>`}
                    ${htmlFielRules}
                    ${htmloperatorComparison} 
                    <div class="js-parentFieldRule">${htmlTypeFiledRule}</div>
                    <button class="btn plus" type="button" >
                    </button>
                    <button class="btn remove" type="button" >
                    </button>
                </div>`;
        return htmlRow;

    };


    const renderFieldTypeSelectOrInput = async (rowElement, fieldRuleValue, comparisonValue) => {

        const $contentFieldRule = rowElement.querySelector(".js-parentFieldRule");
        const isMatchComparison = confi.contains(comparisonValue, OPERATOR_COMPARISON);
        const isSku = confi.contains(fieldRuleValue, [fieldRule.sku]);

        if (isMatchComparison || isSku) {

            const $inputTypeRule = rowElement.querySelector(".js-input-type-rule");

            if (!$inputTypeRule) {
                $contentFieldRule.innerHTML = renderInputText();
            }
            return;
        }

        confi.initLoader();

        const typeRules = await getTypesFieldRule(fieldRuleValue);

        confi.stopLoader();

        const $selecTypeRule = rowElement.querySelector(".js-input-select");

        if (!$selecTypeRule) {
            $contentFieldRule.innerHTML = renderInputSelect(typeRules);
            return;
        }
         
        const prevSelectedValue = $selecTypeRule.value;
        //clear select
        $selecTypeRule.options.length = 0;
        typeRules.forEach(({ value, text }) => {
            $selecTypeRule.options[$selecTypeRule.options.length] = new Option(text, value, false, value == prevSelectedValue);
        });
    };


    const templateRowPreviewProducts = ({ BrandDescription, LocalSku, CategoryEn, DescriptionEn }) => {

        const $tr = document.createElement("tr");
        const $tdBrandDescription = document.createElement("td");
        const $tdLocalSku = document.createElement("td");
        const $tdCategoryEn = document.createElement("td");
        const $tdDescriptionEn = document.createElement("td");

        $tdBrandDescription.textContent = BrandDescription;
        $tdLocalSku.textContent = LocalSku;
        $tdCategoryEn.textContent = CategoryEn;
        $tdDescriptionEn.textContent = DescriptionEn;
        $tdDescriptionEn.classList.add("text-ellipsis");
        $tdDescriptionEn.setAttribute("title", DescriptionEn);

        $tr.appendChild($tdBrandDescription);
        $tr.appendChild($tdLocalSku);
        $tr.appendChild($tdCategoryEn);
        $tr.appendChild($tdDescriptionEn);

        return $tr;

    };

    const templateRowInfoRegister = (infoPageElement) => {

        const $tr = document.createElement("tr");
        const $td = document.createElement("td");
        $td.setAttribute("colspan", "4");
        $td.innerHTML = infoPageElement.innerHTML;
        $tr.appendChild($td);
        return $tr;
    };


    return {
        renderMessageEmptyRules,
        createTemplateRow,
        renderFieldTypeSelectOrInput,
        templateRowPreviewProducts,
        templateRowInfoRegister,
        renderTemplate
    };
})();