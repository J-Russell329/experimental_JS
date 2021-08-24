import React from 'react';
import '../static/Box.css';

function Box({ box, num, removeBox }) {
	const { color, width, height, x, y } = box;

	return (
		<div
			key={num}
			onClick={() => removeBox(num)}
			className="box"
			style={{
				backgroundColor: color,
				right: String(x) + '%',
				top: String(y) + '%',
				width,
				height,
			}}
		>
			<div>X</div>
		</div>
	);
}
export default Box;
