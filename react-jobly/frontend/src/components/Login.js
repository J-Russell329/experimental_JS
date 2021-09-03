import React from 'react';
import '../static/Form.css';
import useForm from './Hooks';

function Login({ loginUser }) {
	const [username, updateUsername] = useForm('');
	const [password, updatePassword] = useForm('');
	return (
		<div className="form-container">
			<div>
				<form
					className="form-entry"
					onSubmit={(e) => {
						e.preventDefault();
						loginUser({
							username,
							password,
						});
					}}
				>
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

					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
