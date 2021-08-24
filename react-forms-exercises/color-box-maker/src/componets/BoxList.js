import React from 'react';
import '../static/BoxList.css';
import Box from './Box';

function BoxList({ boxes, removeBox }) {
	return (
		<div key="box-list" id="box-list">
			{boxes.map((box, i) => (
				<Box box={box} num={i} removeBox={removeBox} />
			))}
		</div>
	);
}
export default BoxList;
