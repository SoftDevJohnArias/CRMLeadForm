const documentLead = (() => {

  //let DELETE_LINK = "Borrar";
  //let UPLOAD_FILE = "Subir archivo";

  const EXTENSIONS_ALLOW = ["pdf", "doc", "jpeg", "jpg", "png", "docx"];

  let filesLead = [];


  const init = (form) => {    
    const $linksActionFile = form.querySelectorAll(".file-container .lnk-action-file");
    $linksActionFile.forEach(lnk => {
      lnk.addEventListener('click', handleClickActionLink);
    });

    validateInitForm();

  };

  const validateInitForm = () => {
    const $formLead = document.querySelector(".form-Lead");
    validateForm.init($formLead);
  };

  const deleteFile = (file) => filesLead = filesLead.filter(({ fileName }) => fileName !== file);

  const getFiles = () => filesLead;

  const validateExtensionFile = (fileName) => {
    const extension = fileModule.getExtensionFile(fileName);
    return EXTENSIONS_ALLOW.includes(extension.toLowerCase());
  }

  const setInvalidFileInput = (input, message) => {
    input.value = message;
    validateForm.getValidation().addError(input)
  }

  const handleClickActionLink = (e) => {    
    e.preventDefault();
    UPLOAD_FILE = getConfigMessage.strings.Lead.UploadFile;

    const $link = e.currentTarget;
    const $inputFile = $link.parentElement.querySelector(".file-lead");

    const { deletefile } = $link.dataset;

    if (deletefile) {
      const $inputTextNameFile = $link.parentElement.querySelector(".file-name");

      //delete file
      deleteFile($inputTextNameFile.value);

      $link.innerHTML = UPLOAD_FILE;
      $link.removeAttribute("data-deleteFile");
      $inputFile.value = "";
      $inputTextNameFile.value = "";
      $inputTextNameFile.classList.remove("is-error", "is-valid");
      return;
    }

    $inputFile.addEventListener("change", handleChangeFile, true);
    $inputFile.click();
  };

  const handleChangeFile = async (evt) => {

    try {
      DELETE_LINK = getConfigMessage.strings.Lead.Delete;
      const $prentElement = evt.target.parentElement;
      const $inputTextNameFile = $prentElement.querySelector(".file-name");

      const $linksActionFile = $prentElement.querySelector(".lnk-action-file");
      $linksActionFile.innerHTML = templateLead.templateIconDelete(DELETE_LINK);
      $linksActionFile.setAttribute("data-deleteFile", "true");


      const files = evt.target.files;

      if (files.length === 0) {
        console.log('No files selected');
        return;
      }

      const [file] = files;
      const size = parseInt(file.size / 1024);
      if (size > 1024) {

        setInvalidFileInput($inputTextNameFile, getConfigMessage.strings.Lead.SizeExceeded);
        evt.value = "";
        return;
      }

      if (!validateExtensionFile(file.name)) {
        setInvalidFileInput($inputTextNameFile, "Formato de archivo incorrecto");
        evt.value = "";
        return;
      }


      const arrayBuffer = await getBufferFile(file);

      $inputTextNameFile.value = file.name;
      validateForm.getValidation().addSuccess($inputTextNameFile);
      const q = $inputTextNameFile;      
      let extension = file.name.split(".");
      const ext = extension[extension.length - 1];

      filesLead.push({
        //document: $inputTextNameFile.dataset.filenameoriginal,
        ////fileName: file.name, 
        //document_name: $inputTextNameFile.value,
        //bytes: arrayBuffer,

        document: arrayBuffer,
        fileName: $inputTextNameFile.value,
        document_name: $inputTextNameFile.dataset.filenameoriginal + "." + ext,
        document_name_summary: $inputTextNameFile.dataset.filenameoriginal,
      });


    } catch (e) {
      console.error(e);
      filesLead = [];
    }

  };

  const getBufferFile = (fileData) => {

    return new Promise((resolve, reject) => {
      //const reader = new FileReader();
      //reader.readAsArrayBuffer(fileData);
      //reader.onload = () => {

      //  const arrayBuffer = reader.result;
      //  const bytes = new Uint8Array(arrayBuffer);
      //  const binaryString = String.fromCharCode.apply(null, bytes);
      //  var data = btoa(binaryString);
      //  resolve(data);
      //}
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileData);
      reader.onload = () => {

        const arrayBuffer = reader.result;
        const bytes = new Uint8Array(arrayBuffer);

        //const binaryString = String.fromCharCode.apply(null, bytes);
        var binary = '';
        var len = bytes.byteLength;

        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        var data = btoa(binary);
        resolve(data);
      }

      reader.onerror = () => {
        reject(reader.error);
        reader.abort();
      };
    });
  };

  return {
    init,
    getFiles,
  };
})();


