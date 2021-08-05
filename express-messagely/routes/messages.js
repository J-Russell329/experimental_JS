const express = require('express');
const ExpressError = require('../expressError');
const {
	ensureLoggedIn,
	authenticateJWT,
	ensureCorrectUser,
} = require('../middleware/auth');
const router = new express.Router();
const Message = require('../models/message');

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get(
	'/:id',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		let username = req.user.username;
		let id = req.params.id;
		let message = await Message.get(id);
		if (
			message.from_user.username === username ||
			message.to_user.username === username
		) {
			return res.json({ message });
		}
		return next({ status: 401, message: 'Unauthorized' });
	}
);

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post(
	'/',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			let from_username = req.user.username;
			let { to_username, body } = req.body;
			let message = await Message.create({
				from_username,
				to_username,
				body,
			});
			if (message === []) {
				next(new ExpressError(`we coudn't send your message. :C`, 400));
			}
			return res.json({ message });
		} catch (error) {
			next(error);
		}
	}
);

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post(
	'/:id/read',
	authenticateJWT,
	ensureLoggedIn,
	async function (req, res, next) {
		try {
			let id = req.params.id;
			let markread = await Message.markRead(id);
			return res.json({ markread });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
