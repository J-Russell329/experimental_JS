import React from 'react';
import '../static/ShowColor.css';
import { Redirect, useParams } from 'react-router-dom';

function ShowColor({ colors }) {
	let { color } = useParams();
	if (colors.includes(color)) {
		return (
			<div id="main-background" style={{ backgroundColor: color }}></div>
		);
	} else {
		alert('that is not a valid color');
		return <Redirect to="/color" />;
	}
}

export default ShowColor;
