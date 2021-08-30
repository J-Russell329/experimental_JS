import React from 'react';
import { Link } from 'react-router-dom';
import '../static/DogList.css';

function DogList({ dog }) {
	return (
		<div>
			<div className="dog-card">
				<div>
					<img src={dog.src}></img>
				</div>
				<div>
					<div>
						<Link to={`dogs/${dog.name.toLowerCase()}`}>
							<header>Name: {dog.name}</header>
						</Link>
					</div>
					<div>
						<p>Age: {dog.age}</p>
					</div>
					<div>
						<p>facts:</p>
						<ul>
							{dog.facts.map((fact) => (
								<li>{fact}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DogList;
