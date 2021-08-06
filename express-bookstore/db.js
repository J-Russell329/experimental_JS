/** Database config for database. */


const { Client } = require("pg");
const {dbName} = require("./config");

//----------------this way worked on my machine---------------------


let db = new Client({
	host: '/var/run/postgresql',
	database: dbName,
	password: '',
	port: 5432,
});

db.connect();


module.exports = db;
