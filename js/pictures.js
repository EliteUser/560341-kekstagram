'use strict';

(function () {


  /* Отрисовка изображений пользователей */

  var userPicturesContainer = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderUserPicture = function (picture, index) {
    var pictureElement = userPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.dataset.index = index;
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
    renderUserPictures(data);
  };

  /*
  var showErrorMessage = function () {
  };
  */

  window.backend.load(renderPictures);
  /*
  В задании сказано, чтобы у функции load было 2 параметра,
  но 2 параметр - функция, вызывающаяся при ошибке.
  НО в ТЗ ничего не сказано про обработку этого случая.
  Могу добавить отдельную модалку, когда изображения пользователей не загрузились.
  Cоответственно тогда можно 2ым параметром дописать showErrorMessage
  */


})();
