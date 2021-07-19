
const fetchConfigCatalog = (() => {

  let fieldRules = null;
  let operator = null;
  let customerRules = null;
  let brands = null;
  let categories = null;
  let productTypes = null;
  let manufactures = null;

  const getBrands = async (isMyList = false, countResults = false) => {
     
    if (!brands) {
      const response = await fetch(`/api/getBrands/${isMyList}/${countResults}`, confi.getConfig("GET", null, true));
      brands = await response.json();
    }
    return brands.map(({ BrandId, BrandDescription, Quantity }) => ({ value: BrandId, text: BrandDescription, quantity: Quantity }));
  };

  const getCategories = async (isMyList = false, countResults = false) => {
    if (!categories) {
      const response = await fetch(`/api/getCategories/${isMyList}/${countResults}`);
      categories = await response.json();
    }
    return categories.map(({ CategoryId, CategoryComplete, Quantity }) => ({ value: CategoryId, text: CategoryComplete, quantity: Quantity }));
  };

  const getProductTypes = async (isMyList = false, countResults = false) => {
    if (!productTypes) {
      const response = await fetch(`/api/getProducType/${isMyList}/${countResults}`);
      productTypes = await response.json();
    }

    return productTypes.map(({ Id, DescriptionEn, Quantity }) => ({ value: Id, text: DescriptionEn, quantity: Quantity }));
  };

  const getManufacturers = async () => {
    if (!manufactures) {
      const response = await fetch('/api/getManufacturers');
      manufactures = await response.json();
    }
    return manufactures.map(({ ManufacturerId, ManufacturerDescription }) => ({ value: ManufacturerId, text: ManufacturerDescription }));
  };

  const getFieldsRules = async () => {

    if (!fieldRules) {
      const response = await fetch('/api/getFieldsRules');
      fieldRules = await response.json();
    }
    return fieldRules;

  };

  const getSQlOperator = async () => {
    if (!operator) {
      const response = await fetch('/api/getSQlOperator');
      const result = await response.json();
      operator = {
        logic: result.filter(item => item.OperatorType === 'L'),
        comparison: result.filter(item => item.OperatorType !== 'L')
      }
    }

    return operator;
  };

  const getCustomerRules = async () => {

    if (!customerRules) {
      const response = await fetch('/api/getcustomerrules');
      return customerRules = await response.json();
    }

    return customerRules;

  };

  const saveCustomerRules = async (rules) => {
    const response = await fetch("/api/poscustomerrules", confi.getConfig('POST', rules));
    return await response.json();
  };

  const getVerifyCatalogAdmin = async () => {
    const response = await fetch("/api/getVerifyCatalogAdmin");
    return await response.json();
  }

  const getProductsByRules = async (rules, page) => {

    const response = await fetch("/api/GetProductsByRules", confi.getConfig('POST', {
      lstRules: rules,
      PageNumber: page
    }));
    return await response.json();
  };

  return {
    getBrands,
    getCategories,
    getProductTypes,
    getManufacturers,
    getFieldsRules,
    getSQlOperator,
    getCustomerRules,
    saveCustomerRules,
    getVerifyCatalogAdmin,
    getProductsByRules
  }
})();