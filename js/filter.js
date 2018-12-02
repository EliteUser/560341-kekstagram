'use strict';

var FILTER_DEFAULT_VALUE = 100;

var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
var pictureEffectsButtons = pictureUploadOverlay.querySelectorAll('.effects__radio');
var pictureEffectPreviews = pictureUploadOverlay.querySelectorAll('.effects__preview');

var effectLevelInput = pictureUploadOverlay.querySelector('.effect-level__value');
var effectLevelLine = pictureUploadOverlay.querySelector('.effect-level__line');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

/* Добавление и переключения фильтров на изображении */

var addPictureFilter = function (filterName) {
  var picture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
  var filterLevel = pictureUploadOverlay.querySelector('.effect-level');

  if (filterName === 'none') {
    filterLevel.classList.add('hidden');
    picture.classList = '';
    picture.style = '';
  } else {
    picture.classList = '';
    picture.style = '';
    picture.classList.add('effects__preview--' + filterName);
    filterLevel.classList.remove('hidden');
  }
};

pictureEffectPreviews.forEach(function (elem, index) {
  var filterName = pictureEffectsButtons[index].value;
  elem.addEventListener('click', function () {
    pictureEffectsButtons[index].checked = true;

    effectLevelInput.setAttribute('value', FILTER_DEFAULT_VALUE);
    effectLevelPin.style.left = FILTER_DEFAULT_VALUE + '%';
    effectLevelDepth.style.width = FILTER_DEFAULT_VALUE + '%';

    addPictureFilter(filterName);
  });
});

var changeEffectLevel = function (effect, level) {
  var cssEffect;
  switch (effect) {
    case 'chrome':
      cssEffect = 'grayscale(' + level / 100 + ')';
      break;
    case 'sepia':
      cssEffect = 'sepia(' + level / 100 + ')';
      break;
    case 'marvin':
      cssEffect = 'invert(' + level + '%)';
      break;
    case 'phobos':
      cssEffect = 'blur(' + 3 * level / 100 + 'px)';
      break;
    case 'heat':
      cssEffect = 'brightness(' + ((2 * level / 100) + 1) + ')';
      break;
  }
  return cssEffect;
};

var getActiveEffect = function () {
  var pictureActiveEffect;
  var pictureEffects = pictureUploadOverlay.querySelectorAll('.effects__radio');

  for (var i = 0; i < pictureEffects.length; i++) {
    if (pictureEffects[i].checked === true) {
      pictureActiveEffect = pictureEffects[i].value;
    }
  }
  return pictureActiveEffect;
};

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
    var userPicture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var effectLevel = (endCoords.x / lineWidth) * 100;

    effectLevelInput.setAttribute('value', effectLevel);
    effectLevelInput.value = effectLevel;

    target.style.left = effectLevel + '%';
    effectLevelDepth.style.width = effectLevel + '%';

    userPicture.style.filter = changeEffectLevel(getActiveEffect(), effectLevel);
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
