/*
1)collect player names from start screen
  -collect players with names inputed
  -display on top with score
  - if player gets it right continue & add score
    if wrong dont add score & go to next player 
  

2) create timer and display in upper right 

3) collect info from api
  - create set of 6 random numbers from 0-1000 for offset amount
  -grab 6 random catergories
  - utilize the api's orginizations to grab questions of varrying values
    - if more than 1 set of questions create a set of appropriate values
  -create event listners on btns
  - append to corolateing boxes
  -(optional) question should be in pop up in the middle of the screen with timer
  - clicking again will reveal answer
    - correct or incorrect buttons will be on here.
      ties into the score system and 

3)add restart button!

4) (optional) see about bootstrap RFS


*/
let questions = [];
// -----------event listener for the game start menu--------
const startGameBtn = document.querySelector('#startgamebtn');
startGameBtn.addEventListener('click', (event) => {
	event.preventDefault();
	createGame();
});

//------------Create Game--------------------------------
async function createGame() {
	if (inputCheck()) {
		questions = [];
		currentPlayer = 0;
		unappendNames();
		unhighlightBoxes();
		appendNames();
		updatePlayer(0);
		const { catergoryTitles, catergoryIds } = await getRandomCatergories();
		appendCatergories(catergoryTitles);
		catergoryIds.forEach(async function (catId) {
			const catQuestions = await getQuestions(catId);
			const questionList = organizeValue(catQuestions.data);
			questions.push(questionList);
		});
		createEventListners();
		document.querySelector('#startgame').classList.toggle('d-none');
	} else alert('please enter player names');
}

//------------player check (min of one player) (max of 6)--------------------
let playerNum = 1;
let roundCount = 0;
//--add player
document.querySelector('#addplayer').addEventListener('click', (event) => {
	event.preventDefault();
	if (playerNum < 6) {
		appendToStart(createInputField(playerNum));
		playerNum++;
	} else alert('max player have been reached');
});
//--remove player
document.querySelector('#removeplayer').addEventListener('click', (event) => {
	event.preventDefault();
	if (playerNum > 1) {
		$('form input').last().remove();
		playerNum--;
	} else alert('There must be at least one player');
});
//--------------append next player field-------------------------
function appendToStart(element) {
	$('form').append(element);
}
//-------------create next player element
function createInputField(playerNum) {
	return $(
		`<input type="text" class="form-control d-block mb-1" placeholder="player ${
			playerNum + 1
		}" name="player${playerNum + 1}">`
	);
}
//--------check if name field have been filled out----------------
function inputCheck() {
	const inputValues = Array.from($('input'));
	return valueChecker(inputValues);
}

//--------value checker------------------------
function valueChecker(inputsArray) {
	return inputsArray.every(function (input) {
		return input.value !== '';
		// input.every
		// return input.value !== '';
	});
}
//-------------unhighlight all boxes-------------
function unhighlightBoxes() {
	const highlighted = Array.from($('main .bg-dark'));
	for (let i = 0; i < highlighted.length; i++) {
		highlighted[i].classList.toggle('bg-dark');
		highlighted[i].classList.toggle('bg-primary');
		highlighted[i].dataset.clicked = '';
	}
}

//------------------ unappend names from the board------------
function unappendNames() {
	const inputValues = Array.from($('input'));
	for (let i = 0; i < inputValues.length; i++) {
		document.querySelector('#namefield').innerHTML = '';
	}
}

//----------append names to the top----------------------
function appendNames() {
	const inputValues = Array.from($('input'));
	for (let i = 0; i < inputValues.length; i++) {
		$('#namefield').append(getNameElement(i + 1, inputValues[i].value));
	}
}
//---------- create name element----------------------
function getNameElement(playerNum, playerName) {
	return $(
		`<div class="col text-center text-light" name="player${playerNum}" id="player${playerNum}">${playerName}: <span id="player${playerNum}score"></span> </div>`
	);
}
//------------------random offset generator---------------
function getOffsetNums() {
	const catergorySet = new Set();
	for (let i = 0; 6 > catergorySet.size; i++) {
		const randomNumber = Math.floor(Math.random() * 1000);
		catergorySet.add(randomNumber);
	}
	return catergorySet;
}

