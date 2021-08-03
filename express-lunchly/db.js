/** Database for lunchly */

const { Client } = require('pg');

let dbName = 'lunchly'; // change me

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

//----------------this way may work on other machines---------------------

// let DB_URI;

// if (process.env.NODE_ENV === 'test') {
// 	DB_URI = `postgresql:///${dbName}test`;
// } else {
// 	DB_URI = `postgresql:///${dbName}`;
// }

// let db = new Client({
//     connectionString: DB_URI
//   });

db.connect();

module.exports = db;
