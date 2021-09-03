import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request({
		endpoint = '',
		data = {},
		method = 'get',
		token = '',
		query = null,
		search = null,
	}) {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = query
			? `${BASE_URL}/${endpoint}?${search}=${query}`
			: `${BASE_URL}/${endpoint}`;

		const headers = { Authorization: `Bearer ${token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await Axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async register(data = {}) {
		let res = await this.request({
			endpoint: `auth/register`,
			data,
			method: 'post',
		});
		return res;
	}

	static async login(data = {}) {
		let res = await this.request({
			endpoint: `auth/token`,
			data,
			method: 'post',
		});
		return res;
	}

	static async getCompanies(query = null) {
		let res = await this.request({
			endpoint: `companies/`,
			query,
			search: 'name',
		});
		let resArray = [...res.companies];
		return resArray;
	}
	static async getCompany(handle) {
		let res = await this.request({ endpoint: `companies/${handle}` });
		return res.company;
	}

	static async getJobs(query = null) {
		let res = await this.request({
			endpoint: `jobs/`,
			query,
			search: 'title',
		});
		let resArray = [...res.jobs];
		return resArray;
	}
	static async getProfile(handle) {
		let res = await this.request({ endpoint: `users/${handle}` });
		return res.company;
	}
	static async jobApply(username, jobId, token) {
		let res = await this.request({
			endpoint: `users/${username}/jobs/${jobId}`,
			method: 'post',
			token,
		});
		return res.company;
	}
	static async getUserData(username, token) {
		let res = await this.request({
			endpoint: `users/${username}`,
			method: 'get',
			token,
		});
		return res.user;
	}
	static async updateUserData({
		username,
		email,
		firstName,
		lastName,
		password,
	}) {
		// let token;
		await this.login({ username, password })
			.then(
				async (value) => {
					await this.request({
						endpoint: `users/${username}`,
						data: { email, firstName, lastName },
						method: 'patch',
						token: value.token,
					});
				}

				// this.request(`users/${oldUsername}`);
			)
			.then();
	}
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
// 	'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
// 	'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

export default JoblyApi;
