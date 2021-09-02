import React, { useState, useEffect } from 'react';
import '../static/Nav.css';
import JoblyApi from '../helpers/api';
import { useParams } from 'react-router-dom';
import List from './List';

function CompanyJobList() {
	const [company, setCompany] = useState();
	const { handle } = useParams();

	useEffect(() => {
		JoblyApi.getCompany(handle).then((value) => {
			// console.log(value);
			setCompany(value);
		});
	}, [handle]);

	return (
		<div key="companyJobList">
			{company ? (
				<>
					<div>
						<h1>{company.name}</h1>
						<p>Number of Employees: {company.numEmployees}</p>
						<p>{company.description}</p>
					</div>

					<List listName="company jobs" compJobs={company.jobs} />
				</>
			) : (
				<div>there are no jobs posted right now</div>
			)}
		</div>
	);
}

export default CompanyJobList;
