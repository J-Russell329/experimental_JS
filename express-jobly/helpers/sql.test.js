const { sqlForPartialUpdate } = require('./sql');

describe('createToken', function () {
	test('works: not admin', function () {
		let data = { firstName: 'U3F' };
		let test = sqlForPartialUpdate(data, {
			firstName: 'first_name',
			lastName: 'last_name',
			isAdmin: 'is_admin',
		});
		expect(test).toEqual({ setCols: '"first_name"=$1', values: ['U3F'] });
	});
});
