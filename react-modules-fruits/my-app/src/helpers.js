import fruits from './foods';

function Choice(fruits) {
	let choice = fruits[Math.floor(Math.random() * fruits.length)];
	return choice;
}

function Remove(fruits, fruit) {
	const index = fruits.indexOf(fruit);
	if (index > -1) {
		fruits.splice(index, 1);
	}
	return fruits;
}

export { Choice, Remove };
