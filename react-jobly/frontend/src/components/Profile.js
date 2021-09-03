import React, { useContext, useEffect } from 'react';
import '../static/Nav.css';
import useForm from './Hooks';
import UserContext from './UserContext';
import JoblyApi from '../helpers/api';
import { Redirect } from 'react-router-dom';

function Profile({ updateUserData }) {
	const context = useContext(UserContext);

	useEffect(() => {
		JoblyApi.getUserData(context.user.username, context.user.token)
			.then((value) => {
				setEmail(value.email);
				setUsername(value.username);
				setFirstName(value.firstName);
				setLastName(value.lastName);
			})
			.catch();
	}, []);

	const [email, updateEmail, setEmail] = useForm('');
	const [username, updateUsername, setUsername] = useForm('');
	const [password, updatePassword] = useForm('');
	const [firstName, updateFirstName, setFirstName] = useForm('');
	const [lastName, updateLastName, setLastName] = useForm('');

	if (context.user.username) {
		return (
			<div>
				<form
					className="form-entry"
					onSubmit={(e) => {
						e.preventDefault();
						updateUserData({
							email,
							username: context.user.username,
							password,
							firstName,
							lastName,
						});
					}}
				>
					<div>
						<label name="username">Username: </label>
						<input
							style={{ backgroundColor: 'lightGrey' }}
							value={username}
							type="text"
							name="username"
							placeholder="Username"
						></input>
					</div>
					<div>
						<label name="email">Email: </label>
						<input
							value={email}
							onChange={updateEmail}
							type="email"
							name="email"
							placeholder="Email"
						></input>
					</div>
					<div>
						<label name="first-name">First name: </label>
						<input
							onChange={updateFirstName}
							value={firstName}
							type="text"
							name="first-name"
							placeholder="First name"
						></input>
					</div>
					<div>
						<label name="last-name">Last name: </label>
						<input
							onChange={updateLastName}
							value={lastName}
							type="text"
							name="last-name"
							placeholder="Last name"
						></input>
					</div>
					<div>
						<label name="password">Password: </label>
						<input
							onChange={updatePassword}
							value={password}
							type="password"
							name="password"
							placeholder="confirm password to update"
						></input>
					</div>
					<button type="submit">Signup</button>
				</form>
			</div>
		);
	}
	return <Redirect to="/login" />;
}

export default Profile;
