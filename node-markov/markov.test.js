process.env.NODE_ENV = 'test';

const request = require('supertest');

const { MarkovMachine } = require('./markov');

describe('Test MarkovMarchine Class', function () {
	test('make instance of MarkovMachine', async function () {
		testOne = new MarkovMachine('testing things');
		expect(testOne).toBeInstanceOf(MarkovMachine);
		expect(testOne.words).toContainEqual('testing');
		expect(testOne.words).toContainEqual('things');
	});

	test('testing the makeChains fucntion for MarkovMachine', async function () {
		testOne = new MarkovMachine('testing things');
		expect(testOne.chains).toBeDefined();
	});

	test('testing the makeText fucntion for MarkovMachine', async function () {
		testOne = new MarkovMachine('testing things');

		console.log(testOne.makeText(2));
		expect(testOne.makeText(10)).toContain('things');
	});
});
