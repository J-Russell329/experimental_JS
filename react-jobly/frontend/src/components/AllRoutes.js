import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompanyJobList from './CompanyJobList';
import Home from './Home';
import List from './List';
import Login from './Login';
import SignUp from './SignUp';

function AllRoutes({ registerUser }) {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/signup">
				<SignUp registerUser={registerUser} />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/companies">
				<List listName="companies" />
			</Route>
			<Route exact path="/jobs">
				<List listName="jobs" />
			</Route>
			<Route exact path="/companies/:handle">
				<CompanyJobList />
			</Route>
			<Route exact path="/jobs:handle">
				<div>path to jobs / handle</div>
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default AllRoutes;
