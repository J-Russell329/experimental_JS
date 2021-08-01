process.env.NODE_ENV = 'test';

const request = require('supertest');
const { notify } = require('../app');

const app = require('../app');
const db = require('../db');

beforeEach(async function () {
	await db.query(`insert into invoices (comp_Code, amt, paid, paid_date) values
        ('apple', 100, false, null),
        ('apple', 200, false, null),
        ('apple', 300, true, '2018-01-01'),
        ('ibm', 400, false, null)`);
});

afterEach(async function () {
	await db.query(`delete from invoices`);
});

afterAll(async function () {
	// close db connection
	await db.end();
});

describe('GET /invoices', function () {
	test('checks to ensure that I get all the invoices', async function () {
		const resp = await request(app).get(`/invoices`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toBeDefined();
	});
	test('checks the response when there is nothing there', async function () {
		await db.query(`delete from invoices`);
		const resp = await request(app).get('/invoices');
		expect(resp.statusCode).toBe(404);
		expect(resp.body).toEqual({ status: 'Whoops! Nothing here!' });
	});
});

describe('post /invoices', function () {
	test('checks adding in new invoices to /invoices', async function () {
		let newInvoice = {
			comp_code: 'apple',
			amt: '700',
			paid: false,
			paid_date: null,
		};
		const resp = await request(app)
			.post(`/invoices`)
			.send(newInvoice)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201);
		expect(resp.body).toBeDefined();
	});
});

describe('get /invoices/:id', function () {
	test('checks to see if I get the right invoice back by /invoices/:id', async function () {
		let newInvoice = await db.query(
			`insert into invoices (comp_Code, amt, paid, paid_date) values ('apple','549','false',null) returning *`
		);
		let newInvoiceID = newInvoice.rows[0].id;
		const resp = await request(app).get(`/invoices/${newInvoiceID}`);
		expect(resp.statusCode).toBe(200);
		delete resp.body.invoices[0].add_date;
		delete newInvoice.rows[0].add_date;
		expect(resp.body).toEqual({ invoices: newInvoice.rows });
	});
});

describe('put /invoices/:id', function () {
	test('checks to see if I can change the right invoice using /invoices/:id', async function () {
		let invoice = await db.query(
			`insert into invoices (comp_Code, amt, paid, paid_date) values ('apple','549','false',null) returning *`
		);

		let invoiceID = invoice.rows[0].id;
		let invoiceAMT = invoice.rows[0].amt;

		let newInvoice = invoice.rows[0];
		delete newInvoice.add_date;
		delete newInvoice.id;
		newInvoice.amt = 750;

		const resp = await request(app)
			.put(`/invoices/${invoiceID}`)
			.send(newInvoice);

		expect(resp.statusCode).toBe(200);
		delete resp.body.invoices[0].add_date;
		delete invoice.rows[0].add_date;
		expect(resp.body.invoices[0].amt).toEqual(newInvoice.amt);

		expect(invoiceAMT).not.toEqual(newInvoice.amt);
	});
});

describe('deletes /invoices/:id', function () {
	test('checks if it will delete at /invoices/:id', async function () {
		let newInvoice = await db.query(
			`insert into invoices (comp_Code, amt, paid, paid_date) values ('apple','549','false',null) returning *`
		);
		let newInvoiceID = newInvoice.rows[0].id;
		const resp = await request(app).delete(`/invoices/${newInvoiceID}`);
		expect(resp.statusCode).toBe(200);
		expect(resp.body).toEqual({ status: 'deleted' });
	});

	test('checks if it will delete not found item at /invoices/0', async function () {
		const resp = await request(app).delete(`/invoices/0`);
		expect(resp.statusCode).toBe(404);
		expect(resp.body).toEqual({
			status: 'Whoops! Nothing here to delete!',
		});
	});
});
