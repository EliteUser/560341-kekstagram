'use strict';

(function () {


  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomInteger = function (min, max) {
    return Math.round((Math.random() * (max - min)) + min);
  };

  /* Сравнение массивов строк (для хэштегов) */

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

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    isEscEvent: isEscEvent,
    getRandomArrayElement: getRandomArrayElement,
    getRandomInteger: getRandomInteger,
    compareArrays: compareArrays,
    hasDuplicates: hasDuplicates,
  };


})();
