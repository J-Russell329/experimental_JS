import React, { useState } from 'react';
import '../static/ShowColor.css';
import { useHistory } from 'react-router-dom';

function NewColor({ setColors, colors }) {
	const history = useHistory();
	const [value, setValue] = useState('');
	const [logError, setLogError] = useState('');
	function addColor(e) {
		e.preventDefault();
		if (value === '') {
			alert('please insert a valid value');
			return;
		}
		if (colors.includes(value)) {
			history.push('/color/' + value);
		} else {
			setColors([...colors, value]);
			localStorage.setItem('colors', [...colors, value]);
			history.push('/color/' + value);
		}
	}
	function changeValue(e) {
		setValue(e.target.value);
		setLogError('');
	}

	return (
		<div>
			<form onSubmit={addColor}>
				<div>
					<label>
						Select A Color:
						<input
							type="text"
							onChange={changeValue}
							value={value}
						></input>
						{logError}
					</label>
				</div>
				<div>
					<button type="submit">Add Color</button>
				</div>
			</form>
		</div>
	);
}

export default NewColor;
