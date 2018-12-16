'use strict';

(function () {


  var FILTER_DEFAULT_VALUE = 100;
  var FILTER_CHROME = 'chrome';
  var FILTER_SEPIA = 'sepia';
  var FILTER_MARVIN = 'marvin';
  var FILTER_PHOBOS = 'phobos';
  var FILTER_HEAT = 'heat';

  var pictureUploadOverlay = document.querySelector('.img-upload__overlay');
  var pictureEffectsButtons = pictureUploadOverlay.querySelectorAll('.effects__radio');
  var pictureEffectPreviews = pictureUploadOverlay.querySelectorAll('.effects__preview');

  var effectLevelInput = pictureUploadOverlay.querySelector('.effect-level__value');
  var effectLevelLine = pictureUploadOverlay.querySelector('.effect-level__line');
  var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

  /* Добавление и переключения фильтров на изображении */

  var resetFilter = function () {
    var picture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var hashtagsTextField = document.querySelector('.text__hashtags');
    var descriptionTextField = document.querySelector('.text__description');

    hashtagsTextField.value = '';
    descriptionTextField.value = '';

    effectLevelInput.value = FILTER_DEFAULT_VALUE;
    effectLevelPin.style.left = FILTER_DEFAULT_VALUE + '%';
    effectLevelDepth.style.width = FILTER_DEFAULT_VALUE + '%';

    if (picture) {
      picture.style = '';
      pictureEffectsButtons[0].checked = true;
      addPictureFilter('none');
      window.scale.resetScale();
    }
  };

  var addPictureFilter = function (filterName) {
    var picture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var filterLevel = pictureUploadOverlay.querySelector('.effect-level');
    var filterLevelInput = filterLevel.querySelector('.effect-level__value');

    if (filterName === 'none') {
      filterLevel.classList.add('hidden');
      filterLevelInput.disabled = true;
      picture.classList = '';
      picture.style.filter = '';
    } else {
      filterLevel.classList.remove('hidden');
      filterLevelInput.disabled = false;
      picture.classList = '';
      picture.style.filter = '';
      picture.classList.add('effects__preview--' + filterName);
    }
  };

  var pictureEffectClickHandler = function (filterName, index) {
    return function () {
      pictureEffectsButtons[index].checked = true;

      effectLevelInput.value = FILTER_DEFAULT_VALUE;
      effectLevelPin.style.left = FILTER_DEFAULT_VALUE + '%';
      effectLevelDepth.style.width = FILTER_DEFAULT_VALUE + '%';

      addPictureFilter(filterName);
    };
  };

  pictureEffectPreviews.forEach(function (elem, index) {
    var filterName = pictureEffectsButtons[index].value;
    elem.addEventListener('click', pictureEffectClickHandler(filterName, index));
    pictureEffectsButtons[index].addEventListener('focus', pictureEffectClickHandler(filterName, index));
  });

  /* Изменение глубины эффекта */

  var setPictureEffect = function (effect, level) {
    var cssEffect;
    switch (effect) {
      case FILTER_CHROME:
        cssEffect = 'grayscale(' + level / 100 + ')';
        break;
      case FILTER_SEPIA:
        cssEffect = 'sepia(' + level / 100 + ')';
        break;
      case FILTER_MARVIN:
        cssEffect = 'invert(' + level + '%)';
        break;
      case FILTER_PHOBOS:
        cssEffect = 'blur(' + 3 * level / 100 + 'px)';
        break;
      case FILTER_HEAT:
        cssEffect = 'brightness(' + ((2 * level / 100) + 1) + ')';
        break;
    }
    return cssEffect;
  };

  var getActiveEffect = function () {
    var pictureActiveEffect;
    var pictureEffects = pictureUploadOverlay.querySelectorAll('.effects__radio');

    pictureEffects.forEach(function (elem) {
      if (elem.checked) {
        pictureActiveEffect = elem.value;
      }
    });

    return pictureActiveEffect;
  };

  var changeEffectLevel = function (target, position) {
    var userPicture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var lineWidth = effectLevelLine.offsetWidth;
    var effectLevel = (position / lineWidth) * 100;

    effectLevelInput.value = parseInt(effectLevel, 10);
    effectLevelPin.style.left = effectLevel + '%';
    effectLevelDepth.style.width = effectLevel + '%';

    userPicture.style.filter = setPictureEffect(getActiveEffect(), effectLevel);
  };

  window.slider.initSlider(changeEffectLevel);

  window.filter = {
    resetFilter: resetFilter,
  };


})();
