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
	const [user, setUser] = useState(
		localStorage.getItem('token')
			? { token: localStorage.token }
			: { username: '', isAdmin: false }
	);
	const [errors, setErrors] = useState(null);
	const history = useHistory();

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	useEffect(() => {
		if (user.token !== undefined) {
			localStorage.setItem('token', user.token);
		}
	}, [user]);

	function registerUser(userInfo) {
		JoblyApi.register(userInfo)
			.then((value) => {
				console.log(value);
				const token = value.token;
				console.log(jwt.verify(token, SECRET_KEY));
				setUser(jwt.verify(token, SECRET_KEY));
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

	return (
		<UserContext.Provider value={{ user, errors }}>
			<div className="App">
				<div>
					<Nav />
				</div>
				<div className="main-content">
					<AllRoutes registerUser={registerUser} />
				</div>
			</div>
		</UserContext.Provider>
	);
}

export default App;
