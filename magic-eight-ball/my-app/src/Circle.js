import './App.css';

function Circle({ color = 'black', text, action }) {
	return (
		<div
			style={{ backgroundColor: color }}
			className="circle"
			onClick={action}
		>
			<span>{text}</span>
		</div>
	);
}

export default Circle;
