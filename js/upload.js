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
  }
};

var showPictureOverlay = function () {
  pictureUploadOverlay.classList.remove('hidden');
  uploadFileButton.removeEventListener('change', fileLoadHandler);

  uploadCancelButton.addEventListener('click', cancelBtnClickHandler);
  document.addEventListener('keydown', cancelButtonEscHandler);
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

uploadFileButton.addEventListener('change', fileLoadHandler);
