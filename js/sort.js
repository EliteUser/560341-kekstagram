'use strict';

(function () {


  var NEW_PICTURES_QUANTITY = 10;

  /* Фильтрация (сортировка) изображений от других пользователей */

  var picturesFilter = document.querySelector('.img-filters');
  var pictureFilterButtons = picturesFilter.querySelectorAll('.img-filters__button');

  /* Фильтры сортировки */

  var showPopularPictures = function () {
    return window.pictures.data;
  };

  var showNewPictures = function () {
    var userPictures = window.pictures.data.slice();
    var newPictures = [];

    for (var i = 0; i < NEW_PICTURES_QUANTITY; i++) {
      var index = window.util.getRandomInteger(0, userPictures.length - 1);
      newPictures.push(userPictures[index]);
      userPictures.splice(index, 1);
    }

    return newPictures;
  };

  var showDiscussedPictures = function () {
    return window.pictures.data.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var SortFilter = {
    'filter-popular': showPopularPictures,
    'filter-new': showNewPictures,
    'filter-discussed': showDiscussedPictures,
  };

  var sortPictures = function (filter) {
    var filteredPictures = SortFilter[filter]();

    window.pictures.removeUserPictures();
    window.pictures.renderUserPictures(filteredPictures);
  };

  /* Показ блока сортировки и добавление обработчиков */

  var showPicturesSort = function () {
    picturesFilter.classList.remove('img-filters--inactive');
  };

  var filterContainerClickHandler = function (evt) {
    var target = evt.target;
    var currentFilter;

    pictureFilterButtons.forEach(function (elem) {
      if (elem.classList.contains('img-filters__button--active')) {
        currentFilter = elem.id;
      }
    });

    if (currentFilter !== target.id) {
      if (target.classList.contains('img-filters__button')) {
        pictureFilterButtons.forEach(function (elem) {
          elem.classList.remove('img-filters__button--active');
        });

        target.classList.add('img-filters__button--active');
        sortPictures(target.id);
      }
    }
  };

  picturesFilter.addEventListener('click', window.debounce(filterContainerClickHandler));

  window.sort = {
    showPicturesSort: showPicturesSort,
  };


})();
