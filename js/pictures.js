'use strict';

(function () {


  /* Отрисовка изображений пользователей */

  var picturesData = window.data.picturesData;
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
      fragment.appendChild(renderUserPicture(pictures[i]));
    }

    userPicturesContainer.appendChild(fragment);
  };

  renderUserPictures(picturesData);

  var userPicturesContainerClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture')) {
      evt.preventDefault();
      window.bigPicture.showBigPicture(target);
    }
  };

  userPicturesContainer.addEventListener('click', userPicturesContainerClickHandler);

})();

