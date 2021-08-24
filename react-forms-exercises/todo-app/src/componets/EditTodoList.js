import React, { useState } from 'react';
import '../static/EditTodoList.css';

function EditTodoList({ todo, id, updateItem }) {
	const [value, setValue] = useState(todo.text);
	function changeInput(event) {
		setValue(event.target.value);
	}
	return (
		<form
			id={id}
			className="from-secondary"
			key={id}
			onSubmit={(event) => updateItem(event)}
		>
			<div>
				<input
					type="text"
					name="input-main"
					placeholder={todo.text}
					value={value}
					onChange={changeInput}
				/>
				<button type="submit">Add</button>
			</div>
		</form>
	);
}
export default EditTodoList;
