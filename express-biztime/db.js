/** Database setup for BizTime. */

const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
	DB_URI = 'postgresql:///biztime_test';
} else {
	DB_URI = 'postgresql:///biztime';
}
console.log(DB_URI);

let db = new Client({
	user: 'postgres',
	host: 'localhost',
	database: DB_URI,
	password: null,
	port: 5432,
});

db.connect();

module.exports = db;
