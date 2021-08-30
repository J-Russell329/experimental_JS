import './App.css';
import VendingMachine from './componets/VendingMachine';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Soda from './componets/Soda';
import Chips from './componets/Chips';
import Sardines from './componets/Sardines';

function App() {
	const ACTIVE_STYLES = {
		fontWeight: 'bold',
		color: 'black',
	};
	return (
		<div className="App">
			<header className="App-header">
				<BrowserRouter>
					<nav>
						<div>
							<NavLink exact to="/" activeStyle={ACTIVE_STYLES}>
								Vending Machine
							</NavLink>
						</div>
						<div>
							<NavLink
								exact
								to="/soda"
								activeStyle={ACTIVE_STYLES}
							>
								Soda
							</NavLink>
						</div>

						<div>
							<NavLink
								exact
								to="/chips"
								activeStyle={ACTIVE_STYLES}
							>
								Chips
							</NavLink>
						</div>

						<div>
							<NavLink
								exact
								to="/sardines"
								activeStyle={ACTIVE_STYLES}
							>
								Sardines
							</NavLink>
						</div>
					</nav>
					<Route exact path="/">
						<VendingMachine />
					</Route>
					<Route exact path="/soda">
						<Soda />
					</Route>
					<Route exact path="/chips">
						<Chips />
					</Route>
					<Route exact path="/sardines">
						<Sardines />
					</Route>
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
