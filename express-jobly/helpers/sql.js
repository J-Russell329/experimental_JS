const { BadRequestError } = require('../expressError');

// THIS NEEDS SOME GREAT DOCUMENTATION.
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

module.exports = { sqlForPartialUpdate };
