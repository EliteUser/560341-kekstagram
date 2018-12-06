'use strict';

(function () {


  var initSlider = function (action) {

    var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
    var effectLevelLine = pictureUploadOverlay.querySelector('.effect-level__line');
    var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');

    var pinMouseDownHandler = function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var pinMouseMoveHandler = function (moveEvt) {
        var target = effectLevelPin;
        var lineWidth = effectLevelLine.offsetWidth;

        moveEvt.preventDefault();

        var shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y,
        };

        var endCoords = {
          x: target.offsetLeft + shift.x,
          y: target.offsetTop + shift.y,
        };

        if (endCoords.x < 0) {
          endCoords.x = 0;
        } else if (endCoords.x > lineWidth) {
          endCoords.x = lineWidth;
        }

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        action(evt, endCoords.x);
      };

      var pinMouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', pinMouseMoveHandler);
        document.removeEventListener('mouseup', pinMouseUpHandler);
      };

      document.addEventListener('mousemove', pinMouseMoveHandler);
      document.addEventListener('mouseup', pinMouseUpHandler);
    };

    effectLevelPin.addEventListener('mousedown', pinMouseDownHandler);

  };

  window.slider = {
    initSlider: initSlider,
  };


})();
