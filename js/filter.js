'use strict';

(function () {


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
      picture.style.filter = '';
    } else {
      picture.classList = '';
      picture.style.filter = '';
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

  /* Слайдер изменения глубины эффекта */

  var setPictureEffect = function (effect, level) {
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

  var changeEffectLevel = function (target, position) {
    var userPicture = pictureUploadOverlay.querySelector('.img-upload__preview').firstElementChild;
    var lineWidth = effectLevelLine.offsetWidth;
    var effectLevel = (position / lineWidth) * 100;

    effectLevelInput.setAttribute('value', effectLevel);
    effectLevelInput.value = effectLevel;

    effectLevelPin.style.left = effectLevel + '%';
    effectLevelDepth.style.width = effectLevel + '%';

    userPicture.style.filter = setPictureEffect(getActiveEffect(), effectLevel);
  };

  window.slider.initSlider(changeEffectLevel);


})();


