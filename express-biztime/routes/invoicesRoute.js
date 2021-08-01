const express = require('express');
const router = new express.Router();
const db = require('../db');

router.get('/', async function (req, res, next) {
	try {
		invoices = await db.query(`select * from invoices`);
		if (invoices.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ invoices: invoices.rows });
	} catch {
		next();
	}
});

router.post('/', async function (req, res, next) {
	try {
		let comp_code = req.body.comp_code;
		let amt = req.body.amt;
		let paid = req.body.paid;
		let paid_date = req.body.paid_date;
		invoices = await db.query(
			`insert into invoices (comp_Code, amt, paid, paid_date) values ($1,$2,$3,$4) returning *`,
			[comp_code, amt, paid, paid_date]
		);
		if (invoices.rowCount === 0) {
			return res
				.status(404)
				.json({ status: 'Whoops! an error occured!' });
		}
		return res.status(201).json({ invoices: invoices.rows });
	} catch {
		next();
	}
});

router.get('/:id', async function (req, res, next) {
	try {
		let id = req.params.id;
		invoices = await db.query(`select * from invoices where id=$1`, [id]);
		// console.log(invoices);
		if (invoices.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ invoices: invoices.rows });
	} catch {
		return next();
	}
});

router.put('/:id', async function (req, res, next) {
	try {
		let comp_code = req.body.comp_code;
		let amt = req.body.amt;
		let paid = req.body.paid;
		let paid_date = req.body.paid_date;
		console.log(comp_code, amt, paid, paid_date);

		invoices = await db.query(
			`UPDATE invoices SET comp_code=$1, amt=$2, paid=$3,
      paid_date=$4 where id=$5 RETURNING *`,
			[comp_code, amt, paid, paid_date, req.params.id]
		);
		if (invoices.rowCount === 0) {
			return res.status(404).json({ status: 'Whoops! Nothing here!' });
		}
		return res.json({ invoices: invoices.rows });
	} catch {
		next();
	}
});

router.delete('/:id', async function (req, res, next) {
	try {
		invoices = await db.query(`delete from invoices where id=$1`, [
			req.params.id,
		]);
		if (invoices.rowCount === 0) {
			return res
				.status(404)
				.json({ status: 'Whoops! Nothing here to delete!' });
		}
		return res.json({ status: 'deleted' });
	} catch {
		next();
	}
});
module.exports = router;
