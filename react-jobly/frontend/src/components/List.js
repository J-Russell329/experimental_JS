import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from '../helpers/api';
import CompanyItem from './CompanyItem';
import JobItem from './JobItem';
import SearchBar from './Search';
import UserContext from './UserContext';

function List({ listName, compJobs = [], jobApply }) {
	const context = useContext(UserContext);
	const [items, setItems] = useState(compJobs);

	useEffect(() => {
		if (listName === 'companies') {
			let res = JoblyApi.getCompanies(context.query);
			res.then((value) => {
				setItems([...value]);
			});
		} else if (listName === 'jobs') {
			let res = JoblyApi.getJobs(context.query);
			res.then((value) => {
				setItems([...value]);
			});
		}
		// return () => {
		// 	context.setQuery(null);
		// };
	}, [listName, context.query]);

	if (listName === 'companies') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<SearchBar />
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
			</div>
		);
	} else if (listName === 'jobs' || listName === 'company jobs') {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<SearchBar />
				<div className="list-area">
					{items.map((item) => (
						<JobItem job={item} jobApply={jobApply} />
					))}
				</div>
			</div>
		);
	}
}

export default List;
