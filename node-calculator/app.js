const express = require('express');

const app = express();

app.get('/mean', function (req, res) {
	let numsList = req.query['value'];
	numsList = numsList.split(',');
	for (let i in numsList) {
		if (typeof Number(numsList[i]) !== 'number') {
			throw error('must be a number');
		}
	}
	nums = numsList.filter((c) => c !== '');
	nums = nums.reduce((a, b) => Number(a) + Number(b), 0);
	nums = nums / numsList.length;

	res.send({ response: { operation: 'mode', value: nums } });
});

app.get('/median', function (req, res) {
	let numsList = req.query['value'];
	numsList = numsList.split(',');
	for (let i in numsList) {
		if (typeof Number(numsList[i]) !== 'number') {
			throw error('must be a number');
		}
	}
	nums = numsList.sort();
	midNum = Math.floor((numsList.length + 1) / 2) - 1;
	res.send({ response: { operation: 'median', value: nums[midNum] } });
});

app.get('/mode', function (req, res) {
	let numsList = req.query['value'];
	numsList = numsList.split(',');
	for (let i in numsList) {
		if (typeof Number(numsList[i]) !== 'number') {
			throw error('must be a number');
		}
	}
	nums = {};
	for (let i in numsList) {
		// console.log(numsList[i]);
		// console.log(typeof numsList[i]);
		if (typeof nums[numsList[i]] === 'undefined') {
			// console.log('undefined');
			nums[numsList[i]] = 1;
		} else {
			// console.log('defined');
			nums[numsList[i]] = nums[numsList[i]] + 1;
		}
	}
	console.log(nums);
	let highNum = 1;
	let highNumI = -1;
	let keys = Object.values(nums);
	for (let i in keys) {
		// console.log(keys[i]);
		if (keys[i] > highNum) {
			highNum = keys[i];
			highNumI = i;
		}
	}
	// console.log(highNumI);
	// console.log(Object.keys(nums)[highNumI]);
	if (highNumI === -1) {
		return res.send({
			response: { operation: 'mode', value: 'no mode found' },
		});
	}
	res.send({
		response: { operation: 'mode', value: Object.keys(nums)[highNumI] },
	});
});

app.listen(3000, function () {
	console.log('Server starting on port 3000');
});
