const MAX_HASHTAGS = 5;

const compareArrays = function (firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  } else {
    for (var i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
  }
  return true;
};

const validateHashtags = function (hashtags) {
  var hashtagRegExp = /((?!\s|\b)#[а-яёa-z0-9\-_]{1,19}(?=\s|$))/gi;
  var matches = hashtags.match(hashtagRegExp);
  if (!matches || matches.length > MAX_HASHTAGS) {
    return false;
  } else {
    return compareArrays(matches, hashtags.split(' '));
  }
};

const assert = require('assert');

describe(`Hashtag validity tests`, () => {
  it(`should be a valid hashtag`, () => {
    assert.equal(validateHashtags(`#hashtag`), true);
    assert.equal(validateHashtags(`#HASHTAG`), true);
    assert.equal(validateHashtags(`#1TAG`), true);
    assert.equal(validateHashtags(`#iAmHastTag12345`), true);
    assert.equal(validateHashtags(`#12345666`), true);
    assert.equal(validateHashtags(`#ХЭШТЕГ`), true);
    assert.equal(validateHashtags(`#ХЭШ123тег`), true);
  });

  it(`should be invalid hashtag`, () => {
    assert.equal(validateHashtags(`hashtag`), false);
    assert.equal(validateHashtags(`123456`), false);
    assert.equal(validateHashtags(`#SUPERLONGHASHTAG1234567890OMGPEWPEW`), false);
    assert.equal(validateHashtags(`#`), false);
    assert.equal(validateHashtags(``), false);
    assert.equal(validateHashtags(`ХЭШТЕГ`), false);
    assert.equal(validateHashtags(`null`), false);
  });

});
