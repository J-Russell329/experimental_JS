/** BizTime express application. */

const express = require('express');
const companiesRouter = require('./routes/companiesRoute');
const invoicesRouter = require('./routes/invoicesRoute');
// const db = require('./db');

const app = express();
const ExpressError = require('./expressError');

app.use(express.json());

app.get('/', function (req, res, next) {
	return res.send('nothing to see here :D');
});

app.use('/companies', companiesRouter);
app.use('/invoices', invoicesRouter);

/** 404 handler */

app.use(function (req, res, next) {
	const err = new ExpressError('Not Found', 404);
	return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err,
		message: err.message,
	});
});

module.exports = app;
