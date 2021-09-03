import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import AllRoutes from './components/AllRoutes';
import Nav from './components/Nav';
import UserContext from './components/UserContext';
import JoblyApi from './helpers/api';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './config';

function App() {
	const [user, setUser] = useState(() => getLocalUserData());
	const [errors, setErrors] = useState(null);
	const [appliedJobs, setAppliedJobs] = useState(new Set());
	const [query, setQuery] = useState(null);
	const history = useHistory();

	useEffect(() => {
		if (errors) {
			console.log('we have errors');
			console.log(errors);
		}
	}, [errors]);
	// useEffect(() => {
	// 	console.log('query search of');
	// 	console.log(query);
	// }, [query]);

	useEffect(() => {
		localStorage.setItem('token', user.token);
		if (user.token && user.username) {
			JoblyApi.getUserData(user.username, user.token).then((value) => {
				let tempSet = new Set();
				for (let i in value.applications) {
					tempSet.add(value.applications[i]);
				}
				setAppliedJobs(tempSet);
			});
		}
	}, [user]);

	function getLocalUserData() {
		if (localStorage.getItem('token')) {
			const { username, isAdmin, iat } = jwt.verify(
				localStorage.token,
				SECRET_KEY
			);
			return { username, isAdmin, iat, token: localStorage.token };
		} else {
			return { username: '', isAdmin: false, iat: '', token: '' };
		}
	}

	function registerUser(userInfo) {
		JoblyApi.register(userInfo)
			.then((value) => {
				const token = value.token;
				const { username, isAdmin, iat } = jwt.verify(
					token,
					SECRET_KEY
				);
				setUser({ username, isAdmin, iat, token });
				history.push('/');
			})
			.catch((err) => {
				//-----------------------------------------need to do some error handleing for the login user
				setErrors('');
				let errList = [];
				err.map((error) => {
					errList = [...errList, error.replace('instance.', '')];
				});
				setErrors(errList);
				return '';
			});
	}

	function loginUser(userInfo) {
		JoblyApi.login(userInfo)
			.then((value) => {
				const token = value.token;
				const { username, isAdmin, iat } = jwt.verify(
					token,
					SECRET_KEY
				);
				setUser({ username, isAdmin, iat, token });
				history.push('/');
			})
			.catch((err) => {
				setErrors('');
				let errList = [];
				err.map((error) => {
					errList = [...errors, error.replace('instance.', '')];
					setErrors(errList);
					return '';
				});
			});
	}

	function logOut() {
		setUser({ username: '', isAdmin: false, iat: '', token: '' });
	}

	function jobApply(jobId) {
		if (!user.token) {
			alert('must be logged in to apply to jobs');
			return;
		}
		JoblyApi.jobApply(user.username, jobId, user.token)
			.then(() => {
				let tempSet = new Set(appliedJobs);
				tempSet.add(jobId);
				setAppliedJobs(tempSet);
			})
			.catch((err) => {
				if (
					err[0].includes(
						'duplicate key value violates unique constraint'
					)
				) {
					let tempSet = new Set(appliedJobs);
					tempSet.add(jobId);
					setAppliedJobs(tempSet);
				}
			});
	}

	function updateUserData(userInfo) {
		JoblyApi.updateUserData(userInfo)
			.then(() => {
				alert('updated');
			})
			.catch(() =>
				alert("whoops, our fairies couldn't update your profile")
			);
	}

	return (
		<UserContext.Provider
			value={{ user, errors, appliedJobs, setQuery, query }}
		>
			<div className="App">
				<div>
					<Nav logOut={logOut} />
				</div>
				<div className="main-content">
					<AllRoutes
						registerUser={registerUser}
						loginUser={loginUser}
						jobApply={jobApply}
						updateUserData={updateUserData}
					/>
				</div>
			</div>
		</UserContext.Provider>
	);
}

export default App;
