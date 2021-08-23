import React, { useState } from 'react';
import './App.css';
import Circle from './Circle';
import messages from './eight-ball';

function App() {
	const [bgColor, setBgColor] = useState('black');
	const [text, setText] = useState('Think of a Question');

	function test(e) {
		if (e.target.innerText === 'Think of a Question') {
			const randomElement =
				messages[Math.floor(Math.random() * messages.length)];
			setText(randomElement.msg);
			setBgColor(randomElement.color);
		} else {
			setText('Think of a Question');
			setBgColor('black');
		}
	}

	return (
		<div className="App App-header">
			<Circle action={test} text={text} color={bgColor} />
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
				crossorigin="anonymous"
			></link>
		</div>
	);
}

export default App;
