const express = require('express'); //"npm install this"
const app = express(); // "runs the express file as app"
const ExpressError = require('./expressError'); //" npm install this"
const fileRouter = require('./fileRouter'); // "would need to change this to the file you want to include"

app.use(express.json()); // "makes post request json avaliable "

//--------------- Root Domain Page------------------
app.get('/', function (req, res, next) {
	try {
		return res.send('nothing to see here :D');
	} catch {
		next();
	}
});

//---------------- Express-Router template----------------

app.use('/routername', fileRouter);

app.use(function (req, res, next) {
	const err = new ExpressError('Not Found', 404);
	return next(err);
});

//---------------- general error handler ----------------

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err,
		message: err.message,
	});
});

module.exports = app; // "dont forget to export app for the sever.js file"
