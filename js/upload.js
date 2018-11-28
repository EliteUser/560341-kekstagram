'use strict';

var ESC_KEYCODE = 27;

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

    reader.onload = (function (img) {
      return function (e) {
        img.src = e.target.result;
      };
    })(uploadedImg);
    reader.readAsDataURL(file);

    picturePreview.appendChild(uploadedImg);
    showSuccessMessage();
  } else {
    clearPicturePreview();
    showErrorMessage();
  }
};

var showPictureOverlay = function () {
  pictureUploadOverlay.classList.remove('hidden');
  uploadFileButton.removeEventListener('change', fileLoadHandler);
};

var hidePictureOverlay = function () {
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
  if (evt.keyCode === ESC_KEYCODE) {
    hidePictureOverlay();
  }
};

/* Показ / сокрытие сообщения об успешной загрузке */

var successMessageOkClickHandler = function () {
  hideSuccessMessage();
};

var successMessageOkEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideSuccessMessage();
  }
};

var showSuccessMessage = function () {
  var successMessageElement = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);

  var successMessageOkButton = successMessageElement.querySelector('.success__button');
  pictureUploadOverlay.appendChild(successMessageElement);

  successMessageOkButton.addEventListener('click', successMessageOkClickHandler);
  document.addEventListener('keydown', successMessageOkEscHandler);
};

var hideSuccessMessage = function () {
  var message = pictureUploadOverlay.querySelector('.success');

  message.querySelector('.success__button').removeEventListener('click', successMessageOkClickHandler);
  document.removeEventListener('keydown', successMessageOkEscHandler);
  pictureUploadOverlay.removeChild(message);

  uploadCancelButton.addEventListener('click', cancelBtnClickHandler);
  document.addEventListener('keydown', cancelButtonEscHandler);
};

/* Показ / сокрытие сообщения о неудачной загрузке */

var errorMessageOkClickHandler = function () {
  hideErrorMessage();
};

var showErrorMessage = function () {
  var errorMessageElement = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  var errorMessageOkButton = errorMessageElement.querySelector('#upload');
  pictureUploadOverlay.appendChild(errorMessageElement);

  errorMessageOkButton.addEventListener('click', errorMessageOkClickHandler);
};

var hideErrorMessage = function () {
  var message = pictureUploadOverlay.querySelector('.error');

  message.querySelector('#upload').removeEventListener('click', errorMessageOkClickHandler);
  pictureUploadOverlay.removeChild(message);
  hidePictureOverlay();
  uploadFileButton.click();
};

uploadFileButton.addEventListener('change', fileLoadHandler);
