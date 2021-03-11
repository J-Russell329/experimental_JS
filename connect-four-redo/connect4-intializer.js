/*----------things I want included

1) choose board size 
  - board creates rows and columns 
  - populates the html sections too
2) click a row head to choose column
3) place peice on bottom most row
  -if row is full can't place there anymore
4) switch to other play
5) check board vs win conditions
6) if win send alert

*/
//----------------Game class creator---------------
class Game {
	constructor(boardSize) {
		this.boardSize = boardSize;
		this.name1 = document.querySelector('#player1name').value;
		this.color1 = document.querySelector('#player1color').value;
		this.name2 = document.querySelector('#player2name').value;
		this.color2 = document.querySelector('#player2color').value;
		this.player = 0;
		this.player1 = new Set();
		this.player2 = new Set();
		this.boardValues = [];
		this.lastMove;
		this.currentPlayer = 'player1';
		this.player1Wins = 0;
		this.player2Wins = 0;
	}
	whichPlayer() {
		return this.player % 2;
	}
	playerSwitch() {
		if (this.player % 2 === 0) {
			this.currentPlayer = 'player1';
			document.querySelector('#nextplayer').style.backgroundColor = game.color2;
		} else {
			this.currentPlayer = 'player2';
			document.querySelector('#nextplayer').style.backgroundColor = game.color1;
		}
		this.player++;
	}
	winner(player) {
		if (player === 'player1') {
			this.player1Wins++;
			alert(this.name1 + ' wins');
		} else {
			this.player2Wins++;
			alert(this.name2 + ' wins');
		}
		selectorScreen.classList.toggle('hideme');
	}
	winCheck(array) {
		return array.every((number) => {
			if (this.currentPlayer === 'player1') {
				return this.player1.has(number);
			} else {
				return this.player2.has(number);
			}
		});
	}
	winCondition() {
		let winCheck = this.winCheck;
		let number = this.lastMove;
		if (this.player1.size > 3) {
			for (let i = 0; i < 4; i++) {
				const horizontalNumber = number - i;
				const diagnalNumUp = number - i - i * 10;
				const diagnalNumDown = number + i * 10 - i;
				const verticalNum = number - i * 10;

				const horiz = [
					horizontalNumber,
					horizontalNumber + 1,
					horizontalNumber + 2,
					horizontalNumber + 3,
				];
				const diagnallUp = [
					diagnalNumUp,
					diagnalNumUp + 11,
					diagnalNumUp + 22,
					diagnalNumUp + 33,
				];
				const diagnalDown = [
					diagnalNumDown,
					diagnalNumDown - 9,
					diagnalNumDown - 18,
					diagnalNumDown - 27,
				];
				const vertical = [
					verticalNum,
					verticalNum + 10,
					verticalNum + 20,
					verticalNum + 30,
				];

				if (
					winCheck(horiz) ||
					winCheck(diagnallUp) ||
					winCheck(diagnalDown) ||
					winCheck(vertical)
				) {
					switch (this.currentPlayer) {
						case 'player1':
							this.winner('player1');
							break;
						case 'player2':
							this.winner('player2');
							break;
					}
				}
			}
		}
		if (this.player === this.boardSize[0] * this.boardSize[1]) {
			alert('Game Over! Tie');
			selectorScreen.classList.toggle('hideme');
		}
	}
	columnFinder(number) {
		let columnNumberids = [];
		for (let i = this.boardSize[0]; i >= 0; i--) {
			columnNumberids.push(number - 10 * i);
		}
		return columnNumberids;
	}
	createBackgroundBoard([height, width]) {
		for (let number = 0; number < height; number++) {
			const tempRow = [];
			for (let number = 0; number < width; number++) {
				tempRow.push(null);
			}
			this.boardValues.push(tempRow);
		}
	}
	createHTMLBoard() {
		let height = this.boardSize[0];
		let width = this.boardSize[1];
		const tableHeadRow = document.createElement('tr');
		tableHeadRow.id = 'head';
		tableHeadRow.classList.add('piece');
		let theadCounter = (height + 1) * 10;
		for (let number = 0; number < width; number++) {
			const innerTD = document.createElement('td');
			innerTD.id = theadCounter;
			theadCounter++;
			tableHeadRow.appendChild(innerTD);
		}
		gameBoard.children[0].appendChild(tableHeadRow);
		let reverseCounter = height;
		for (let number = 0; number < height; number++) {
			let tbodyCounter = reverseCounter * 10;
			reverseCounter--;
			const tableBodyRow = document.createElement('tr');
			for (let number = 0; number < width; number++) {
				const innerTD = document.createElement('td');
				innerTD.id = tbodyCounter;
				tbodyCounter++;
				tableBodyRow.appendChild(innerTD);
			}
			gameBoard.children[0].appendChild(tableBodyRow);
		}
	}
	createBoard(height, width) {
		boardSize = [height, width];
		selectorScreen.classList.toggle('hideme');
		createBackgroundBoard(boardSize);
		createHTMLBoard(boardSize);
		if (document.querySelectorAll('script')[1] === undefined) {
			scriptCreator('connect4-main.js');
		} else {
		}
	}
}

