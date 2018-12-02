'use strict';

var MIN_PICTURE_SIZE = 0;
var MAX_PICTURE_SIZE = 100;
var SCALE_STEP = 25;

var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
var pictureEffectsButtons = pictureUploadOverlay.querySelectorAll('.effects__radio');
var pictureEffectPreviews = pictureUploadOverlay.querySelectorAll('.effects__preview');

/* Изменение размеров изображения */

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

/* Добавление и переключения фильтров на изображении */

var addPictureFilter = function (filterName) {
  var picture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
  var filterLevel = pictureUploadOverlay.querySelector('.effect-level');

  if (filterName === 'none') {
    filterLevel.classList.add('hidden');
    picture.classList = '';
  } else {
    picture.classList = '';
    picture.classList.add('effects__preview--' + filterName);
    filterLevel.classList.remove('hidden');
  }
};

pictureEffectPreviews.forEach(function (elem, index) {
  var filterName = pictureEffectsButtons[index].value;
  elem.addEventListener('click', function () {
    pictureEffectsButtons[index].checked = true;
    addPictureFilter(filterName);
  });
});

// TODO ползунок глубины фильтра
