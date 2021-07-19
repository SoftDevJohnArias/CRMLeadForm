

//MODULE
const rulesFilterModule = (() => {

    const targetFilter = {
        operator: "operator",
        fieldName: "fieldName",
        comparsion: "comparsion",
        fieldValue: "fieldValue",
    };

    let groupedRules = null;
    let pagePrewProducts = 1;

    const groupCustomerRule = async (rules = null) => {

        let rowFilters = [];
        if (!rules) {
            rules = await fetchConfigCatalog.getCustomerRules();
        }

        if (rules.length === 0) {
            return null;
        }

        const rulesLogicOperator = rules.filter(({ FieldName, FieldValue }) => !FieldName && !FieldValue);

        //if not exists operator logic-> return only rule
        if (rulesLogicOperator.length == 0) {
            return [rules];
        }

        rulesLogicOperator.forEach((operator) => {

            const leftBranch = rules.find(rule => rule.RuleId === operator.LeftBranch);
            const rightBranch = rules.find(rule => rule.RuleId === operator.RightBranch);
            const existLeftBranch = rowFilters.some(row => row.some(rule => rule.RuleId === leftBranch.RuleId));

            if (!existLeftBranch) {
                rowFilters = [...rowFilters, [leftBranch]];
            }

            rowFilters = [...rowFilters, [{ ...operator, isOperator: true }, rightBranch]];
        });

        return rowFilters;
    };

    const getValuesFormFilterRules = rows => {
        let rules = [];
        [...rows].forEach((row) => {
            const operatorLogic = row.querySelector(".js-operator-logic");
            const { value: operatorId, options } = row.querySelector(".js-operator-comparison");
            const { value: fieldName } = row.querySelector(".js-field-rules");
            const { value: fieldValue } = row.querySelector(".js-type-rules");

            const operationIdComparison = parseInt(operatorId);

            //build object operator
            if (operatorLogic) {
                const operatorIdLogic = parseInt(operatorLogic.value)
                const objectOperator = {
                    OperatorId: operatorIdLogic,
                    FieldName: null,
                    FieldValue: null,
                    sqlOperatorResponse: {
                        IdOperator: operatorIdLogic,
                    }

                }
                rules.push(objectOperator);
            }
            ///build object Rule
            const objectRule = {
                OperatorId: operationIdComparison,
                FieldName: fieldName,
                FieldValue: fieldValue.replace(/\s/g, ''),
                LeftBranch: null,
                RightBranch: null,
                sqlOperatorResponse: {
                    IdOperator: operationIdComparison,
                    OperatorText: options[options.selectedIndex].text
                }

            };

            rules.push(objectRule);
        });
        return rules;
    };

    const setMapOrderRules = (rule, index) => {
        const ruleId = index + 1;
        //Rule type operator Logic
        if (!(rule.FieldName && rule.FieldValue)) {
            return {
                ...rule,
                RuleId: ruleId,
                LeftBranch: ruleId - 1, // ruleId LeftBranch
                RightBranch: ruleId + 1, // ruleId RightBranch
            };
        }
        //Return rule filter
        return {
            ...rule,
            RuleId: ruleId
        };
    };

    const verifyCatalogAdmin = async () => {

        const { Success, Message } = await fetchConfigCatalog.getVerifyCatalogAdmin();
        if (!Success) {
            const $formFilterRules = document.getElementById("formFilterRules");
            $formFilterRules.classList.add("element-disable")
        }
        console.log(Message);

        return Success;
    };

    const createObserverRowFilter = ($contentFilter) => {

        const observer = new MutationObserver((mutations) => {

            const { target, addedNodes, removedNodes } = mutations[0];
            if (removedNodes.length > 0) {
                const { renderTemplate } = configCatalogTemplates;

                if (target.childElementCount === 0) {
                    const { renderMessageEmptyRules } = configCatalogTemplates;
                    renderMessageEmptyRules(target);
                    renderTemplate(".filter-option", false);
                    renderTemplate(".filter-catalog-header", false);
                    return;
                }

                const $firstRow = target.querySelector(".row-filter");
                if ($firstRow) {
                    renderTemplate(".filter-option", true);
                    renderTemplate(".filter-catalog-header", true);

                    const $elementWithOutOperator = $firstRow.querySelector(".space-blank");
                    if (!$elementWithOutOperator) {
                        const $contentOperatorLogic = $firstRow.querySelector(".js-operator-logic").parentElement;
                        $contentOperatorLogic.innerHTML = `<div class='space-blank'></div>`;
                    }
                }
            }

            if (addedNodes.length > 0) {


                const $message = document.querySelector(".message-rules-empty"); //target.parentElement.querySelector(".message-rules-empty");
                if ($message) $message.remove();

                addedNodes.forEach($elementRow => {

                    //set event handle change field-rules
                    const $selectFieldRule = $elementRow.querySelector(".js-field-rules");
                    $selectFieldRule.addEventListener("change", handleChangeFieldRules);

                    const $selectComparator = $elementRow.querySelector(".js-operator-comparison");
                    $selectComparator.addEventListener("change", handleChangeCompararison);

                    const $selectOperatorLogic = $elementRow.querySelector(".js-operator-logic");
                    if ($selectOperatorLogic)
                        $selectOperatorLogic.addEventListener("change", handleChangeOperatorLogic);

                    const $fieldValue = $elementRow.querySelector(".js-type-rules");
                    $fieldValue.addEventListener("change", handleChangeFieldValue);

                    const $btnRemove = $elementRow.querySelector(".remove");
                    $btnRemove.addEventListener("click", handleClicnRemoveRow);

                    const $btnPlus = $elementRow.querySelector(".plus");
                    $btnPlus.addEventListener("click", handleClickAddUpRow);


                    ///Evaluate add  row form fristh row and add one row
                    if (!$elementRow.previousSibling && addedNodes.length == 1) {
                        const $elementWithOutOperator = $elementRow.querySelector(".space-blank");
                        const $contentOperatorLogic = $elementRow.querySelector(".js-operator-logic");
                        const cloneOperatorLogic = $contentOperatorLogic && $contentOperatorLogic.parentElement.cloneNode(true);

                        if (!$elementWithOutOperator) {
                            $contentOperatorLogic.parentElement.innerHTML = `<div class='space-blank'></div>`;
                        }
                        const $nextRow = $elementRow.nextElementSibling;
                        if ($nextRow) {
                            const $spaceBlank = $nextRow.querySelector(".space-blank");
                            $spaceBlank.parentNode.replaceChild(cloneOperatorLogic, $spaceBlank);
                        }
                    }
                });
            }

            document.querySelector("#tablePrewProduts tbody").innerHTML = "";
            document.querySelector(".content-vieW-more").classList.add("d-none");
            document.querySelector(".content-empty").classList.remove("d-none");

        });
        observer.observe($contentFilter, {
            childList: true
        });
    };

    const addRowFilter = async (row = null) => {

        const { createTemplateRow } = configCatalogTemplates;
        if (row) {

            const operator = row.find(rule => rule.isOperator);
            const operatorLogicValue = operator ? operator.sqlOperatorResponse.IdOperator : null;
            const isRenderOperator = operatorLogicValue != undefined;
            const {
                sqlOperatorResponse,
                FieldName,
                FieldValue,

            } = row.find(rule => !rule.isOperator);

            return await createTemplateRow(
                isRenderOperator,
                operatorLogicValue,
                sqlOperatorResponse,
                FieldName, FieldValue)
        }

        const haschildren = document.getElementById("contentFilter").childElementCount > 0;
        return await createTemplateRow(haschildren);
    };

    const renderCustomerRules = async () => {
        const { renderTemplate } = configCatalogTemplates;

        const $contentFilter = document.getElementById("contentFilter");

        if (!groupedRules) {
            groupedRules = await groupCustomerRule();
            createObserverRowFilter($contentFilter);
        }

        if (groupedRules) {
            const html = await Promise.all(groupedRules.map(async row => await addRowFilter(row)));
            $contentFilter.innerHTML = html.join('');
            renderTemplate(".filter-option", true);
            renderTemplate(".filter-catalog-header", true);

        }
        else {
            const { renderMessageEmptyRules } = configCatalogTemplates;
            renderMessageEmptyRules($contentFilter);
            renderTemplate(".filter-option", false);
            renderTemplate(".filter-catalog-header", false);

        }


    };

    const getRulesOrdered = () => {
        const rowsFilters = document.querySelectorAll("#contentFilter > .row-filter");
        return getValuesFormFilterRules(rowsFilters).map((rule, index) => setMapOrderRules(rule, index));
    }

    const notifyAvailableOptionsFilters = (target = null, currentElement = null) => {

        const proxy = new Proxy(groupedRules || [], {

            get: (target, prop) => {
                if (prop === "hasChange") {
                    return target.flat().some(rule => rule.updateOperator
                        || rule.updateFieldName
                        || rule.updateComparison
                        || rule.updateFieldValue);
                }
                return target[prop];
            }
        });
        let indexRule = 0;
        let indexOperator = 0;
        let tagetValue = null;
        let rules = [];
        let indexCurrentElement = 0;


        if (currentElement) {

            tagetValue = currentElement.value;
            indexCurrentElement = confi.getChildIndex(currentElement.closest(".row-filter"));
            rules = proxy[indexCurrentElement];

            if (!rules) return;

            indexRule = rules.findIndex(rules => !rules.isOperator);
            indexOperator = rules.findIndex(rules => rules.isOperator);
        }

        switch (target) {
            case targetFilter.operator:
                const { sqlOperatorResponse: { IdOperator } } = rules.find(rules => rules.isOperator);
                proxy[indexCurrentElement][indexOperator].updateOperator = IdOperator !== parseInt(tagetValue);
                break;
            case targetFilter.fieldName:
                proxy[indexCurrentElement][indexRule].updateFieldName = rules[indexRule].FieldName !== tagetValue;
                break;
            case targetFilter.comparsion:
                proxy[indexCurrentElement][indexRule].updateComparison = rules[indexRule].sqlOperatorResponse.IdOperator !== parseInt(tagetValue);
                break;
            case targetFilter.fieldValue:
                proxy[indexCurrentElement][indexRule].updateFieldValue = rules[indexRule].FieldValue !== tagetValue;
                break;
        }

        const rowsFilters = document.querySelectorAll("#contentFilter > .row-filter");
        if (rowsFilters.length !== proxy.length) {
            toggleEnabledOptionsFilters(true);
        }
        else {
            toggleEnabledOptionsFilters(proxy.hasChange);
        }

    };

    const toggleEnabledOptionsFilters = (enabled) => {

        const $btnSave = document.querySelector(".save-filter");
        const $btnUndoFilters = document.querySelector(".undo-filter");
        if (enabled) {
            $btnSave.classList.remove("disabled-button");
            $btnUndoFilters.classList.remove("disabled-button");
        }
        else {
            $btnSave.classList.add("disabled-button");
            $btnUndoFilters.classList.add("disabled-button");
        }
    }

    const addProductPreView = async (page) => {

        const $tablePreviewProduts = document.querySelector("#tablePrewProduts tbody");

        const { getProductsByRules } = fetchConfigCatalog;
        const { templateRowPreviewProducts } = configCatalogTemplates;
        const rules = getRulesOrdered();
        confi.initLoader();
        const { products, perPage, total, totalPage } = await getProductsByRules(rules, page);
         
        confi.stopLoader();
        products.forEach(product => {
            $tablePreviewProduts.appendChild(templateRowPreviewProducts(product));
        });

        return {
          hasMoreProducts: total > perPage,
          perPage,
          total,
          totalPage
        };

    };

    const renderRowInfoPage = (elementInfo) => {
        const { templateRowInfoRegister } = configCatalogTemplates;
        const $tablePrewProduts = document.querySelector("#tablePrewProduts");
        $tablePrewProduts.classList.add("table-full-data");
        const $rowInfo = templateRowInfoRegister(elementInfo);
        $tablePrewProduts.querySelector("tbody").appendChild($rowInfo);
    }


    ///Events handlers

    const handleChangeFieldRules = async (e) => {
        const { renderFieldTypeSelectOrInput } = configCatalogTemplates;
        const { value: filedValue } = e.target;
        const $rowElement = e.target.closest(".row-filter");
        const $selectComparator = $rowElement.querySelector(".js-operator-comparison");
        const comparisonValue = $selectComparator.options[$selectComparator.options.selectedIndex].text;
        await renderFieldTypeSelectOrInput($rowElement, filedValue, comparisonValue);

        notifyAvailableOptionsFilters(targetFilter.fieldName, e.target);
        notifyAvailableOptionsFilters(targetFilter.fieldValue, $rowElement.querySelector(".js-type-rules"));
    }

    const handleChangeCompararison = async (e) => {
        const { renderFieldTypeSelectOrInput } = configCatalogTemplates;
        const { options } = e.target;
        const $rowElement = e.target.closest(".row-filter");
        const { value: filedValue } = $rowElement.querySelector(".js-field-rules");
        const comparisonValue = options[options.selectedIndex].text;
        await renderFieldTypeSelectOrInput($rowElement, filedValue, comparisonValue);

        notifyAvailableOptionsFilters(targetFilter.comparsion, e.target);
        notifyAvailableOptionsFilters(targetFilter.fieldValue, $rowElement.querySelector(".js-type-rules"));
    };

    const handleChangeOperatorLogic = (e) => {
        notifyAvailableOptionsFilters(targetFilter.operator, e.target);
    };


    const handleChangeFieldValue = (e) => {
        notifyAvailableOptionsFilters(targetFilter.fieldValue, e.target);
    };


    const handleClickAddRow = async () => {
        const { renderTemplate } = configCatalogTemplates;

        renderTemplate(".filter-option", true);
        renderTemplate(".filter-catalog-header", true);

        const htmlNewRow = await addRowFilter();
        const htmlVirtual = document.implementation.createHTMLDocument();
        htmlVirtual.body.innerHTML = htmlNewRow;
        const $elementRow = htmlVirtual.body.children[0];
        document.getElementById("contentFilter").appendChild($elementRow);

        notifyAvailableOptionsFilters();

    };

    const handleClicnRemoveRow = (e) => {
        const $rowElement = e.target.closest(".row-filter");
        $rowElement.classList.remove("fade-add-item");
        $rowElement.classList.add("fade-delete-elment");
        $rowElement.addEventListener("animationend", () => {
            $rowElement.remove();
            notifyAvailableOptionsFilters();
        });


    };

    const handleClickAddUpRow = async (e) => {

        const htmlNewRow = await addRowFilter();
        const htmlVirtual = document.implementation.createHTMLDocument();
        htmlVirtual.body.innerHTML = htmlNewRow;
        const $elementNewRow = htmlVirtual.body.children[0];

        const $currenRow = e.target.closest(".row-filter");
        const $contentParent = $currenRow.parentElement;

        $contentParent.insertBefore($elementNewRow, $currenRow);

        notifyAvailableOptionsFilters();
    };

    const handleSubmitSaveRules = async (e) => {

        e.preventDefault();
        const rules = getRulesOrdered();

        confi.initLoader();
        const { Message, Success } = await fetchConfigCatalog.saveCustomerRules(rules);
        confi.stopLoader();

        //Update rules agruped saved
        if (Success) {
            CreateFileCatalogModule.generateCatalogs();
            groupedRules = await groupCustomerRule(rules);
            toggleEnabledOptionsFilters(false);
        }

        alert(Message);
    };

    const handleClickUndoFilters = async (e) => {
        await renderCustomerRules();
        toggleEnabledOptionsFilters(false);
    };

    const handleClickApplyFilter = async (e) => {

        const $viewMore = document.querySelector(".content-vieW-more");
        const $contentEmpty = document.querySelector(".content-empty");
        const $tablePrewProduts = document.querySelector("#tablePrewProduts")
        $tablePrewProduts.classList.remove("table-full-data");
        $tablePrewProduts.querySelector("tbody").innerHTML = "";
        $viewMore.classList.add("d-none");

        pagePrewProducts = 1;
        const { total, hasMoreProducts, perPage } = await addProductPreView(pagePrewProducts);


        if (total > 0) {
            $contentEmpty.classList.add("d-none");
             
            Pagination.Init(total, perPage);
            if (hasMoreProducts) {
                $viewMore.classList.remove("d-none");
                $viewMore.querySelector(".js-btnViewMore").classList.remove("d-none");
            }
            else {
                renderRowInfoPage($viewMore.querySelector("#containerPaginator"));
            }

        } else {
            $contentEmpty.classList.remove("d-none");
        }
    };

    const handleClickViewMore = async (e) => {
        pagePrewProducts++;
        const { totalPage } = await addProductPreView(pagePrewProducts);

        Pagination.Next();

        if (totalPage === pagePrewProducts) {
            const $viewMoreContent = e.target.parentElement;
            $viewMoreContent.classList.add("d-none");
            renderRowInfoPage($viewMoreContent.querySelector("#containerPaginator"));
        }

    };

    return {
        renderCustomerRules,
        handleChangeFieldRules,
        handleClickAddRow,
        handleSubmitSaveRules,
        handleChangeCompararison,
        handleClicnRemoveRow,
        verifyCatalogAdmin,
        handleClickAddUpRow,
        handleClickUndoFilters,
        handleClickApplyFilter,
        handleClickViewMore
    };

})();


//EVENT
document.addEventListener("DOMContentLoaded", async () => {

    //Render rules
    confi.initLoader();

    const canViewRules = await rulesFilterModule.verifyCatalogAdmin();
    if (canViewRules) {
        await rulesFilterModule.renderCustomerRules();


        //access DOM
        const $btnAddFilter = document.getElementById("btnAddFilter");
        const $formFilterRules = document.getElementById("formFilterRules");
        const $btnUndoFilters = document.querySelector(".undo-filter");
        const $btnSetFilter = document.querySelector(".set-filter");
        const $btnViewMore = document.querySelector(".js-btnViewMore");

        $formFilterRules.addEventListener("submit", rulesFilterModule.handleSubmitSaveRules);
        validateForm.init($formFilterRules);

        $btnAddFilter.addEventListener("click", rulesFilterModule.handleClickAddRow);
        $btnUndoFilters.addEventListener("click", rulesFilterModule.handleClickUndoFilters);
        $btnSetFilter.addEventListener("click", rulesFilterModule.handleClickApplyFilter);
        $btnViewMore.addEventListener("click", rulesFilterModule.handleClickViewMore);
    }

    confi.stopLoader();
});

