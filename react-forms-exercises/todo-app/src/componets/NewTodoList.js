import React from 'react';
import '../static/NewTodoList.css';

function NewTodoList({ updateList }) {
	return (
		<form id="form-main" onSubmit={updateList}>
			<div>
				<label name="input-main">what do you need to do?</label>

				<input
					type="text"
					id="input-main"
					name="input-main"
					placeholder="add you to do here"
				/>
				<button type="submit">Add</button>
			</div>
		</form>
	);
}
export default NewTodoList;
