'use strict';
/** Database setup for jobly. */
const { Client } = require('pg');
const { getDatabaseName } = require('./config');

let db;

if (process.env.NODE_ENV === 'production') {
	db = new Client({
		host: '/var/run/postgresql',
		database: getDatabaseName(),
		password: '',
		port: 5432,
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	db = new Client({
		host: '/var/run/postgresql',
		database: getDatabaseName(),
		password: '',
		port: 5432,
	});
}

db.connect();

module.exports = db;
