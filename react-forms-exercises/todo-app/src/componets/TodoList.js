import React from 'react';
import '../static/TodoList.css';

function TodoList({ id, editTodo, todo, removeTodo }) {
	const { text } = todo;
	return (
		<div key={id} className="todo-item">
			<div
				id={id}
				className="todo-text"
				onClick={() => editTodo({ id, text: todo.text, state: 'edit' })}
			>
				{text}
			</div>
			<div className="delete" onClick={removeTodo}>
				X
			</div>
		</div>
	);
}
export default TodoList;
