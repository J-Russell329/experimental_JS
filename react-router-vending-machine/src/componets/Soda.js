import React from 'react';
import { Link } from 'react-router-dom';

function Soda() {
	return (
		<div>
			<div>
				<p>You have recieved a soda. You open the can. Pop!</p>
				<p>But something seems off.</p>
				<p>
					Upon the first sip you realize that the soda has already
					gone flat.
				</p>
			</div>
			<div>
				<Link to="/">Grab Something Else</Link>
			</div>
		</div>
	);
}

export default Soda;
