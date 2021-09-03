import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompanyJobList from './CompanyJobList';
import Home from './Home';
import List from './List';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

function AllRoutes({ registerUser, loginUser, jobApply, updateUserData }) {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/signup">
				<SignUp registerUser={registerUser} />
			</Route>
			<Route exact path="/login">
				<Login loginUser={loginUser} />
			</Route>
			<Route exact path="/profile">
				<Profile updateUserData={updateUserData} />
			</Route>
			<Route exact path="/companies">
				<List listName="companies" />
			</Route>
			<Route exact path="/jobs">
				<List listName="jobs" jobApply={jobApply} />
			</Route>
			<Route exact path="/companies/:handle">
				<CompanyJobList jobApply={jobApply} />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default AllRoutes;
