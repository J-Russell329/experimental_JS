import React, { useState } from 'react';
import './App.css';
import BoxList from './componets/BoxList';
import NewBoxForm from './componets/NewBoxForm';

function App() {
	const [boxes, setBoxes] = useState([]);

	function removeBox(num) {
		let newBoxes = [...boxes];
		newBoxes.splice(num, 1);
		setBoxes([...newBoxes]);
	}

	function getRandPost() {
		return Math.random() * 100;
	}

	function valueChecker(color, width, height) {
		if (
			typeof color !== 'string' ||
			typeof width !== 'number' ||
			typeof height !== 'number' ||
			width <= 0 ||
			height <= 0
		) {
			return false;
		}
		return true;
	}

	function addBox(event) {
		let color =
			document.getElementById('background-color').value || 'black';
		let width = Number(document.getElementById('width').value) || 50;
		let height = Number(document.getElementById('height').value) || 50;
		if (!valueChecker(color, width, height)) {
			alert('please input the right values');
		}

		let x = getRandPost();
		let y = getRandPost();
		event.preventDefault();

		setBoxes((boxes) => [...boxes, { color, width, height, x, y }]);
	}
	return (
		<div className="App">
			<header className="App-header">
				<NewBoxForm getRandPost={getRandPost} addBox={addBox} />
				<BoxList boxes={boxes} removeBox={removeBox} />
			</header>
		</div>
	);
}

export default App;
