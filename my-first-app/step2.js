const fs = require('fs');
const axios = require('axios');

let argv = process.argv[2];
if (String(argv).includes('http')) {
	webCat(argv);
} else {
	cat(argv);
}
// console.log(String(argv[2]).includes('http'));

// async function getData(link) {}

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
