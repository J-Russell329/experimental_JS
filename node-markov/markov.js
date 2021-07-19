/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// console.log(this.words);
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let returnText = this.words[this.randNum()] + ' ';
		for (let i = 1; i < numWords - 1; i++) {
			returnText = returnText + this.words[this.randNum()] + ' ';
		}
		returnText = returnText + this.words[this.randNum()];
		return returnText;
	}

	randNum() {
		// console.log(typeof Array(this.words));
		return Math.floor(Math.random() * this.words.length);
	}
}

module.exports = { MarkovMachine };
