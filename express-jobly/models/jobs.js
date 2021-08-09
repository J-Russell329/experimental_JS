'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate, sqlForSeaches } = require('../helpers/sql');

class Jobs {
	/** Create a jobs (from data), update db, return new jobs data.
	 *
	 * data should be { title, salary, equity, company_handle }
	 *
	 * Returns { id, title, salary, equity, company_handle }
	 *
	 * Throws BadRequestError if company_handle is not in database.
	 * */

	static async create({ title, salary, equity, companyHandle }) {
		const checkCompanyHandle = await db.query(
			`SELECT handle
          FROM companies
          WHERE handle = $1`,
			[companyHandle]
		);
		if (checkCompanyHandle.rows[0] === 0) {
			throw new BadRequestError(
				`No such company handle exist: ${companyHandle}`
			);
		}

		const result = await db.query(
			`INSERT INTO jobs
          (title, salary, equity, company_handle)
          VALUES ($1, $2, $3, $4 )
          RETURNING id, title, salary, equity, company_handle as "companyHandle"`,
			[title, salary, equity, companyHandle]
		);
		const jobs = result.rows[0];

		return jobs;
	}

	/** Find all jobs.
	 *
	 * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
	 * */

	static async findAll(data) {
		if (JSON.stringify(data) !== JSON.stringify({})) {
			const { setCols, values } = sqlForSeaches(data, {
				companyHandle: 'company_handle',
			});
			const jobsRes = await db.query(
				`SELECT id,
                title,
                salary,
                equity,
                company_handle as "companyHandle"
            FROM jobs
            WHERE(${setCols})
            ORDER BY title`,
				[...values]
			);
			return jobsRes.rows;
			//end
		} else {
			const jobsRes = await db.query(
				`SELECT id,
                title,
                salary,
                equity,
                company_handle as "companyHandle"
          FROM jobs
          ORDER BY title`
			);
			return jobsRes.rows;
		}
	}

	/** Given a jobs id, return data about company.
	 *
	 *  returns jobs  where id = id
	 *  [{ id, title, salary, equity, companyHandle }, ...]
	 *
	 * Throws NotFoundError if not found.
	 **/

	static async get(id) {
		const jobsRes = await db.query(
			`SELECT id,
                title,
                salary,
                equity,
                company_handle as "companyHandle"
          FROM jobs
          WHERE id = $1`,
			[id]
		);
		const jobs = jobsRes.rows[0];

		if (!jobs) throw new NotFoundError(`No jobs: ${id}`);

		return jobs;
	}

	/** Update company data with `data`.
	 *
	 * This is a "partial update" --- it's fine if data doesn't contain all the
	 * fields; this only changes provided ones.
	 *
	 * Data can include: {name, description, numEmployees, logoUrl}
	 *
	 * Returns {handle, name, description, numEmployees, logoUrl}
	 *
	 * Throws NotFoundError if not found.
	 */

	static async update(id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			companyHandle: 'company_handle',
		});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE jobs 
                     SET ${setCols} 
                     WHERE id = ${idVarIdx} 
                     RETURNING id,
                     title,
                     salary,
                     equity,
                     company_handle as "companyHandle"`;
		const result = await db.query(querySql, [...values, id]);
		const jobs = result.rows[0];

		if (!jobs) throw new NotFoundError(`No jobs: ${id}`);

		return jobs;
	}

	/** Delete given jobs from database; returns undefined.
	 *
	 * Throws NotFoundError if jobs not found.
	 **/

	static async remove(id) {
		const result = await db.query(
			`DELETE
          FROM jobs
          WHERE id = $1
          RETURNING id`,
			[id]
		);
		const jobs = result.rows[0];

		if (!jobs) throw new NotFoundError(`No jobs: ${id}`);
	}
}

module.exports = Jobs;
