const express = require('express');
const router = new express.Router();
const User = require(`../models/user`);
const ExpressError = require('../expressError');
const {
	ensureLoggedIn,
	authenticateJWT,
	ensureCorrectUser,
} = require('../middleware/auth');

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get('/', async function (req, res, next) {
	let users = await User.all();
	if (!users) {
		return next(new ExpressError(`couldn't find any users`, 400));
	}
	return res.json(users);
});

/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', async function (req, res, next) {
	let username = req.params.username;
	let user = await User.get(username);
	if (!user) {
		return next(
			new ExpressError('no user was found for that username', 404)
		);
	}
	return res.json({ user: user });
});

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', async function (req, res, next) {
	try {
		let username = req.params.username;
		let messages = await User.messagesTo(username);
		if (messages === 1) {
			return next(new ExpressError('no messages were found', 400));
		}
		return res.json({ messages });
	} catch (err) {
		next(err);
	}
});

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/from', async function (req, res, next) {
	try {
		let username = req.params.username;
		let messages = await User.messagesTo(username);
		if (messages === 1) {
			return next(new ExpressError('no messages were found', 400));
		}
		return res.json({ messages });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
