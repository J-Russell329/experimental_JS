process.env.NODE_ENV = 'test'; // "changes the env to test. makes it easy to switch servers to the test server."

const request = require('supertest');

const app = require('../app');
const db = require('../db');

beforeEach(function () {});

afterEach(function () {
	db.query(`delete from books`);
});

afterAll(async function () {
	await db.end(); //ends the db connection
});

describe('post /books', function () {
	test('this test posting correct json, should return no errors', async function () {
		const resp = await request(app)
			.post(`/books`)
			.send({
				isbn: '0691161518',
				amazon_url: 'http://a.co/eobPtX2',
				author: 'Matthew Lane',
				language: 'english',
				pages: 264,
				publisher: 'Princeton University Press',
				title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
				year: 2017,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201);
	});
	test('shoudl return error, send data incorrect formant', async function () {
		const resp = await request(app)
			.post(`/books`)
			.send({
				isbn: '0691161518',
				amazon_url: 'http://a.co/eobPtX2',
				author: 'Matthew Lane',
				language: 'english',
				pages: 264,
				title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
				year: 2017,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');
		expect(resp.body).toEqual({
			error: {
				message: ['instance requires property "publisher"'],
				status: 400,
			},
			message: ['instance requires property "publisher"'],
		});
	});
});
