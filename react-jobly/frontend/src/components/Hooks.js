import { useState } from 'react';

function useForm(intial = '') {
	const [state, setState] = useState(intial);

	function updateValue(e) {
		setState(e.target.value);
	}
	function setValue(value) {
		setState(value);
	}
	return [state, updateValue, setValue];
}

export default useForm;
