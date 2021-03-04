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

const gameBoard = document.querySelector('#board');
//------------selector(load) screen-------------------
let boardSize = [];
const selectorScreen = document.querySelector('#loadscreen');
selectorScreen.addEventListener('click', function (event) {
	if (event.target.tagName === 'BUTTON') {
		switch (event.target.id) {
			case 'normalsize':
				// id = "normalsize"
				createBoard(6, 7);
				break;
			case 'largesize':
				// id = "largesize"
				createBoard(7, 8);
				break;
			case 'extralarge':
				// id = "extralarge"
				createBoard(8, 9);
				break;
		}
	}
});

//-------------Restart Button-------------------------

function reset(player) {
	location.reload();

	selectorScreen.classList.toggle('hideme');
	boardSize = [];
	boardValues = [];
	player1.clear();
	player2.clear();
	player = 0;
	gameBoard.children[0].innerHTML = '';
	// console.log(player)
	document.querySelector('#nextplayer').classList.remove('player2');
	document.querySelector('#nextplayer').classList.add('player1');
}
const restartButton = document.querySelector('#restartbutton');
restartButton.addEventListener('click', function (event) {
	event.preventDefault();
	// location.reload();

	reset();
});

//---------------board values-----------------

let boardValues = [];

function createBackgroundBoard([height, width]) {
	for (let number = 0; number < height; number++) {
		const tempRow = [];
		for (let number = 0; number < width; number++) {
			tempRow.push(null);
		}
		boardValues.push(tempRow);
	}
}

function createHTMLBoard([height, width]) {
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

	// console.log(table)
}
function scriptCreator(source) {
	const script = document.createElement('script');
	script.src = source;
	document.querySelector('body').appendChild(script);
}

function createBoard(height, width) {
	boardSize = [height, width];
	selectorScreen.classList.toggle('hideme');
	createBackgroundBoard(boardSize);
	createHTMLBoard(boardSize);
	if (document.querySelectorAll('script')[1] === undefined) {
		scriptCreator('connect4-main.js');
	}
}
