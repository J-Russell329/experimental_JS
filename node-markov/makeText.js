/** Command-line tool to generate Markov text. */
//  node makeText.js "filetype ('url'/'file')" "source" "word count (default =100)"
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

let fileType = process.argv[2];
let getText = process.argv[3];
let getNum = process.argv[4];
if (getNum === undefined) {
	getNum = 100;
}

if (fileType === 'file') {
	getFileText(getText);
} else if (fileType === 'url') {
	getHTMLText(getText);
}

async function getHTMLText(url) {
	try {
		let resp = await axios.get(url);

		let mm = new MarkovMachine(resp.data);
		console.log(mm.makeText(getNum));
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

async function getFileText(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error('error: ', err);
			return;
		}
		let mm = new MarkovMachine(data);
		console.log(mm.makeText(getNum));
	});
}
