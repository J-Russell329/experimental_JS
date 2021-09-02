import React from 'react';
import '../static/Form.css';
import useForm from './Hooks';

function SignUp({ registerUser }) {
	const [email, updateEmail] = useForm('');
	const [username, updateUsername] = useForm('');
	const [password, updatePassword] = useForm('');
	const [firstName, updateFirstName] = useForm('');
	const [lastName, updateLastName] = useForm('');

	return (
		<div className="form-container">
			<div>
				<form
					className="form-entry"
					onSubmit={(e) => {
						e.preventDefault();
						registerUser({
							email,
							username,
							password,
							firstName,
							lastName,
						});
					}}
				>
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
						<label name="username">Username: </label>
						<input
							onChange={updateUsername}
							value={username}
							type="text"
							name="username"
							placeholder="Username"
						></input>
					</div>
					<div>
						<label name="password">Password: </label>
						<input
							onChange={updatePassword}
							value={password}
							type="password"
							name="password"
							placeholder="Password"
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
					<button type="submit">Signup</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
