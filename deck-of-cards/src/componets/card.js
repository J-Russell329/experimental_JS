import React from 'react';

function Card({ cardData, id }) {
	const { image, rotation } = cardData;

	let transform = `rotate(${rotation}deg)`;

	return (
		<div className="card" key={id}>
			<img
				src={image}
				style={{
					transform,
				}}
			/>
		</div>
	);
}
export default Card;
