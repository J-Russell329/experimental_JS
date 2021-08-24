import React from 'react';
import '../static/NewBoxForm.css';

function NewBoxFrom({ addBox }) {
	return (
		<form onSubmit={addBox}>
			<div>
				<label name="background-color">
					please input a color for your background:
				</label>

				<input
					type="text"
					id="background-color"
					name="background-color"
					placeholder="background color"
				/>
			</div>
			<div>
				<label name="width">please input a width for you box:</label>

				<input
					type="text"
					id="width"
					name="width"
					placeholder="width"
				/>
			</div>
			<div>
				<label name="height">please input a height for you box:</label>

				<input
					type="text"
					id="height"
					name="height"
					placeholder="height"
				/>
			</div>
			<button type="button" onClick={addBox}>
				Submit
			</button>
		</form>
	);
}
export default NewBoxFrom;
