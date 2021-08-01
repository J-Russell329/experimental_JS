process.env.NODE_ENV = 'test'; // "changes the env to test. makes it easy to switch servers to the test server."

const request = require('supertest');

const app = require('../app');
const db = require('../db');

beforeEach(function () {
	// "runs before each test "
});

afterEach(function () {
	// "this runs after each test"
});

afterAll(function () {
	// "runs after all test have been ran"
	await db.end(); //ends the db connection
});

describe('GET /', function () {
	test('this is to test the root domain', async function () {
		const resp = await request(app).get(`/`);
		expect(resp.statusCode).toBe(200);
	});
});
