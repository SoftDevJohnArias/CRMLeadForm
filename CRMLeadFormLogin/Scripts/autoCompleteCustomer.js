document.addEventListener("DOMContentLoaded", () => {


    initAutoComplete();

});


//module 

const autoCompleteCustomerModule = (() => {

    let awesomplete = null;
    const setAwesomplete = (element) => {

        awesomplete = new Awesomplete(element, {
            minChars: 1,
            maxItems: 10,
            autoFirst: true
        });
    };

    const getAwesomplete = () => {
        return awesomplete;
    };

    return {
        setAwesomplete,
        getAwesomplete
    };

})();

// functions
const initAutoComplete = () => {
    const $idTrax = document.getElementById("idTrax");
    $idTrax.addEventListener("input", handleChangeCustomer);

    autoCompleteCustomerModule.setAwesomplete($idTrax);
    //awesomplete.list = ["China", "India", "Japan", "Russia", "UK", "USA"];

    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = `<label for="idTrax" class="form-control-placeholder">Customer</label>`;
    $idTrax.parentNode.insertBefore(html.body.children[0], $idTrax.nextSibling);
};

const getCustomerByIdTrax = async (customerId) => {
    const result = await fetch(`/api/GetCustomersByIdTrax/${customerId}`);
    const { customerList } = await result.json();
    return customerList;
};

//events

const handleChangeCustomer = async (ev) => {


    try {
        const value = ev.target.value;

        if (value.length > 2) {
            confi.initLoader();
            const customerList = await getCustomerByIdTrax(value);
            const awesomplete = autoCompleteCustomerModule.getAwesomplete();
            let CustomerList = [];

            customerList.map(item => CustomerList.push(item.CustomerId + ' - ' + item.Description));
            awesomplete.list = CustomerList;
            confi.stopLoader();
        }
    } catch (e) {
        console.error(e);
    }


};

