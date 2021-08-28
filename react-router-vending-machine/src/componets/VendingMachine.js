import React from 'react';
import { Link } from 'react-router-dom';

function VendingMachine() {
	return (
		<div>
			<header style={{ fontSize: '45px' }}>
				The Machine of Inconvenience
			</header>
			<p>grab a snack</p>
			<div>
				<Link to="/soda">A4: Soda</Link>
			</div>
			<div>
				<Link to="/Chips">B5: Chips</Link>
			</div>
			<div>
				<Link to="/Sardines">C2: Sardines</Link>
			</div>
		</div>
	);
}

export default VendingMachine;
