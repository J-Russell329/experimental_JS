import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useForm from './Hooks';
import UserContext from './UserContext';

function SearchBar() {
	const context = useContext(UserContext);
	const history = useHistory();
	const [search, setSearch, setSearchValue] = useForm('');

	function querySearch(e) {
		e.preventDefault();
		context.setQuery(search);
		history.push({ search: `?name=${search}` });
	}

	useEffect(() => {
		return () => {
			setSearchValue('');
			context.setQuery(null);
			history.push({ search: '' });
		};
	}, [history.location.pathname]);

	return (
		<div className="search-bar">
			<form onSubmit={querySearch}>
				<input
					onChange={setSearch}
					value={search}
					placeholder="search"
				></input>
				<button type="submit">Search</button>
			</form>
		</div>
	);
}

export default SearchBar;
