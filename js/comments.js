'use strict';

(function () {


  var addCommentsLoader = function (picture) {
    var commentsLoaderButton = document.querySelector('.social__comments-loader');

    /* Пришлось клонировать и удалять кнопку, чтобы удалить обработчик клика,
    без этого я не знаю как сделать, ссылка на обработчик походу удаляется
    и я не могу удалить его через removeEventListener */

    var loaderClone = commentsLoaderButton.cloneNode(true);
    commentsLoaderButton.parentNode.replaceChild(loaderClone, commentsLoaderButton);
    commentsLoaderButton = loaderClone;

    var commentsLoaderButtonClickHandler = function () {
      window.bigPicture.renderBigPictureComments(picture.comments);
    };

    commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);
  };

  window.comments = {
    addCommentsLoader: addCommentsLoader,
  };


})();

