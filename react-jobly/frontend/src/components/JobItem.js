import React, { useContext } from 'react';
import '../static/List.css';
import UserContext from './UserContext';

function JobItem({ job, jobApply }) {
	const context = useContext(UserContext);
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
			{context.appliedJobs.has(id) ? (
				<button style={{ backgroundColor: '#548ca8' }}>applied</button>
			) : (
				<button onClick={() => jobApply(id)}>applies to job</button>
			)}
			{/* <button onClick={() => jobApply(id)}>applies to job</button> */}
		</div>
	);
}

export default JobItem;
