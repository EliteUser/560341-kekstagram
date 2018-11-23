'use strict';

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

/* Показ фильтрации изображений от других пользователей */

var picturesFilterElement = document.querySelector('.img-filters');
picturesFilterElement.classList.remove('img-filters--inactive');

/* Генерация данных и отрисовка изображений пользователей */

var getRandomInteger = function (min, max) {
  return Math.round((Math.random() * (max - min)) + min);
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createPictureElement = function (url, likes, comments, description) {
  return {url: url, likes: likes, comments: comments, description: description};
};

var generatePictureComments = function (comments) {
  var pictureComments = [];
  var pictureCommentsQuantity = getRandomInteger(1, 2);
  for (var i = 0; i < pictureCommentsQuantity; i++) {
    pictureComments.push(getRandomArrayElement(comments));
  }
  return pictureComments;
};

var generatePicturesData = function () {
  var data = [];
  for (var i = 0; i < PICTURES_QUANTITY; i++) {
    var pictureURL = 'photos/' + (i + 1) + '.jpg';
    var pictureLikes = getRandomInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY);
    var pictureComments = generatePictureComments(COMMENTS);
    var pictureDescription = getRandomArrayElement(DESCRIPTIONS);
    data.push(createPictureElement(pictureURL, pictureLikes, pictureComments, pictureDescription));
  }
  return data;
};

var userPicturesContainer = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderUserPicture = function (picture) {
  var pictureElement = userPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderUserPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderUserPicture(pictures[i]));
  }

  userPicturesContainer.appendChild(fragment);
};

/* Полноэкранный показ изображения */

var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');
var pictureCommentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

var clearBigPictureComments = function () {
  var comments = bigPictureCommentsList.children;
  for (var i = comments.length - 1; i >= 0; i--) {
    comments[i].parentElement.removeChild(comments[i]);
  }
};

var renderBigPictureComment = function (comment) {
  var commentElement = pictureCommentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
  commentElement.querySelector('.social__text').textContent = comment;

  return commentElement;
};

var renderBigPictureComments = function (comments) {
  clearBigPictureComments();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderBigPictureComment(comments[i]));
  }

  bigPictureCommentsList.appendChild(fragment);
};

var renderBigPictureElement = function (picture) {
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPictureElement.querySelector('.big-picture__img').firstElementChild.src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  renderBigPictureComments(picture.comments);
};

var picturesData = generatePicturesData();
renderUserPictures(picturesData);
renderBigPictureElement(picturesData[getRandomInteger(0, PICTURES_QUANTITY - 1)]);
bigPictureElement.classList.remove('hidden');
