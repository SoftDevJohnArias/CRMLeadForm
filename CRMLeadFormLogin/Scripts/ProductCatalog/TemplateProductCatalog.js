const templateProductCatalog = (() => {

  const createMenuFilterTemplate = (id, nameTypeFilter, options) => {

    const tempalteOptions = options.map(({ value, text, quantity}) => (`
                                    <li >
                                      <input id="${value}" type="checkbox" value="${value}">
                                      <input name="${value}" type="hidden" value="${value}">
                                      <label for="${value}">${text}</label>
                                      <div class="counter">
                                        ${quantity}
                                      </div>
                                    </li>
                                  `)).join('');
    const template = `<li id="${id}" class="parentFilter">
                        <div class="header">
                          <span>${nameTypeFilter}</span>
                           <i class="icon-ws-ico-min-rigth"></i>
                        </div>
                        <ul>
                          ${tempalteOptions}
                        </ul>
                      </li>`;

    const htmlVirtual = document.implementation.createHTMLDocument();
    htmlVirtual.body.innerHTML = template;

    return htmlVirtual.body.children[0];
  };

  return {
    createMenuFilterTemplate
  };

})();