testedWords = new Set();

document.querySelector('#stats-games-played').innerText = Number(
	localStorage.getItem('gamesPlayed')
);

document.querySelector('#stats-high-score').innerText = Number(
	localStorage.getItem('highScore')
);

document
	.querySelector('#submit-btn')
	.addEventListener('click', async function (event) {
		event.preventDefault();
		let testInput = document.querySelector('#word');
		let testValue = testInput.value;

		if (testValue === '') {
			console.log('text input is empty');
			alert('please insert a valid word');
			return;
		}

		if (testedWords.has(testValue)) {
			document.querySelector('#word').value = '';

			return;
		}
		console.log('app.js: text input is all good and full of text');

		let bodyFormData = new FormData();
		bodyFormData.append('word', testValue);

		let wordTestResults = await axios({
			method: 'post',
			url: '/test-word',
			data: bodyFormData,
			headers: {
				'Content-Type': 'multipart/form-data',
				withCredentials: true,
			},
		});

		wordRequestedData = wordTestResults.data;
		console.log('app.js: WordRequestData:' + wordRequestedData);
		document.querySelector('#word').value = '';
		testedWords.add(testValue);
		if (wordRequestedData === 'ok') {
			console.log('word is both on the board and real');
			document.querySelector(
				'#goodWords'
			).innerHTML += `<p>${testValue}</p>`;
			let scoreNumber = document.querySelector('#score').innerText;
			document.querySelector('#score').innerText =
				Number(scoreNumber) + testValue.length;
			return;
		} else if (
			wordRequestedData === 'not-on-board' ||
			wordRequestedData === 'not-word'
		) {
			console.log('word is either not on board, real, or both');
			document.querySelector(
				'#badWords'
			).innerHTML += `<p>${testValue}</p>`;
			return;
		}

		console.log('app.js: it should never make it this far');
	});

// function boardTimer() {
// 	curTime = 60;
// 	while (curTime >= 0) {
// 		setTimeout(function () {
// 			curTime--;
// 			document.querySelector('#timer').innerText = curTime;
// 		}, 1000);
// 	}
// }

timer = setInterval(decreaseTimer, 1000);

function decreaseTimer() {
	curTime = Number(document.querySelector('#timer').innerText);
	if (curTime === 0) {
		clearInterval(timer);
		highScore = Number(localStorage.getItem('highScore'));
		currentScore = Number(document.querySelector('#score').innerHTML);
		document.querySelector('#end-screen-score').innerText = currentScore;
		document.querySelector('#end-screen').classList.toggle('end-game');
		document.querySelector('#end-screen').classList.toggle('invisable');
		gamesPlayed = Number(localStorage.getItem('gamesPlayed'));
		localStorage.setItem('gamesPlayed', gamesPlayed + 1);

		if (currentScore > highScore) {
			localStorage.setItem('highScore', currentScore);
		}
	} else {
		document.querySelector('#timer').innerText = curTime - 1;
	}
}

document
	.querySelector('#restart-btn')
	.addEventListener('click', function (event) {
		location.reload();
	});