let game;
const gameBoard = document.querySelector('#board');

//------------selector(load) screen-------------------

const selectorScreen = document.querySelector('#loadscreen');
selectorScreen.addEventListener('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		let inputValues = document.querySelectorAll('input');
		inputValues = Array.from(inputValues);
		inputValues = inputValues.map((input) => input.value);
		if (
			inputValues.every((value) => value !== '') &&
			inputValues[1] !== inputValues[3]
		) {
			switch (event.target.id) {
				case 'normalsize':
					createGame([6, 7]);

					break;
				case 'largesize':
					createGame([7, 8]);
					break;
				case 'extralarge':
					createGame([8, 9]);
					break;
			}
		} else {
			alert('please input player names');
		}
	}
});

//-------------Restart Button-------------------------

function reset(player) {
	game.boardSize = [];
	game.boardValues = [];
	game.player1.clear();
	game.player2.clear();
	game.player = 0;
	gameBoard.children[0].innerHTML = '';
}
const restartButton = document.querySelector('#restartbutton');
restartButton.addEventListener('click', function (event) {
	event.preventDefault();
	selectorScreen.classList.toggle('hideme');
});

//---------add in the hover event script
function scriptCreator(source) {
	const script = document.createElement('script');
	script.src = source;
	document.querySelector('body').appendChild(script);
}

function createGame(array) {
	if (game === undefined) {
		game = new Game();
	}
	reset();
	document.querySelector(
		'#player1user'
	).innerText = `${game.name1}: ${game.player1Wins}`;
	document.querySelector(
		'#player2user'
	).innerText = `${game.name2}: ${game.player2Wins}`;
	game.boardSize = array;
	game.createHTMLBoard();
	game.createBackgroundBoard(game.boardSize);
	selectorScreen.classList.toggle('hideme');
	document.querySelector('#nextplayer').style.backgroundColor = game.color1;
	//-------hover event-------------
	gameBoard.children[0].children[0].addEventListener(
		'mouseover',
		function (event) {
			const _array = game.columnFinder(Number(event.target.id));
			_array.forEach(function (number) {
				document.getElementById(number).classList.add('hover');
			});
		}
	);
	gameBoard.children[0].children[0].addEventListener(
		'mouseout',
		function (event) {
			const _array = game.columnFinder(Number(event.target.id));
			_array.forEach(function (number) {
				document.getElementById(number).classList.remove('hover');
			});
		}
	);
	//-------------create div--------------
	function createDiv(player) {
		const playerElement = document.createElement('div');
		playerElement.classList.add('player1');
		if (player === 'player1') {
			playerElement.style.backgroundColor = game.color1;
		} else {
			playerElement.style.backgroundColor = game.color2;
		}
		return playerElement;
	}

	//------------click events---------------
	gameBoard.children[0].children[0].addEventListener('click', function (event) {
		game.playerSwitch();
		const _array = game.columnFinder(Number(event.target.id));
		const tempArray = [];
		const columnNumberid = Number(event.target.id) % 10;

		for (let i = game.boardSize[0] - 1; i >= 0; i--) {
			const _arrayIndex = game.boardSize[0] - 1 - i;

			if (game.boardValues[i][columnNumberid] === null) {
				tempArray.push(_array[_arrayIndex]);
			}
		}
		game.lastMove = tempArray[0];
		if (game.lastMove !== undefined) {
			const boardValuesColumnid = tempArray.length - 1;
			game.boardValues[boardValuesColumnid][
				columnNumberid
			] = game.whichPlayer();
			if (game.currentPlayer === 'player1') {
				document.getElementById(tempArray[0]).appendChild(createDiv('player1'));
				game.player1.add(tempArray[0]);
				game.winCondition();
			} else {
				document.getElementById(tempArray[0]).appendChild(createDiv('player2'));
				game.player2.add(tempArray[0]);
				game.winCondition();
			}
		} else {
			return;
		}
	});
}

function test() {
	document.querySelector('#player1name').value = 'freddy1';
	document.querySelector('#player1color').value = '#d34a4a';
	document.querySelector('#player2name').value = 'sally2';
	document.querySelector('#player2color').value = '#00000f';
}
// test();
