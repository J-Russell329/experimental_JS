const express = require('express');
const router = new express.Router();
const db = require('../db');

// let comapnies = [{things:"stuff"}]

router.get('/', async function (req, res, next) {
	try {
		companies = await db.query(`select * from companies`);
		if (companies.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ companies: companies.rows });
	} catch {
		next();
	}
});

router.post('/', async function (req, res, next) {
	try {
		let code = req.body.code;
		let name = req.body.name;
		let description = req.body.description;
		companies = await db.query(
			`insert into companies (code,name,description) values ($1,$2,$3) returning *`,
			[code, name, description]
		);
		if (companies.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.status(201).json({ companies: companies.rows });
	} catch {
		next();
	}
});

router.get('/:code', async function (req, res, next) {
	try {
		let code = req.params.code;
		companies = await db.query(
			`SELECT code,name,description FROM companies
		WHERE code=$1`,
			[code]
		);
		if (companies.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ companies: companies.rows });
	} catch {
		return next();
	}
});

router.put('/:code', async function (req, res, next) {
	try {
		let newCode = req.body.code;
		let name = req.body.name;
		let description = req.body.description;
		companies = await db.query(
			`UPDATE companies SET code=$4, name=$2, description=$3
			 WHERE code = $1
			 RETURNING *`,
			[req.params.code, name, description, newCode]
		);
		if (companies.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ companies: companies.rows });
	} catch {
		next();
	}
});

router.delete('/:code', async function (req, res, next) {
	try {
		companies = await db.query(`delete from companies where code=$1`, [
			req.params.code,
		]);
		if (companies.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ status: 'deleted' });
	} catch {
		next();
	}
});

module.exports = router;
