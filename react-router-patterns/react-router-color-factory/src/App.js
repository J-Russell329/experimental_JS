import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, Link, useHistory } from 'react-router-dom';
import './App.css';
import NewColor from './components/NewColor';
import ShowColor from './components/ShowColor';

function App() {
	const history = useHistory();
	const [colors, setColors] = useState(() => {
		if (localStorage.getItem('colors') !== null) {
			return localStorage.getItem('colors').split(',');
		}
		return [];
	});
	useEffect(() => {
		console.log(colors);
	}, [colors]);

	function clearColors() {
		setColors([]);
		localStorage.clear();
		history.push('/color');
	}

	return (
		<div className="App">
			<header className="App-header">
				<nav>
					<div>
						<h2>
							<Link to="/color">Home</Link>
						</h2>
					</div>
					<div>
						<h2>
							<Link to="/color/new">Add Color</Link>
						</h2>
					</div>
					<div>
						<h2 onClick={clearColors}>Clear Colors</h2>
					</div>
				</nav>
				<Switch>
					<Route exact path="/color">
						{colors.map((color) => (
							<Link to={'/color/' + color}>
								<h4 style={{ color }}>{color}</h4>
							</Link>
						))}
					</Route>
					<Route exact path="/color/new">
						<NewColor setColors={setColors} colors={colors} />
					</Route>
					<Route exact path="/color/:color">
						<ShowColor colors={colors} />
					</Route>
					<Redirect to="/color" />
				</Switch>
			</header>
		</div>
	);
}

export default App;
