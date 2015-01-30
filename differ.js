var diff = require('diff');

var REMOVE = "-";
var SKIP = "~";
var ADD = "+";

var differenceActions = {};

differenceActions[REMOVE] = function(from, difference, cursor, text) {
  cursor += parseInt(difference);
  return [cursor, text];
};

differenceActions[SKIP] = function(from, difference, cursor, text) {
  difference = parseInt(difference, 0);
  text += from.substr(cursor, difference);
  cursor += difference;
  return [cursor, text];
};

differenceActions[ADD] = function(from, difference, cursor, text) {
  text = text + difference;
  return [cursor, text];
};

module.exports = {
  createPatch: function(from, to) {
    return diff.diffWordsWithSpace(from, to).reduce(function(differencesArray, difference, index) {
      if (difference.removed) {
        return differencesArray.concat(REMOVE + difference.value.length);
      } else if (difference.added) {
        return differencesArray.concat(ADD + difference.value);
      } else {
        return differencesArray.concat(SKIP + difference.value.length);
      }
    }, []);
  },
  applyPatch: function(from, patchJson) {
    var cursor = 0;

    return patchJson.reduce(function(text, difference) {
      var differenceAction = difference[0];
      difference = difference.substr(1);
      var results = differenceActions[differenceAction](from, difference, cursor, text);
      cursor = results[0];
      return results[1];
    }, "");
  }
};
