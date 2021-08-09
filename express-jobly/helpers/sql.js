const { BadRequestError } = require('../expressError');

/*
inputs:
  dataToUpdate: 
    type: object
    key: name 
    value: desired change 

  jsToSql:
    type: object
    key: name assocaited with js side of data
    value: name assocaited with sql side of data

returns:
  type: object

  setCols: 
    returns the sql name of data and the associtated number

  values:
    returns the new values in order according to setCols


example:
let dataToUpdate = { firstName: 'U3F' };
		let test = sqlForPartialUpdate(data, {
			firstName: 'first_name',
			lastName: 'last_name',
			isAdmin: 'is_admin',
		});

    test = { setCols: '"first_name"=$1', values: ['U3F'] }
*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map(
		(colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
	);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate),
	};
}

/*
similar to sqlForPartialUpdate()

sqlForSeaches(searchQuery)

inputs:
  serchQuery: 
    type: object
    key: search item 
    value: search term 

returns:
  type: object

  setCols: 
    returns the sql query associated with that search term.
	should return everything needed to be put into a sql `Where(${setCols})` statment 
	name returns an Ilike query (`"name" ILIKE $1`)
	minEmployees returns a (`"num_employees" >= $2`)
	maxEmployees returns a (`"num_employees" >= $3`)


  values:
	returns the new values in order according to setCols
	should return the values needed to be spread across the values inputed into sql query
	expample:['%queryname%', 20,30]


	example:
let searchQuery = { name: 'searchname', minEmployees:20 , maxEmployees:100 };
		let test = sqlForSeaches(searchQuery);

    test = { 
		setCols: '"name" ILIKE $1 AND num_employees >= $2 AND num_employees <= $3',
	 	values: ['%searchname%', 20, 100] 
		}
*/

function sqlForSeaches(searchQuery) {
	const keys = Object.keys(searchQuery);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => createSqlString(colName, idx));
	return {
		setCols: cols.join(' AND '),
		values: Object.values(searchQuery),
	};
}

/*
used in place of jsToSql
I can do this becuase of the limit scope of what I want this function be able to do 

just returns the new sql'ized string for the js terms 
*/
function createSqlString(colName, idx) {
	if (colName === 'name' || colName === 'title') {
		return `"${colName}" ILIKE $${idx + 1}`;
	}
	if (colName === 'minEmployees') {
		return `"num_employees" >= $${idx + 1}`;
	}
	if (colName === 'maxEmployees') {
		return `"num_employees" <= $${idx + 1}`;
	}
	if (colName === 'minSalary') {
		return `"salary" >= $${idx + 1}`;
	}
	if (colName === 'hasEquity') {
		return `"equity" > $${idx + 1}`;
	}
	if (colName === 'noEquity') {
		return `"equity" = $${idx + 1}`;
	}
}

module.exports = { sqlForPartialUpdate, sqlForSeaches };
