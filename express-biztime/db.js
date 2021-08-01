/** Database setup for BizTime. */

const { Client } = require('pg');

let dbName = 'biztime'; // change me

//----------------this way worked on my machine---------------------

if (process.env.NODE_ENV === 'test') {
	dbName = `${dbName}_test`;
}

let db = new Client({
	host: '/var/run/postgresql',
	database: dbName,
	password: '',
	port: 5432,
});

db.connect();

module.exports = db;
