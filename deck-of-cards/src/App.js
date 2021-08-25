import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import Card from './componets/card';

function App() {
	const [cards, setCards] = useState([]);
	const [remaining, setRemaining] = useState(52);
	const [drawing, setDrawing] = useState(false);
	const stopKey = useRef();
	const deckId = useRef();

	useEffect(() => {
		console.log(remaining);
		if (remaining === 0) {
			alert('no more cards remaining');
			clearInterval(stopKey.current);
			return;
		}
	}, [remaining]);

	async function drawCard() {
		console.log('drawing card');

		let card = await axios.get(
			`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/`
		);
		let rotation = rotationAmt();
		setRemaining(card.data.remaining);
		setCards((cards) => [
			...cards,
			{ image: card.data.cards[0].image, rotation },
		]);
	}

	function changeAutoDeal() {
		console.log('changing', !drawing);
		setDrawing(!drawing);
	}

	function rotationAmt() {
		let neg = Math.round(Math.random()) === 0 ? 1 : -1;
		return Math.random() * 20 * neg;
	}

	useEffect(() => {
		async function getDeck() {
			const deck = await axios.get(
				'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
			);
			if (deck.data.success) {
				deckId.current = deck.data.deck_id;
			}
		}
		getDeck();
	}, []);

	useEffect(() => {
		console.log('i am in the useEffect');
		if (!drawing) {
			return;
		}

		stopKey.current = setInterval(() => {
			drawCard();
		}, 1000);

		return () => {
			clearInterval(stopKey.current);
		};
	}, [drawing]);

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={changeAutoDeal}>Take A Card!</button>
				{cards.map((cardData, i) => (
					<Card cardData={cardData} id={i} />
				))}
			</header>
		</div>
	);
}

export default App;

//------------------------this was for the part one

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './App.css';
// import Card from './componets/card';

// function App() {
// 	const [cards, setCards] = useState([]);
// 	const [remaining, setRemaining] = useState([]);
// 	const deckId = useRef();

// 	async function drawCard() {
// 		if (remaining === 0) {
// 			alert('no more cards remaining');
// 			return;
// 		}

// 		let card = await axios.get(
// 			`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/`
// 		);
// 		let rotation = rotationAmt();
// 		setRemaining(card.data.remaining);
// 		setCards([...cards, { image: card.data.cards[0].image, rotation }]);
// 	}

// 	function rotationAmt() {
// 		let neg = Math.round(Math.random()) === 0 ? 1 : -1;

// 		return Math.random() * 20 * neg;
// 	}

// 	useEffect(() => {
// 		async function getDeck() {
// 			const deck = await axios.get(
// 				'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
// 			);
// 			if (deck.data.success) {
// 				deckId.current = deck.data.deck_id;
// 			}
// 		}

// 		getDeck();
// 	}, []);

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<button onClick={drawCard}>Take A Card!</button>
// 				{cards.map((cardData, i) => (
// 					<Card cardData={cardData} id={i} />
// 				))}
// 			</header>
// 		</div>
// 	);
// }

// export default App;
