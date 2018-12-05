'use strict';

(function () {


  /* Полноэкранный показ изображения */

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCommentsList = bigPictureElement.querySelector('.social__comments');
  var bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');
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

    commentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg';
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

  /* Обработчики событий - открытие / закрытие полноэкранного изображения */

  var showBigPicture = function (target) {
    document.body.classList.add('modal-open');
    bigPictureElement.classList.remove('hidden');

    var pictureIndex = target.dataset.index;
    renderBigPictureElement(window.data.picturesData[pictureIndex]);

    bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonClickHandler);
    document.addEventListener('keydown', bigPictureCloseButtonEscHandler);
  };

  var hideBigPicture = function () {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonClickHandler);
    document.removeEventListener('keydown', bigPictureCloseButtonEscHandler);
  };

  var bigPictureCloseButtonClickHandler = function () {
    hideBigPicture();
  };

  var bigPictureCloseButtonEscHandler = function (evt) {
    window.util(evt, hideBigPicture);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture,
  };


})();
