//MODULE

const productModule = (() => {
  //private
  let products = null;

  const createTemplateGrid = (product, isMyList) => {

    const { productCatalog:
      { itemsStock,
        detail,
      } } = getConfigMessage.strings;

    let dataTitle = getConfigMessage.strings.productCatalog.RemoveFromList;
    let dataAction = false;
    if (!isMyList) {
      dataTitle = product.AddedToMyList ? dataTitle : getConfigMessage.strings.productCatalog.AddList;
      dataAction = product.AddedToMyList ? false : true;
    }

    return `
    <article
       class="product-grid-item-card fade-animation"
    >
     <div
         id="product-${product.Sku}"
         class="card-image loading">
     </div>
      <p class="description" title="${product.Descripction}">
          ${product.Descripction}
      </p>
      <p class="brand">${product.BrandDescription}</p>
       ${isMyList ? `<div class="content-stock">
                    <div class="stock" >
                      <div class="circle"></div>
                        <span>${product.InStock} ${itemsStock}</span>
                    </div>
                   </div >`:``}
     <hr />
    <div class="info-product-content">
      <p class="info-product" >
        NP:${product.Mpn} |
        <span data-sku="${product.Sku}" onClick="handleClickCopy(this)">
              SKU: ${product.Sku} 
            <i class="icon-ws-ico-min-copy icon-copy"></i> 
        <span>
      </p>
      ${isMyList ? ` <div class="contend-price">
         <span class="price">
          $ ${confi.thousandSeparator(product.UnitPrice)}
        </span>
        <span class="vat">
          excl VAT
        </span>
      </div>` : ``}
    </div>
    <div class="content-option ">
      <hr />
      <div class="options">
        <button
         data-sku="${product.Sku}"
         data-action=${dataAction}
         class="btn btn-iws-second margin"
         onClick="handleCreateOrRemoveSku(this)"
        >
       <span>${dataTitle}</span>
        </button>
        <button class="btn btn-iws-primary">
          ${detail}
        </button>
      </div>
    </div>
    </article>  `;

  };

  const getProducts = async (searchParams, isReloadProducts) => {
     
    if (!isReloadProducts) {
      return products;
    }
    const { apisIws: { catalogApis: { getProductCatalog } } } = getApiEndpoind;
    const response = await fetch(getProductCatalog, confi.getConfig("POST", searchParams, true));
    products = await response.json();
    return products;
  };

  const renderImageProducts = (products) => {

    const { productCatalog:
      {
        imageNotFound
      } } = getConfigMessage.strings;


    products.forEach(product => {
      let { Sku } = product;
      imageModule.loadAsyncImage(product.UrlMainImage).
        then(({ image, erroLoad }) => {
          const $ContentImage = document.getElementById(`product-${Sku}`);
          if ($ContentImage) {

            $ContentImage.classList.remove("loading");
            $ContentImage.classList.add("fade-animation");
            $ContentImage.appendChild(image);

            if (erroLoad) {
              const $message = document.createElement("p");
              $message.innerText = imageNotFound;
              $ContentImage.appendChild($message);
              $ContentImage.classList.add("image-default");
            }
          }
        });
    });

  };

  //public
  const buildProductGrid = async (searchParams, isReloadProducts) => {

    try {
      const divContentProducts = document.getElementById("divContentProducts");
      confi.initLoader();
      const { products, totalRecords } = await getProducts(searchParams, isReloadProducts);
      confi.stopLoader();
      const htmlProducts = products.map(product => createTemplateGrid(product, searchParams.IsMyList)).join("");

      const sectionProduct = `<section class="product-grid-item">
                              ${htmlProducts}
                            </section>`;

      const gridContainer = document.createElement("div");
      gridContainer.classList.add("product-grid-container");
      gridContainer.innerHTML = sectionProduct;
      divContentProducts.innerHTML = '';
      divContentProducts.appendChild(gridContainer);

      renderImageProducts(products);
      return totalRecords;
    } catch (e) {
      console.error(e.toString());
      confi.stopLoader();
      return null;
    }
  };

  const buildProductsList = async (searchParams, isReloadProducts) => {
    const { products, totalRecords } = await getProducts(searchParams, isReloadProducts);
    console.log(products);
    console.log(totalRecords);
    document.getElementById("divContentProducts").innerHTML = `<h3 style="padding: 1.25em;">This page is building </h3>`;
    return totalRecords;
  }

  return {
    buildProductGrid,
    buildProductsList
  };
})();

//EVENTS

const handleClickCopy = (e) => {
  const { productCatalog: { SkuCopied } } = getConfigMessage.strings;
  const { sku } = e.dataset;
  confi.copyToClipboard(sku);
  alertNotificaction.showNotify(SkuCopied);
};

const handleCreateOrRemoveSku = async (e) => {
  const insert = e.dataset.action;
  const sku = e.dataset.sku;
  const ProductAddedToMyList = getConfigMessage.strings.productCatalog.ProductAddedToMyList;
  const response = await fetch(`/api/CreateOrRemoveSku/${sku}/${insert}`);
  if (response.ok) {
    filterCatalogModule.searchProductsByFilters(null,false);
    if (insert==="true")
      alertNotificaction.showNotify(ProductAddedToMyList);
  }
};