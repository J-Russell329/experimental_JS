'use strict';
/** Database setup for jobly. */
const { Client } = require('pg');
const { getDatabaseUri } = require('./config');

let db;
db = new Client({
	host: '/var/run/postgresql',
	database: getDatabaseUri(),
	password: '',
	port: 5432,
});

// if (process.env.NODE_ENV === 'production') {
// 	db = new Client({
// 		connectionString: getDatabaseUri(),
// 		ssl: {
// 			rejectUnauthorized: false,
// 		},
// 	});
// } else {
// 	db = new Client({
// 		connectionString: getDatabaseUri(),
// 	});
// }

db.connect();

module.exports = db;
