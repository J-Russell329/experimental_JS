'use strict';

const request = require('supertest');

const db = require('../db');
const app = require('../app');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
} = require('./_testCommon');
const Jobs = require('../models/jobs');
const User = require('../models/user');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe('POST /jobs', function () {
	const newJob = {
		title: 'new',
		salary: 20000,
		equity: 0,
		companyHandle: 'c1',
	};

	test('ok for users', async function () {
		const resp = await request(app)
			.post('/jobs')
			.send(newJob)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(201);
		newJob.equity = '0';
		delete resp.body.jobs.id;
		expect(resp.body).toEqual({
			jobs: newJob,
		});
	});

	test('bad request with missing data', async function () {
		const resp = await request(app)
			.post('/jobs')
			.send({
				title: 'new',
				salary: 10,
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('bad request with invalid data', async function () {
		const resp = await request(app)
			.post('/jobs')
			.send({
				title: 'new',
				salary: 20000,
				equity: 0,
				companyHandle: 'c',
			})
			.set('authorization', `Bearer ${u1Token}`);
		// console.log(resp);
		expect(resp.statusCode).toEqual(500);
	});
});

/************************************** GET /companies */

describe('GET /jobs', function () {
	test('ok for anon', async function () {
		const resp = await request(app).get('/jobs');
		expect(resp.body.jobs[0].id).toEqual(expect.any(Number));

		delete resp.body.jobs[0].id;
		delete resp.body.jobs[1].id;
		expect(resp.body).toEqual({
			jobs: [
				{
					title: 'j1',
					salary: 11000,
					equity: '0',
					companyHandle: 'c1',
				},
				{
					title: 'j2',
					salary: 22000,
					equity: '0',
					companyHandle: 'c2',
				},
			],
		});
	});

	test('should get by query title', async function () {
		const resp = await request(app).get('/jobs').query({ title: 'j1' });
		expect(resp.body.jobs[0].id).toEqual(expect.any(Number));

		delete resp.body.jobs[0].id;
		expect(resp.body).toEqual({
			jobs: [
				{
					title: 'j1',
					salary: 11000,
					equity: '0',
					companyHandle: 'c1',
				},
			],
		});
	});
	test('should get by query min salary', async function () {
		const resp = await request(app)
			.get('/jobs')
			.query({ minSalary: 20000 });
		expect(resp.body.jobs[0].id).toEqual(expect.any(Number));

		delete resp.body.jobs[0].id;
		expect(resp.body).toEqual({
			jobs: [
				{
					title: 'j2',
					salary: 22000,
					equity: '0',
					companyHandle: 'c2',
				},
			],
		});
	});

	test('fails: test next() handler', async function () {
		// there's no normal failure event which will cause this route to fail ---
		// thus making it hard to test that the error-handler works with it. This
		// should cause an error, all right :)
		await db.query('DROP TABLE jobs CASCADE');
		const resp = await request(app)
			.get('/jobs')
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(500);
	});
});

// /************************************** GET /companies/:handle */

describe('GET /jobs/:id', function () {
	test('works for anon', async function () {
		const job = await Jobs.create({
			title: 'j10',
			salary: 100000,
			equity: 0,
			companyHandle: 'c1',
		});
		const resp = await request(app).get(`/jobs/${job.id}`);
		expect(resp.body).toEqual({
			jobs: {
				id: job.id,
				title: 'j10',
				salary: 100000,
				equity: '0',
				companyHandle: 'c1',
			},
		});
	});

	test('not found for no such jobs', async function () {
		const resp = await request(app).get(`/jobs/0`);
		expect(resp.statusCode).toEqual(404);
	});
});

// /************************************** PATCH /companies/:handle */

describe('PATCH /jobs/:id', function () {
	test('works for users', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app)
			.patch(`/jobs/${job.id}`)
			.send({
				title: 'new-change-test',
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			jobs: {
				id: job.id,
				title: 'new-change-test',
				salary: 20000,
				equity: '0',
				companyHandle: 'c1',
			},
		});
	});

	test('unauth for anon', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app).patch(`/jobs/${job.id}`).send({
			name: 'new-change-test',
		});
		expect(resp.statusCode).toEqual(401);
	});

	test('no job found', async function () {
		const resp = await request(app)
			.patch(`/jobs/0`)
			.send({
				title: 'new nope',
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(404);
	});

	test('bad request on id change attempt', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app)
			.patch(`/jobs/${job.id}`)
			.send({
				id: job.id + 1,
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});

	test('bad request on invalid data', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app)
			.patch(`/jobs/${job.id}`)
			.send({
				title: 0,
			})
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(400);
	});
});

// /************************************** DELETE /jobs/:jobID */

describe('DELETE /jobs/:id', function () {
	test('works for users', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app)
			.delete(`/jobs/${job.id}`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({ deleted: expect.any(String) });
	});

	test('unauth for anon', async function () {
		const newJob = {
			title: 'new',
			salary: 20000,
			equity: 0,
			companyHandle: 'c1',
		};
		const job = await Jobs.create(newJob);
		const resp = await request(app).delete(`/jobs/${job.id}`);
		expect(resp.statusCode).toEqual(401);
	});

	test('not found for no such company', async function () {
		const resp = await request(app)
			.delete(`/jobs/0`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(404);
	});
});

// /************************************** GET /jobs/applied */

describe('GET /jobs/applied', function () {
	test('get current job applications', async function () {
		let j1 = await Jobs.create({
			title: 'j1',
			salary: 11000,
			equity: 0,
			companyHandle: 'c1',
		});
		let j2 = await Jobs.create({
			title: 'j2',
			salary: 22000,
			equity: 0,
			companyHandle: 'c2',
		});
		await User.jobApply('u1', j1.id);
		await User.jobApply('u1', j2.id);
		const resp = await request(app)
			.get(`/jobs/applied`)
			.set('authorization', `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			jobs: [
				{
					jobid: j1.id,
					title: 'j1',
					salary: 11000,
					equity: '0',
					companyhandle: 'c1',
				},
				{
					jobid: j2.id,
					title: 'j2',
					salary: 22000,
					equity: '0',
					companyhandle: 'c2',
				},
			],
		});
	});
});
