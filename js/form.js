'use strict';

(function () {


  /* Отправка данных формы на сервер */

  /* Показ / скрытие сообщения об успешной отправке формы */

  var showSuccessMessage = function () {
    var successMessageElement = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);
    var successMessageButton = successMessageElement.querySelector('.success__button');

    document.body.appendChild(successMessageElement);
    successMessageButton.addEventListener('click', successMessageButtonClickHandler);
    successMessageElement.addEventListener('click', successMessageOverlayHandler);
    document.addEventListener('keydown', successMessageEscHandler);
  };

  var hideSuccessMessage = function () {
    var message = document.querySelector('.success');

    message.removeEventListener('click', successMessageOverlayHandler);
    message.querySelector('.success__button').removeEventListener('click', successMessageButtonClickHandler);
    document.removeEventListener('keydown', successMessageEscHandler);
    document.body.removeChild(message);
  };

  var successMessageButtonClickHandler = function () {
    hideSuccessMessage();
  };

  var successMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideSuccessMessage);
  };

  var successMessageOverlayHandler = function (evt) {
    if (evt.target.classList.contains('success')) {
      hideSuccessMessage();
    }
  };

  /* Показ / скрытие сообщения о неудачной отправке формы */

  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');

  var resetOverlay = function () {
    window.upload.hideOverlay();
    pictureUploadOverlay.style = '';
  };

  var showErrorMessage = function () {
    var errorMessageElement = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);
    var errorMessageAgainButton = errorMessageElement.querySelector('#again');
    var errorMessageUploadButton = errorMessageElement.querySelector('#upload');
    document.body.appendChild(errorMessageElement);

    errorMessageAgainButton.addEventListener('click', errorMessageAgainClickHandler);
    errorMessageUploadButton.addEventListener('click', errorMessageUploadClickHandler);
    errorMessageElement.addEventListener('click', errorMessageOverlayHandler);
    document.addEventListener('keydown', errorMessageEscHandler);
  };

  var hideErrorMessage = function () {
    var message = document.querySelector('.error');

    message.removeEventListener('click', errorMessageOverlayHandler);
    message.querySelector('#again').removeEventListener('click', errorMessageAgainClickHandler);
    message.querySelector('#upload').removeEventListener('click', errorMessageUploadClickHandler);
    document.removeEventListener('keydown', errorMessageEscHandler);
    document.body.removeChild(message);
  };

  var errorMessageAgainClickHandler = function () {
    pictureUploadOverlay.style = '';
    hideErrorMessage();
  };

  var errorMessageUploadClickHandler = function () {
    hideErrorMessage();
    resetOverlay();
    document.querySelector('#upload-file').click();
  };

  var errorMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorMessage);
    resetOverlay();
  };

  var errorMessageOverlayHandler = function (evt) {
    if (evt.target.classList.contains('error')) {
      hideErrorMessage();
      resetOverlay();
    }
  };

  /* Обработчики событий на форме */

  var form = document.querySelector('.img-upload__form');

  var formSubmitSuccessHandler = function () {
    window.upload.hideOverlay();
    showSuccessMessage();
  };

  var formSubmitErrorHandler = function () {
    pictureUploadOverlay.style.opacity = 0;
    pictureUploadOverlay.style.zIndex = -1;
    showErrorMessage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(form), formSubmitSuccessHandler, formSubmitErrorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', formSubmitHandler);


})();
