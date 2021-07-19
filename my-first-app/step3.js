const fs = require('fs');
const axios = require('axios');

let argv = process.argv[2];
let toFile = process.argv[3];
let fromFile = process.argv[4];

if (argv === '--out') {
	outFile(toFile, fromFile);
} else {
	if (String(argv).includes('http')) {
		webCat(argv);
	} else {
		cat(argv);
	}
}

function outFile(newFile, oldFile) {
	fs.readFile(oldFile, 'utf8', (err, data) => {
		if (err) {
			console.error('error: ', err);
			return;
		}
		fs.writeFile(newFile, String(data), function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
	});
}

async function webCat(url) {
	try {
		let resp = await axios.get(url);
		console.log(resp.data);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}
function cat(file) {
	fs.readFile(file, 'utf8', (err, data) => {
		if (err) {
			console.error('error: ', err);
			return;
		}
		console.log(data);
	});
}
