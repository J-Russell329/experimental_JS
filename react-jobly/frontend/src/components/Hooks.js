import { useState } from 'react';

function useForm(intial = '') {
	const [state, setState] = useState(intial);

	function updateValue(e) {
		setState(e.target.value);
	}
	return [state, updateValue];
}

export default useForm;
