import React from 'react';
import '../static/List.css';

function JobItem({ job }) {
	const { id, equity, salary, title } = job;
	return (
		<div key={id} className="list job">
			<div className="list-upper">
				<div className="list-upper-title">
					<h3>{title}</h3>
				</div>
			</div>
			<div>
				<p>Salary: {salary ? salary : 0}</p>
			</div>
			<div>
				<p>Equity: {equity ? equity : 0}</p>
			</div>
			{/* ------------------------------------------------------needs to be implimented */}
			<button>applies to job</button>
		</div>
	);
}

export default JobItem;
