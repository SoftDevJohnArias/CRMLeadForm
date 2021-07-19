$(document).ready(function () {

    zE(function () {
        zE.setLocale(getConfigMessage.scope.language);
        window.zESettings = {
            webWidget: {
                zIndex: -1
            }
        };
    });
});
document.addEventListener("DOMContentLoaded", () => {

    $("[data-toggle=popover]").popover();
    // $zopim.livechat.setLanguage(getConfigMessage.scope.typeLanguage[languageSelected]);
    setLanguage(getConfigMessage.scope.language);

    $(document).on('click', '.languaje > a', function (e) {
        var id_Lenguage = e.currentTarget.id;
        if (window.location.pathname !== "/") {
            // $zopim.livechat.setLanguage(id_Lenguage);
            window.location = window.location.origin + "/" + id_Lenguage + window.location.pathname.replace("/en", "").replace("/es", "").replace("/pt", "");
        }
        else {
            window.location = window.location.origin + "/" + id_Lenguage + "/Account/Login";
        }
    });

});

const setLanguage = (languageSelected) => {
    const $textLanguage = document.getElementById("textLanguage");
    $textLanguage.innerText = getConfigMessage.scope.typeLanguage[languageSelected];
};