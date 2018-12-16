'use strict';

(function () {


  var COMMENTS_ADD_STEP = 5;

  /* Полноэкранный показ изображения */

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');
  var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
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

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderBigPictureComments = function (comments) {
    var commentsLoader = bigPicture.querySelector('.social__comments-loader');
    var fragment = document.createDocumentFragment();
    var currentCommentsQuantity = bigPictureCommentsList.children.length;

    commentsLoader.classList.remove('visually-hidden');

    for (var i = currentCommentsQuantity; i < currentCommentsQuantity + COMMENTS_ADD_STEP; i++) {
      if (comments[i]) {
        fragment.appendChild(renderBigPictureComment(comments[i]));
      } else {
        commentsLoader.classList.add('visually-hidden');
        break;
      }
    }

    bigPicture.querySelector('#comments-current').textContent = i;
    bigPictureCommentsList.appendChild(fragment);
  };

  var renderBigPicture = function (picture) {
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    clearBigPictureComments();
    renderBigPictureComments(picture.comments);
    window.comments.addCommentsLoader(picture);
  };

  /* Обработчики событий - открытие / закрытие полноэкранного изображения */

  var showBigPicture = function (target) {
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');

    var pictureIndex = target.dataset.index;
    renderBigPicture(window.pictures.data[pictureIndex]);

    bigPictureCloseButton.addEventListener('click', bigPictureCloseButtonClickHandler);
    document.addEventListener('keydown', bigPictureCloseButtonEscHandler);
  };

  var hideBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', bigPictureCloseButtonClickHandler);
    document.removeEventListener('keydown', bigPictureCloseButtonEscHandler);
  };

  var bigPictureCloseButtonClickHandler = function () {
    hideBigPicture();
  };

  var bigPictureCloseButtonEscHandler = function (evt) {
    window.util.isEscEvent(evt, hideBigPicture);
  };

  window.bigPicture = {
    renderBigPictureComments: renderBigPictureComments,
    showBigPicture: showBigPicture,
  };


})();
