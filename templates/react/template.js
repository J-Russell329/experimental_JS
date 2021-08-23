// import object from './file';

function Choice(props) {
	let choice = props[Math.floor(Math.random() * props.length)];
	return choice;
}

function Remove(props1, props2) {
	const index = props1.indexOf(props2);
	if (index > -1) {
		props1.splice(index, 1);
	}
	return props1;
}

export { Choice, Remove };
