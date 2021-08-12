function Tweet({ tweet }) {
	return (
		<div>
			username: {tweet.username}, name: {tweet.name}, date: {tweet.date},
			message: {tweet.message}
		</div>
	);
}

const tweets = [
	{
		username: 'test',
		name: 'testname1',
		date: '08/17',
		message: 'things for test tweet 1',
	},
	{
		username: 'test2',
		name: 'testname1',
		date: '08/17',
		message: 'things for test tweet 2',
	},
	{
		username: 'test3',
		name: 'testname1',
		date: '08/17',
		message: 'things for test tweet 3',
	},
];

function App() {
	return (
		<div>
			<h1>Greetings!</h1>
			{tweets.map((data) => (
				<Tweet tweet={data} />
			))}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
