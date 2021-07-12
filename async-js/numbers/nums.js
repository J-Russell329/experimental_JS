btn = document.querySelector('#btn');
appendHere = document.querySelector('#append-facts');

btn.addEventListener('click', getFacts);

function getNum() {
	return Math.floor(Math.random() * 100);
}

function getFacts() {
	appendHere.innerText = 'loading facts';
	num = getNum();
	facts = [];
	for (let i = 0; i < 4; i++) {
		facts.push(axios.get(`http://numbersapi.com/${num}`));
	}

	Promise.all(facts)
		.then((facts) => appendFact(facts))
		.catch((err) => {
			console.log(err);
			appendHere.innerText = 'loading Failed';
		});
}

function appendFact(facts) {
	appendHere.innerText = '';
	facts.forEach((fact) => {
		div = document.createElement('div');
		div.append(fact.data);
		appendHere.append(div);
	});
}
