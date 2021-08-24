import React, { useState } from 'react';
import './App.css';
import EditTodoList from './componets/EditTodoList';
import NewTodoList from './componets/NewTodoList';
import TodoList from './componets/TodoList';

function App() {
	const [todos, setTodos] = useState([]);

	function updateList(event) {
		event.preventDefault();
		const text = event.target[0].value;
		let state = 'todo';
		if (!text) {
			alert('todo must not be empty ');
			return;
		}
		setTodos([...todos, { text, state }]);
		event.target[0].value = '';
	}

	function updateItem(event) {
		event.preventDefault();
		const text = event.target[0].value;
		if (!text) {
			alert('todo must not be empty ');
			return;
		}
		let id = event.target.id;
		let tempTodos = [...todos];
		tempTodos[id].state = 'todo';
		tempTodos[id].text = text;
		setTodos([...tempTodos]);
	}

	function editTodo({ id, text, state }) {
		let tempTodos = [...todos];
		tempTodos[id].state = state;
		tempTodos[id].text = text;
		setTodos([...tempTodos]);
	}

	function removeTodo(event) {
		let id = event.target.id;
		let tempTodos = [...todos];
		tempTodos.splice(id, 1);
		setTodos([...tempTodos]);
	}
	return (
		<div className="App">
			<header className="App-header">
				<NewTodoList updateList={updateList} />
				<div id="todo-section">
					{todos.map((todo, i) => {
						if (todo.state === 'todo') {
							return (
								<TodoList
									todo={todo}
									id={i}
									editTodo={editTodo}
									removeTodo={removeTodo}
								/>
							);
						} else {
							return (
								<EditTodoList
									updateItem={updateItem}
									todo={todo}
									id={i}
								/>
							);
						}
					})}
				</div>
			</header>
		</div>
	);
}

export default App;
