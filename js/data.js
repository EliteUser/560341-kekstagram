'use strict';

(function () {


  /* Генерация данных изображений */

  var PICTURES_QUANTITY = 25;
  var LIKES_MIN_QUANTITY = 15;
  var LIKES_MAX_QUANTITY = 200;

  var COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!',
  ];

  var createPictureElement = function (url, likes, comments, description, index) {
    return {url: url, likes: likes, comments: comments, description: description, index: index};
  };

  var generatePictureComments = function (comments) {
    var pictureComments = [];
    var pictureCommentsQuantity = window.util.getRandomInteger(1, 2);
    for (var i = 0; i < pictureCommentsQuantity; i++) {
      pictureComments.push(window.util.getRandomArrayElement(comments));
    }
    return pictureComments;
  };

  var generatePicturesData = function () {
    var data = [];
    for (var i = 0; i < PICTURES_QUANTITY; i++) {
      var pictureIndex = i;
      var pictureURL = 'photos/' + (i + 1) + '.jpg';
      var pictureLikes = window.util.getRandomInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY);
      var pictureComments = generatePictureComments(COMMENTS);
      var pictureDescription = window.util.getRandomArrayElement(DESCRIPTIONS);
      data.push(createPictureElement(pictureURL, pictureLikes, pictureComments, pictureDescription, pictureIndex));
    }
    return data;
  };

  window.data = {
    picturesData: generatePicturesData(),
  };


})();
