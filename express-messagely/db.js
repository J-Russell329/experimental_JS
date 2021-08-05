/** Database connection for messagely. */

const { Client } = require('pg');
const { DB_URI } = require('./config');

const client = new Client({
	host: '/var/run/postgresql',
	database: DB_URI,
	password: '',
	port: 5432,
});

client.connect();

module.exports = client;
