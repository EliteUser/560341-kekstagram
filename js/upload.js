'use strict';

(function () {


  var FILE_TYPES = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
  ];

  var uploadFileButton = document.querySelector('#upload-file');
  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var picturePreview = document.querySelector('.img-upload__preview');

  /* Проверка типа файла */

  var validFileType = function (file) {
    for (var i = 0; i < FILE_TYPES.length; i++) {
      if (file.type === FILE_TYPES[i]) {
        return true;
      }
    }
    return false;
  };

  /* Очистка превью изображения */

  var clearPicturePreview = function () {
    while (picturePreview.firstElementChild) {
      picturePreview.removeChild(picturePreview.firstElementChild);
    }
  };

  /* Загрузка изображения и показ оверлея */

  var uploadPicture = function (file) {
    if (validFileType(file)) {
      clearPicturePreview();

      var uploadedImg = document.createElement('img');
      var reader = new FileReader();

      uploadedImg.file = file;
      uploadedImg.alt = 'Предварительный просмотр фотографии';

      reader.addEventListener('load', function () {
        uploadedImg.src = reader.result;
      });

      reader.readAsDataURL(file);
      picturePreview.appendChild(uploadedImg);
    } else {
      clearPicturePreview();
      showErrorMessage();
    }
  };

  var showPictureOverlay = function () {
    pictureUploadOverlay.classList.remove('hidden');
    uploadFileButton.removeEventListener('change', fileLoadHandler);

    uploadCancelButton.addEventListener('click', cancelBtnClickHandler);
    document.addEventListener('keydown', cancelButtonEscHandler);
  };

  var hidePictureOverlay = function () {
    window.filter.resetFilter();
    pictureUploadOverlay.classList.add('hidden');
    uploadCancelButton.removeEventListener('click', cancelBtnClickHandler);
    document.removeEventListener('keydown', cancelButtonEscHandler);

    uploadFileButton.value = '';
    uploadFileButton.addEventListener('change', fileLoadHandler);
  };

  var fileLoadHandler = function () {
    var currentFile = uploadFileButton.files[0];
    showPictureOverlay();
    uploadPicture(currentFile);
  };

  var cancelBtnClickHandler = function () {
    hidePictureOverlay();
  };

  var cancelButtonEscHandler = function (evt) {
    window.util.isEscEvent(evt, hidePictureOverlay);
  };

  /* Показ / сокрытие сообщения о загрузке неверного файла */

  var errorMessageOkClickHandler = function () {
    hideErrorMessage();
    uploadFileButton.click();
  };

  var errorMessageCancelClickHandler = function () {
    hideErrorMessage();
  };

  var showErrorMessage = function () {
    var errorMessageElement = document.querySelector('#wrong')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var errorMessageOkButton = errorMessageElement.querySelector('#load');
    var errorMessageCancelButton = errorMessageElement.querySelector('#cancel');
    pictureUploadOverlay.appendChild(errorMessageElement);

    errorMessageOkButton.addEventListener('click', errorMessageOkClickHandler);
    errorMessageCancelButton.addEventListener('click', errorMessageCancelClickHandler);
  };

  var hideErrorMessage = function () {
    var message = pictureUploadOverlay.querySelector('.error');

    message.querySelector('#load').removeEventListener('click', errorMessageOkClickHandler);
    message.querySelector('#cancel').removeEventListener('click', errorMessageCancelClickHandler);
    pictureUploadOverlay.removeChild(message);
    hidePictureOverlay();
  };

  uploadFileButton.addEventListener('change', fileLoadHandler);

  window.upload = {
    hideOverlay: hidePictureOverlay,
  };


})();
