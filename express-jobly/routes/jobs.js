'use strict';

/** Routes for users. */

const jsonschema = require('jsonschema');

const express = require('express');
const { authenticateJWT, ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError, ExpressError } = require('../expressError');
const Jobs = require('../models/jobs');
const jobsNewSchema = require('../schemas/jobsNew.json');
const jobsUpdateSchema = require('../schemas/jobsUpdate.json');
const User = require('../models/user');

const router = express.Router();

/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

router.post(
	'/',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			const validator = jsonschema.validate(req.body, jobsNewSchema);
			if (!validator.valid) {
				const errs = validator.errors.map((e) => e.stack);
				throw new BadRequestError(errs);
			}

			const jobs = await Jobs.create(req.body);
			return res.status(201).json({ jobs });
		} catch (err) {
			return next(err);
		}
	}
);

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get('/', async function (req, res, next) {
	try {
		const { title, minSalary, hasEquity } = req.query;
		let data = {};

		if (title) {
			data.title = `%${title}%`;
		}
		if (minSalary) {
			data.minSalary = minSalary;
		}
		String(hasEquity) === 'true'
			? (data.hasEquity = 0)
			: (data.noEquity = 0);
		const jobs = await Jobs.findAll(data);
		return res.json({ jobs });
	} catch (err) {
		return next(err);
	}
});

/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get('/:id', async function (req, res, next) {
	try {
		let id = Number(req.params.id);
		if (isNaN(id)) {
			return next();
		}
		const jobs = await Jobs.get(id);
		return res.json({ jobs });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login
 */

router.patch(
	'/:id',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			if (req.body.id !== undefined) {
				throw new BadRequestError(
					'cannot change the id on a job posting'
				);
			}
			const validator = jsonschema.validate(req.body, jobsUpdateSchema);
			if (!validator.valid) {
				const errs = validator.errors.map((e) => e.stack);
				throw new BadRequestError(errs);
			}

			const jobs = await Jobs.update(req.params.id, req.body);
			return res.json({ jobs });
		} catch (err) {
			return next(err);
		}
	}
);

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: login
 */

router.delete(
	'/:id',
	ensureLoggedIn,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			await Jobs.remove(req.params.id);
			return res.json({ deleted: req.params.id });
		} catch (err) {
			return next(err);
		}
	}
);

router.get(
	'/applied',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			const username = res.locals.user.username;
			const jobs = await User.getJobs(username);
			return res.json({ jobs });
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;
