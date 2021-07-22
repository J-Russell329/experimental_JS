process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let fakeDB = require('./fakeDB');

let pie = {
	name: 'pie',
	price: 15.99,
};
let noodles = {
	name: 'noodles',
	price: 2.99,
};

beforeEach(function () {
	fakeDB.push(pie);
	fakeDB.push(noodles);
});

afterEach(function () {
	fakeDB.length = 0;
});

describe('GET /items', function () {
	test('Gets a list all items', async function () {
		const resp = await request(app).get(`/items`);
		expect(resp.statusCode).toBe(200);

		expect(resp.body).toContainEqual(pie);
		expect(resp.body).toContainEqual(noodles);
	});
});

describe('POST /items', function () {
	test('Posts a new item to the list should return {added:{item}}', async function () {
		newItemTest = { name: 'gum', price: 0.99 };
		const resp = await request(app)
			.post(`/items`)
			.send(newItemTest)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200);

		expect(resp.body).toEqual({
			added: newItemTest,
		});
	});
});

describe('Patch /items', function () {
	test('Patchs an existing item', async function () {
		newItemTest = { name: 'apple pie', price: 14.99 };
		const resp = await request(app)
			.patch(`/items/pie`)
			.send(newItemTest)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200);

		expect(resp.body).toEqual({
			updated: newItemTest,
		});
	});
});

describe('Delete /items', function () {
	test('deletes an existing item', async function () {
		const resp = await request(app).delete(`/items/pie`).expect(200);

		expect(resp.body).toEqual({ message: 'Deleted' });
	});
});
