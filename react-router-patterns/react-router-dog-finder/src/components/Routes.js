import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DogDetails from './DogDetails';
import DogList from './DogList';

function Routes({ dogs }) {
	return (
		<Switch>
			<Route exact path="/dogs">
				{dogs.map((dog) => (
					<DogList dog={dog} />
				))}
			</Route>
			<Route path="/dogs/:dogName">
				<DogDetails dogs={dogs} />
			</Route>
			<Redirect to="/dogs" />
		</Switch>
	);
}

export default Routes;
