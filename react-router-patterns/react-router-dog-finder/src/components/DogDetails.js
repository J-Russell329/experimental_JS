import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../static/DogDetails.css';

function DogDetails({ dogs }) {
	let dog;
	const { dogName } = useParams();
	for (let i in dogs) {
		if (dogs[i].name.toLowerCase() === dogName) {
			dog = dogs[i];
		}
	}
	// const search = window.location.search;
	// const params = new URLSearchParams(search);
	// let dogID = params.get('q');
	// const dog = dogs[dogID] || undefined;

	return dog ? (
		<div className="dog-details">
			<div>
				<header>Name: {dog.name}</header>
			</div>
			<div>
				<p id="age">Age: {dog.age}</p>
			</div>
			<div>
				<p>Facts:</p>
				<ul>
					{dog.facts.map((fact) => (
						<li>{fact}</li>
					))}
				</ul>
			</div>
			<Link to="/dogs">
				<button>See More Dogs</button>
			</Link>
		</div>
	) : (
		<>
			<div> no dog found by that name</div>
			<Link to="/dogs">
				<button>See More Dogs</button>
			</Link>
		</>
	);
	// return (
	// 	<div className="dog-details">
	// 		<div>
	// 			<header>Name: {dog ? dog.name : 'not found'}</header>
	// 		</div>
	// 		<div>
	// 			<p id="age">Age: {dog ? dog.age : 'not found'}</p>
	// 		</div>
	// 		<div>
	// 			<p>Facts:</p>
	// 			<ul>
	// 				{dog ? (
	// 					dog.facts.map((fact) => <li>{fact}</li>)
	// 				) : (
	// 					<li>not found</li>
	// 				)}
	// 			</ul>
	// 		</div>
	// 		<Link to="/dogs">
	// 			<button>Go Back</button>
	// 		</Link>
	// 	</div>
	// );
}

export default DogDetails;
