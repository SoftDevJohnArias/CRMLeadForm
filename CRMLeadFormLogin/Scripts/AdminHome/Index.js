document.addEventListener("DOMContentLoaded", () => {
    
    const $elementsDescriptions = document.querySelectorAll(".text-description");
    [...$elementsDescriptions].forEach((item) => {
        item.innerText = reduceString(item.innerText);
    });

});


const reduceString = (value) => {
    if (value.length > 45) {
      return `${value.substring(0, 45)} ...`;
    }
    return value;
};