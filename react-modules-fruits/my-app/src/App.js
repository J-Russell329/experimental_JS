import './App.css';
import fruits from './foods';
import { Choice, Remove } from './helpers';
console.log(fruits);

function App() {
	console.log('I’d like one RANDOMFRUIT, please.');
	let fruit = Choice(fruits);
	console.log(`Here you go: ${fruit}`);
	console.log(`Delicious! May I have another?`);
	let remaingFruits = Remove(fruits, fruit);
	console.log(
		`I'm sorry, we're all out that fruit. We have ${remaingFruits.length} other fruits left to choose from.`
	);
	console.log(remaingFruits);
	return (
		<div className="App">
			<header className="App-header">
				<p>check the console. :)</p>
			</header>
		</div>
	);
}

export default App;
