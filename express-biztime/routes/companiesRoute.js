const express = require('express');
const router = new express.Router();
const db = require('../db');

// let comapnies = [{things:"stuff"}]

router.get('/', async function (req, res) {
	console.log('starting');
	// companies = await db.query(`select * from companies`);
	// console.log(companies.rows);
	console.log('done');

	return res.json({ companies: 'company stuff goes here' });
});

router.post('/', function (req, res) {
	return res.json({ companies: 'company stuff goes here' });
});

router.get('/:code', function (req, res) {
	return res.json({ companies: 'company stuff goes here' });
});

router.put('/:code', function (req, res) {
	return res.json({ companies: 'company stuff goes here' });
});

router.delete('/:code', function (req, res) {
	return res.json({ companies: 'company stuff goes here' });
});

module.exports = router;
