function Person({ person }) {
	const { name, age, hobbies } = person;
	let newName = name.slice(0, 8);

	return (
		<div>
			<p>name: {newName}</p>
			{age >= 18 ? <p>please go vote!</p> : <p>you must be 18</p>}
			<ul>
				{hobbies.map((data) => (
					<Hobbies hobby={data} />
				))}
			</ul>
		</div>
	);
}

function Hobbies({ hobby }) {
	return <li>{hobby}</li>;
}

const people = [
	{
		age: 18,
		name: 'james',
		hobbies: ['fishing', 'sleeping', 'eating'],
	},
	{
		age: 14,
		name: 'timmy the giant',
		hobbies: ['games', 'reading', 'football'],
	},
	{
		age: 27,
		name: 'george',
		hobbies: ['FPS games', 'coding', 'hiking'],
	},
];

function App() {
	return (
		<div>
			<p>Learn some information about this person</p>
			{people.map((data) => (
				<Person person={data} />
			))}
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
