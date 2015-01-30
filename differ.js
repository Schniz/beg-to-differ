var diff = require('diff');

module.exports = {
	createPatch: function(from, to) {
		return diff.diffWordsWithSpace(from, to).reduce(function(differencesArray, difference, index) {
			if (difference.removed) {
				return differencesArray.concat("-" + difference.value.length);
			} else if (difference.added) {
				return differencesArray.concat("+" + difference.value);
			} else {
				return differencesArray.concat("~" + difference.value.length);
			}
		}, []);
	},
	applyPatch: function(from, patchJson) {
		var cursor = 0;

		return patchJson.reduce(function(text, difference) {
			var differenceAction = difference[0];
			difference = difference.substr(1);

			if (differenceAction === "~") {
				difference = parseInt(difference, 0);
				text += from.substr(cursor, difference);
				cursor += difference;
				return text;
			} else if (differenceAction === "+") {
				return text + difference;
			} else if (differenceAction === "-") {
				cursor += parseInt(difference, 0);
				return text;
			}
		}, "");
	}
};
