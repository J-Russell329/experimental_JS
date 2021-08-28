import React from 'react';
import { Link } from 'react-router-dom';

function Chips() {
	return (
		<div>
			<div>
				The machince motions to retreive your snack. As the chips fall
				it gets lodged just above the retrieval area. You attempt to
				retreive the bag but it is just out of reach.
			</div>
			<div>
				<Link to="/">Grab Something Else</Link>
			</div>
		</div>
	);
}

export default Chips;
