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
    // А что он делать то должен? В ТЗ вроде ничего не сказано. Пусть пока просто закрывает окно с ошибкой
    hideErrorMessage();
  };

  var errorMessageUploadClickHandler = function () {
    hideErrorMessage();
    document.querySelector('#upload-file').click();
  };

  var errorMessageEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideErrorMessage);
  };

  var errorMessageOverlayHandler = function (evt) {
    if (evt.target.classList.contains('error')) {
      hideErrorMessage();
    }
  };

  /* Обработчики событий на форме */

  var form = document.querySelector('.img-upload__form');

  var formSubmitSuccessHandler = function () {
    window.upload.hideOverlay();
    showSuccessMessage();
  };

  var formSubmitErrorHandler = function () {
    window.upload.hideOverlay();
    showErrorMessage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(form), formSubmitSuccessHandler, formSubmitErrorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', formSubmitHandler);


})();
