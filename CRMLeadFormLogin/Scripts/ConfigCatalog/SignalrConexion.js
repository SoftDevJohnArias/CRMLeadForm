const SignalrconexionModule = (() => {

  const catalogHub = $.connection.catalogHub;

  const ConnectionSignalR = () => {
    return new Promise(resolve => {
    $.connection.hub.start()
      .done(function () {  
          setTimeout(() => {
            resolve($.connection.hub.id);
          }, 100);
        }); 
    });
   
  }

  catalogHub.client.ValidateStatusFiles = function (catalogType) {
    CreateFileCatalogModule.setContentCatalogFiles(catalogType);
  };

  const ConnectioncCloseSignalR = () => {
    $.connection.hub.stop();
  }

  return {
    ConnectionSignalR,
    ConnectioncCloseSignalR
  }
})();