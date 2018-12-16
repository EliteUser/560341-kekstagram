'use strict';

(function () {


  var NEW_PICTURES_QUANTITY = 10;

  /* Фильтрация (сортировка) изображений от других пользователей */

  var picturesFilter = document.querySelector('.img-filters');
  var pictureFilterButtons = picturesFilter.querySelectorAll('.img-filters__button');

  var filterContainerClickHandler = function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      pictureFilterButtons.forEach(function (elem) {
        elem.classList.remove('img-filters__button--active');
      });

      target.classList.add('img-filters__button--active');
    }
  };

  picturesFilter.addEventListener('click', filterContainerClickHandler);

  /* Фильтры сортировки */

  var showPopularPictures = function () {
    window.pictures.removeUserPictures();
    window.pictures.renderUserPictures(window.data.picturesData);
  };

  var showNewPictures = function () {
    var userPictures = window.data.picturesData.slice();
    var newPictures = [];

    for (var i = 0; i < NEW_PICTURES_QUANTITY; i++) {
      var index = window.util.getRandomInteger(0, userPictures.length - 1);
      newPictures.push(userPictures[index]);
      userPictures.splice(index, 1);
    }

    window.pictures.removeUserPictures();
    window.pictures.renderUserPictures(newPictures);
  };

  var showDiscussedPictures = function () {
    var discussedPictures = window.data.picturesData.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    window.pictures.removeUserPictures();
    window.pictures.renderUserPictures(discussedPictures);
  };

  var SortFilter = {
    'filter-popular': showPopularPictures,
    'filter-new': showNewPictures,
    'filter-discussed': showDiscussedPictures,
  };

  /* Показ блока сортировки и добавление обработчиков */

  var addFilterButtonClickHandler = function (button, handler) {
    button.addEventListener('click', handler);
  };

  var showPicturesSort = function () {
    picturesFilter.classList.remove('img-filters--inactive');
    pictureFilterButtons.forEach(function (elem) {
      addFilterButtonClickHandler(elem, window.debounce(SortFilter[elem.id]));
    });
  };

  window.sort = {
    showPicturesSort: showPicturesSort,
  };


})();
