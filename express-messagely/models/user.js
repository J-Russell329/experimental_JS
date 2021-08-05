/** User class for message.ly */
const db = require('../db');
const bcrypt = require('bcrypt');
const { Messages } = require('./message');
const { BCRYPT_WORK_FACTOR } = require('../config');

/** User of the site. */

class User {
	/** register new user -- returns
	 *    {username, password, first_name, last_name, phone}
	 */

	static async register({
		username,
		password,
		first_name,
		last_name,
		phone,
	}) {
		try {
			let checkUserName = await this.get(username);
			if (checkUserName !== false) {
				return 1;
			}
			const hashedPassword = await bcrypt.hash(
				password,
				BCRYPT_WORK_FACTOR
			);
			let date = new Date();
			const result = await db.query(
				`INSERT INTO users (username, password,first_name,last_name,phone, join_at)
			         VALUES ($1, $2, $3, $4, $5, $6)
			         RETURNING username`,
				[username, hashedPassword, first_name, last_name, phone, date]
			);
			if (result.rowCount === 0) {
				return 2;
			}
			return result.rows[0];
		} catch (err) {
			return 2;
		}
	}

	/** Authenticate: is this username/password valid? Returns boolean. */

	static async authenticate(username, password) {
		let user = await this.get(username);
		if (!user) {
			return false;
		}
		if ((await bcrypt.compare(password, user.password)) === true) {
			return true;
		}
		return false;
	}

	/** Update last_login_at for user */

	static async updateLoginTimestamp(username) {
		try {
			let date = new Date();
			let user = await db.query(
				`update users SET last_login_at = $1 WHERE username = $2 returning *`,
				[date, username]
			);
			return true;
		} catch {
			return false;
		}
	}

	/** All: basic info on all users:
	 * [{username, first_name, last_name, phone}, ...] */

	static async all() {
		try {
			let users = await db.query(`select * from users`);
			return users.rows;
		} catch {
			return false;
		}
	}

	/** Get: get user by username
	 *
	 * returns {username,
	 *          first_name,
	 *          last_name,
	 *          phone,
	 *          join_at,
	 *          last_login_at } */

	static async get(username) {
		try {
			let user = await db.query(
				`select * from users where username = $1`,
				[username]
			);

			if (user.rowCount === 0) {
				return false;
			}
			return user.rows[0];
		} catch (err) {
			return false;
		}
	}

	/** Return messages from this user.
	 *
	 * [{id, to_user, body, sent_at, read_at}]
	 *
	 * where to_user is
	 *   {username, first_name, last_name, phone}
	 */

	static async messagesFrom(username) {
		try {
			let messages = await db.query(
				`SELECT m.id,
                m.from_username,
                f.first_name AS from_first_name,
                f.last_name AS from_last_name,
                f.phone AS from_phone,
                m.to_username,
                t.first_name AS to_first_name,
                t.last_name AS to_last_name,
                t.phone AS to_phone,
                m.body,
                m.sent_at,
                m.read_at
          FROM messages AS m
            JOIN users AS f ON m.from_username = f.username
            JOIN users AS t ON m.to_username = t.username
          WHERE f.username = $1`,
				[username]
			);
			if (messages.rowCount === 0) {
				return 1;
			}
			return messages.rows;
		} catch (err) {
			return 1;
		}
	}

	/** Return messages to this user.
	 *
	 * [{id, from_user, body, sent_at, read_at}]
	 *
	 * where from_user is
	 *   {id, first_name, last_name, phone}
	 */

	static async messagesTo(username) {
		try {
			let messages = await db.query(
				`SELECT m.id,
                m.from_username,
                f.first_name AS from_first_name,
                f.last_name AS from_last_name,
                f.phone AS from_phone,
                m.to_username,
                t.first_name AS to_first_name,
                t.last_name AS to_last_name,
                t.phone AS to_phone,
                m.body,
                m.sent_at,
                m.read_at
          FROM messages AS m
            JOIN users AS f ON m.from_username = f.username
            JOIN users AS t ON m.to_username = t.username
          WHERE t.username = $1`,
				[username]
			);
			if (messages.rowCount === 0) {
				return 1;
			}
			return messages.rows;
		} catch (err) {
			return 1;
		}
	}
}

module.exports = User;
