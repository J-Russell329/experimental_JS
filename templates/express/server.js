// sometimes use shell 'pkill -f nodemon'
// this kills any existing nodemon applications

const app = require('./app');

app.listen(3000, function () {
	console.log('Server starting on port 3000');
});
