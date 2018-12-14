'use strict';

(function () {


  var addCommentsLoader = function (picture) {
    var commentsLoaderButton = document.querySelector('.social__comments-loader');

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

