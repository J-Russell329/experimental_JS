import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../static/Nav.css';
import UserContext from './UserContext';

function Nav({ logOut }) {
	const context = useContext(UserContext);
	return (
		<nav>
			<div className="homeNav">
				<div>
					<Link to="/">
						<h4>Home</h4>
					</Link>
				</div>
			</div>
			<div className="auxNavLinks">
				<div>
					<Link to="/companies">
						<h4>Companies</h4>
					</Link>
				</div>
				<div>
					<Link to="/jobs">
						<h4>Jobs</h4>
					</Link>
				</div>
				{context.user.username ? (
					<>
						<div>
							<Link to="/profile">
								<h4>Profile</h4>
							</Link>
						</div>
						<div
							style={{ textDecoration: 'underline' }}
							onClick={logOut}
						>
							<h4>LogOut</h4>
						</div>
					</>
				) : (
					<>
						<div>
							<Link to="/signup">
								<h4>Signup</h4>
							</Link>
						</div>
						<div>
							<Link to="/login">
								<h4>Login</h4>
							</Link>
						</div>
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
