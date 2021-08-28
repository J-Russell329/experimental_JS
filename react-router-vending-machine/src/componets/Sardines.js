import React from 'react';
import { Link } from 'react-router-dom';

function Sardines() {
	return (
		<div>
			<div>
				<p>you insert a dollar bill into the machine</p>
				<p>.......</p>
				<p>The machine spits your bill back out</p>
			</div>
			<div>
				<Link to="/">Grab Something Else</Link>
			</div>
		</div>
	);
}

export default Sardines;