//----------------------- axios-------------------------
async function getRandomCatergories() {
	const offsetNums = Array.from(getOffsetNums());
	const catergoryIds = [];
	const catergoryTitles = [];
	for (let i = 0; i < 6; i++) {
		const params = {
			count: 1,
			offset: offsetNums[i],
		};
		const catergoryData = await axios.get('http://jservice.io/api/categories', {
			params,
		});
		catergoryIds.push(catergoryData.data[0].id);
		catergoryTitles.push(catergoryData.data[0].title);
	}
	return { catergoryTitles, catergoryIds };
}

//---------------update catergories row----------------
async function appendCatergories(titles) {
	document.querySelector('#cat1').innerText = titles[0];
	document.querySelector('#cat2').innerText = titles[1];
	document.querySelector('#cat3').innerText = titles[2];
	document.querySelector('#cat4').innerText = titles[3];
	document.querySelector('#cat5').innerText = titles[4];
	document.querySelector('#cat6').innerText = titles[5];
}

//------------GetQuestions-----------
async function getQuestions(catNumber) {
	const questionsData = await axios.get(
		`http://jservice.io/api/clues/?category=${catNumber}`
	);
	return questionsData;
}

//----------organize questions by value------------
function organizeValue(questionData) {
	const questionSet = new Set();
	questionData.forEach((dataset) => {
		questionSet.add(dataset);
	});
	return getQuestionSet(questionSet);
}

//-------grab random questions--------
function getQuestionSet(questionSet) {
	if (questionSet.size > 5) {
		const numOfSets = Math.floor(Array.from(questionSet).length / 5);
		const questionList = Array.from(questionSet);
		const _questionArray = [];
		for (let i = 0; i < 5; i++) {
			_questionArray.push(questionList[getRandomNumber(numOfSets) + i]);
		}
		return _questionArray;
	} else {
		return Array.from(questionSet);
	}
}

//-----------grab randomNumber ----------
function getRandomNumber(numOfSets) {
	return Math.floor(Math.random() * numOfSets) * 5;
}

//---------------create event listeners on main buttons
function createEventListners() {
	$('main button').on('click', function (event) {
		event.preventDefault();
		if (
			event.delegateTarget.dataset.clicked !== 'true' &&
			event.delegateTarget.id !== 'restart'
		) {
			event.delegateTarget.dataset.clicked = 'true';
			appendQuestion(event.delegateTarget.id);
			document.querySelector('#questionpopup').classList.toggle('d-none');
			event.delegateTarget.classList.toggle('bg-primary');
			event.delegateTarget.classList.toggle('bg-dark');
		}
		//--restart button-----
		if (event.delegateTarget.id === 'restart') {
			document.querySelector('#startgame').classList.remove('d-none');
		}
	});
}

//--------------create event listner for question btns----------
$('#questionbtn').on('click', function () {
	document.querySelector('#questionpopup').classList.toggle('d-none');
	document.querySelector('#answerpopup').classList.toggle('d-none');
});
//-------------------event listner for right and wrong answer btns----------
//--right
document.querySelector('#rightanswer').addEventListener('click', (event) => {
	event.preventDefault();
	roundCount++;
	document.querySelector('#answerpopup').classList.toggle('d-none');
	const lastValue = Number(
		document.querySelector(`#player${getCurrentPlayer() + 1}score`).innerText
	);
	document.querySelector(`#player${getCurrentPlayer() + 1}score`).innerText =
		lastValue + Number(event.target.dataset.value);
	roundCountCheck();
});
//--wrong
document.querySelector('#wronganswer').addEventListener('click', (event) => {
	event.preventDefault();
	roundCount++;
	document.querySelector('#answerpopup').classList.toggle('d-none');
	currentPlayer++;
	updatePlayer(getCurrentPlayer(), getPrevPlayer());
	roundCountCheck();
});

// --------append question & answer to question popup---
function appendQuestion(id) {
	const idArray = Array.from(id);
	document.querySelector('#activequestion').innerHTML =
		questions[idArray[0]][idArray[1]].question;
	document.querySelector('#activeanswer').innerHTML =
		questions[idArray[0]][idArray[1]].answer;
	document.querySelector('#rightanswer').dataset.value = idArray[1] * 200 + 200;
}

//--------------get current player----------------
let currentPlayer = 0;
function getCurrentPlayer() {
	return currentPlayer % playerNum;
}
//------------get prev player-----------
function getPrevPlayer() {
	if (currentPlayer !== 0) {
		return (currentPlayer - 1) % playerNum;
	}
}

