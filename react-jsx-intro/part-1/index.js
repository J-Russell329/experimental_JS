function FirstComponent() {
	return <p>My very first component</p>;
}
function NamedComponent({ name }) {
	return <p>{name}</p>;
}

function App() {
	return (
		<div>
			<h1>Greetings!</h1>
			<FirstComponent />
			<NamedComponent name="Paul" />
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
