const express = require('express');
const router = new express.Router();
const fakeDB = require('./fakeDB');

router.get('/', function (req, res) {
	res.json(fakeDB);
});
router.post('/', function (req, res) {
	newItems = { name: req.body.name, price: req.body.price };
	fakeDB.push(newItems);

	res.json({ added: newItems });
});
router.get('/:name', function (req, res) {
	let getItem = fakeDB.find((item) => item.name === req.params.name);
	if (typeof getItem === 'undefined') {
		return res.json({ items: 'none found' });
	}
	res.json(getItem);
});
router.patch('/:name', function (req, res) {
	let getItem = fakeDB.find((item) => item.name === req.params.name);
	if (typeof getItem === 'undefined') {
		return res.json({ items: 'none found' });
	}
	let newItems = { name: req.body.name, price: req.body.price };
	for (let i in fakeDB) {
		if (fakeDB[i]['name'] === req.params.name) {
			fakeDB.splice(i, 1, newItems);
		}
	}
	res.json({ updated: newItems });
});
router.delete('/:name', function (req, res) {
	let getItem = fakeDB.find((item) => item.name === req.params.name);
	if (typeof getItem === 'undefined') {
		return res.json({ items: 'none found' });
	}
	for (let i in fakeDB) {
		if (fakeDB[i]['name'] === req.params.name) {
			fakeDB.splice(i, 1);
		}
	}
	res.json({ message: 'Deleted' });
});

module.exports = router;
