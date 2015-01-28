var expect = require('chai').expect;
var differ = require('../differ');

describe("Differ", function() {
	it("should produce the old string from the new string", function() {
		var newString = "my new song is aweseome!";
		var oldString = "my old song is great!";

		var patch = differ.createPatch(newString, oldString);
		var result = differ.applyPatch(newString, patch);

		expect(result).to.equal(oldString);
	});

	it("should turn 'You Give Love a Bad Name' to 'Livin on a Prayer'", function() {
		var youGiveLove = [
			"Shot through the heart, and you're to blame",
			'You give love a bad name',
			'I play my part and you play your game',
			'You give love a bad name',
			'You give love a bad name'
		].join("\n");

		var livinPrayer = [
			'She says, "We\'ve gotta hold on to what we\'ve got.',
			'It doesn\'t make a difference if we make it or not.',
			'We\'ve got each other and that\'s a lot.',
			'For love we\'ll give it a shot.'
		].join("\n");

		var patch = differ.createPatch(youGiveLove, livinPrayer);
		var result = differ.applyPatch(youGiveLove, patch);

		expect(result).to.equal(livinPrayer);
	});
});
