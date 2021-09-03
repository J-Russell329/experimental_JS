import React from 'react';
import '../static/List.css';
import { Link } from 'react-router-dom';

function CompanyItem({ company }) {
	const { handle, name, numEmployees, description } = company;
	return (
		<Link key={handle} to={`/companies/${handle}`} className="card-link">
			<div className="list company">
				<div className="list-upper">
					<div className="list-upper-title">
						<h3>{name}</h3>
					</div>
				</div>
				<div>
					<p>Number of Employees: {numEmployees}</p>
				</div>
				<div>
					<p>{description}</p>
				</div>
			</div>
		</Link>
	);
}

export default CompanyItem;
