var diff = require('diff');

module.exports = {
	createPatch: function(from, to) {
		return diff.diffWordsWithSpace(from, to).reduce(function(differencesArray, difference, index) {
			if (difference.removed) {
				return differencesArray.concat({ skip: difference.value.length });
			} else if (difference.added) {
				return differencesArray.concat({ add: difference.value });
			} else {
				return differencesArray.concat({ leave: difference.value.length });
			}
		}, []);
	},
	applyPatch: function(from, patchJson) {
		var cursor = 0;

		return patchJson.reduce(function(text, difference) {
			if (difference.leave) {
				text += from.substr(cursor, difference.leave);
				cursor += difference.leave;
				return text;
			} else if (difference.add) {
				return text + difference.add;
			} else if (difference.skip) {
				cursor += difference.skip;
				return text;
			}
		}, "");
	}
};
