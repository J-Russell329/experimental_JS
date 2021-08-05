const express = require('express');
const router = new express.Router();
const {
	authenticateJWT,
	ensureLoggedIn,
	ensureCorrectUser,
} = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const User = require(`../models/user`);
const ExpressError = require('../expressError');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async function (req, res, next) {
	try {
		const { username, password } = req.body;
		const result = await User.authenticate(username, password);
		if (!result) {
			return next(new ExpressError('Invalid user/password', 400));
		}

		let token = jwt.sign({ username }, SECRET_KEY);

		await User.updateLoginTimestamp(username);

		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async function (req, res, next) {
	try {
		const { username, password, first_name, last_name, phone } = req.body;
		const user = await User.register({
			username,
			password,
			first_name,
			last_name,
			phone,
		});
		if (user === 1) {
			return next(new ExpressError(`${username} is already taken`, 400));
		}
		if (user === 2) {
			return next(new ExpressError(`couldn't register user`, 400));
		}
		await User.updateLoginTimestamp(username);
		let token = jwt.sign({ username }, SECRET_KEY);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
