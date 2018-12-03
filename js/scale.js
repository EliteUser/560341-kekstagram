'use strict';

(function () {


  var MIN_PICTURE_SIZE = 0;
  var MAX_PICTURE_SIZE = 100;
  var SCALE_STEP = 25;

  /* Изменение размеров изображения */

  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var scaleUpButton = pictureUploadOverlay.querySelector('.scale__control--bigger');
  var scaleDownButton = pictureUploadOverlay.querySelector('.scale__control--smaller');

  var scaleImage = function (bigger) {
    var picture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var scaleControl = pictureUploadOverlay.querySelector('.scale__control--value');
    var currentScale = parseInt(scaleControl.value, 10);

    if (bigger && currentScale < MAX_PICTURE_SIZE) {
      currentScale += SCALE_STEP;
    } else if (!bigger && currentScale > MIN_PICTURE_SIZE) {
      currentScale -= SCALE_STEP;
    }

    scaleControl.value = currentScale + '%';
    picture.style = 'transform: scale(' + (currentScale / 100) + ')';
  };

  var scaleUpButtonClickHandler = function () {
    scaleImage(true);
  };

  var scaleDownButtonClickHandler = function () {
    scaleImage(false);
  };

  scaleUpButton.addEventListener('click', scaleUpButtonClickHandler);
  scaleDownButton.addEventListener('click', scaleDownButtonClickHandler);


})();
