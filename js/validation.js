'use strict';

var ESC_KEYCODE = 27;
var MAX_HASHTAGS = 5;
var HASHTAG_MAXLENGTH = 20;

/* Сравнение массивов строк (с хэштегами) */

var compareArrays = function (firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  } else {
    for (var i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
  }
  return true;
};

/* Проверка на наличие одинаковых элементов в массиве */

var hasDuplicates = function (array) {
  var duplicatesFlag = false;
  array.forEach(function (elem, index) {
    for (var i = 0; i < array.length; i++) {
      if (duplicatesFlag) {
        break;
      } else if (i === index) {
        continue;
      } else if (array[i] === elem) {
        duplicatesFlag = true;
        break;
      }
    }
  });
  return duplicatesFlag;
};

/* Проверка хэштегов на соответствие (с использованием регулярного выражения) */

var validateHashtags = function (hashtags) {
  var hashtagRegExp = /((?!\s|\b)#[а-яёa-z0-9\-_]{1,19}(?=\s|$))/gi;
  var matches = hashtags.match(hashtagRegExp);
  if (!matches || matches.length > MAX_HASHTAGS) {
    return false;
  } else {
    return compareArrays(matches, hashtags.split(' '));
  }
};

/* Валидация полей формы отправки изображения */

var hashtagsTextField = document.querySelector('.text__hashtags');
var descriptionTextField = document.querySelector('.text__description');

var hashtagsTextFieldInputHandler = function (evt) {
  var target = evt.target;
  var userInput = target.value;
  var userInputArray = userInput.split(' ');
  var validInput = validateHashtags(userInput);

  if (!validInput && userInputArray.length > MAX_HASHTAGS) {
    target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (hasDuplicates(userInput.toLowerCase().split(' '))) {
    target.setCustomValidity('Хэш-теги нечувствительны к регистру и не могут быть использованы дважды.');
  } else if (!validInput) {

    for (var i = 0; i < userInputArray.length; i++) {
      var elem = userInputArray[i];
      if (elem[0] !== '#') {
        target.setCustomValidity('Хэш-тег должен начинаться с решетки (#).');
      } else if (elem === '#') {
        target.setCustomValidity('Хэш-тег не может состоять только из одной решётки.');
      } else if (elem.slice(1).indexOf('#') !== -1) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелами.');
      } else if (elem.length > HASHTAG_MAXLENGTH) {
        target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      } else {
        target.setCustomValidity('Проверьте правильность заполнения поля.');
      }
    }

  } else {
    target.setCustomValidity('');
  }
};

hashtagsTextField.addEventListener('input', hashtagsTextFieldInputHandler);
hashtagsTextField.addEventListener('invalid', hashtagsTextFieldInputHandler);

/* Отмена закрытия формы при нажатии на ESC при фокусе на полях ввода */

var cancelEscEvent = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

hashtagsTextField.addEventListener('keydown', cancelEscEvent);
descriptionTextField.addEventListener('keydown', cancelEscEvent);
