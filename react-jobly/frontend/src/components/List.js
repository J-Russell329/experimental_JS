import React, { useState, useEffect } from 'react';
import JoblyApi from '../helpers/api';
import CompanyItem from './CompanyItem';
import JobItem from './JobItem';

function List({ listName, compJobs = [] }) {
	const [items, setItems] = useState(compJobs);

	useEffect(() => {
		if (listName === 'companies') {
			let res = JoblyApi.getCompanies();
			res.then((value) => {
				setItems([...value]);
			});
		} else if (listName === 'jobs') {
			let res = JoblyApi.getJobs();
			res.then((value) => {
				setItems([...value]);
			});
		}
	}, [listName]);

	if (listName === 'companies') {
		return (
			<div className="list-area">
				{items.map((item) => (
					<CompanyItem company={item} />
				))}
				{items.length === 0 ? (
					<div className="loading">
						loading:
						<i className="fas fa-4x fa-spinner fa-spin" />
					</div>
				) : null}
			</div>
		);
	} else if (listName === 'jobs' || listName === 'company jobs') {
		return (
			<div className="list-area">
				{items.map((item) => (
					<JobItem job={item} />
				))}
			</div>
		);
	}
}

export default List;