//--------------update current player------------
function updatePlayer(curPlayer, prevPlayer) {
	switch (curPlayer) {
		case 0:
			document.querySelector('#player1').classList.toggle('text-light');
			document.querySelector('#player1').classList.toggle('text-warning');
			break;
		case 1:
			document.querySelector('#player2').classList.toggle('text-light');
			document.querySelector('#player2').classList.toggle('text-warning');
			break;

		case 2:
			document.querySelector('#player3').classList.toggle('text-light');
			document.querySelector('#player3').classList.toggle('text-warning');
			break;

		case 3:
			document.querySelector('#player4').classList.toggle('text-light');
			document.querySelector('#player4').classList.toggle('text-warning');
			break;

		case 4:
			document.querySelector('#player5').classList.toggle('text-light');
			document.querySelector('#player5').classList.toggle('text-warning');
			break;

		case 5:
			document.querySelector('#player6').classList.toggle('text-light');
			document.querySelector('#player6').classList.toggle('text-warning');
			break;
	}
	switch (prevPlayer) {
		case 0:
			document.querySelector('#player1').classList.toggle('text-light');
			document.querySelector('#player1').classList.toggle('text-warning');
			break;
		case 1:
			document.querySelector('#player2').classList.toggle('text-light');
			document.querySelector('#player2').classList.toggle('text-warning');
			break;

		case 2:
			document.querySelector('#player3').classList.toggle('text-light');
			document.querySelector('#player3').classList.toggle('text-warning');
			break;

		case 3:
			document.querySelector('#player4').classList.toggle('text-light');
			document.querySelector('#player4').classList.toggle('text-warning');
			break;

		case 4:
			document.querySelector('#player5').classList.toggle('text-light');
			document.querySelector('#player5').classList.toggle('text-warning');
			break;

		case 5:
			document.querySelector('#player6').classList.toggle('text-light');
			document.querySelector('#player6').classList.toggle('text-warning');
			break;
	}
}

function roundCountCheck() {
	if (roundCount === 30 && playerNum > 1) {
		getWinner();
	} else if (roundCount === 30 && playerNum === 1) {
		alert(
			`${document.querySelector('input').value} Wins with ${Number(
				document.querySelector('#player1score').innerText
			)} score`
		);
	}
}
function getWinner() {
	scoresArray = [];
	namesArray = [];
	winnerNameArray = [];
	winnerScoreArray = [];
	for (let i = 0; i < playerNum; i++) {
		scoresArray.push(
			Number(document.querySelector(`#player${i + 1}score`).innerText)
		);
		namesArray.push(document.querySelectorAll('input')[i].value);
	}

	highestScore = scoresArray.reduce(function (acc, cur) {
		return Math.max(acc, cur);
	});
	scoresArray.forEach(function (num, index) {
		if (num === highestScore) {
			winnerNameArray.push(namesArray[index]);
			winnerScoreArray.push(scoresArray[index]);
		}
	});
	switch (winnerNameArray.length) {
		case 1:
			alert(`${winnerNameArray[0]} Wins with ${winnerScoreArray[0]} score`);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
		case 2:
			alert(
				`${winnerNameArray[0]} & ${winnerNameArray[1]} Tied with ${winnerScoreArray[0]} score`
			);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
		case 3:
			alert(
				`${winnerNameArray[0]}, ${winnerNameArray[1]} & ${winnerNameArray[2]} Tied with ${winnerScoreArray[0]} score`
			);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
		case 4:
			alert(
				`${winnerNameArray[0]}, ${winnerNameArray[1]}, ${winnerNameArray[2]} & ${winnerNameArray[3]} Tied with ${winnerScoreArray[0]} score`
			);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
		case 5:
			alert(
				`${winnerNameArray[0]}, ${winnerNameArray[1]}, ${winnerNameArray[2]}, ${winnerNameArray[3]} & ${winnerNameArray[4]} Tied with ${winnerScoreArray[0]} score`
			);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
		case 6:
			alert(
				`${winnerNameArray[0]}, ${winnerNameArray[1]}, ${winnerNameArray[2]}, ${winnerNameArray[3]}, ${winnerNameArray[4]} & ${winnerNameArray[5]} Tied with ${winnerScoreArray[0]} score`
			);
			document.querySelector('#startgame').classList.remove('d-none');
			break;
	}
}
