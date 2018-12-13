'use strict';

(function () {


  /* Отрисовка изображений пользователей */

  var userPicturesContainer = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderUserPicture = function (picture) {
    var pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.dataset.index = picture.index;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var renderUserPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderUserPicture(pictures[i], i));
    }

    userPicturesContainer.appendChild(fragment);
  };

  var removeUserPictures = function () {
    var userPictures = userPicturesContainer.querySelectorAll('.picture');

    for (var i = userPictures.length - 1; i >= 0; i--) {
      userPictures[i].remove();
    }
  };

  var userPicturesContainerClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture')) {
      evt.preventDefault();
      window.bigPicture.showBigPicture(target);
    }
  };

  userPicturesContainer.addEventListener('click', userPicturesContainerClickHandler);

  var renderPictures = function (data) {
    window.data.picturesData = data;
    window.data.picturesData.forEach(function (elem, index) {
      elem.index = index;
    });

    renderUserPictures(data);
    window.sort.showPicturesSort();
  };

  window.backend.load(renderPictures);

  window.pictures = {
    removeUserPictures: removeUserPictures,
    renderUserPictures: renderUserPictures,
  };


})();
