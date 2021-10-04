function guessingGame() {
	let playing = true;
	let score = 0;
	let number = (() => {
		return Math.floor(Math.random() * 100);
	})();

	return (guess) => {
		if (!playing) return 'you have already won';
		score++;
		if (guess === number) {
			playing = false;
			return `you won in ${score} moves`;
		} else if (guess > number) {
			return 'too high';
		} else if (guess < number) {
			return 'too low';
		}
	};
}

module.exports = { guessingGame };
