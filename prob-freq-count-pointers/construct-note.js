// add whatever parameters you deem necessary
function constructNote(str1, letters) {
	if (str1.length > letters.length) return false;
	let keyValue = {};

	for (let letter of letters) {
		if (keyValue[letter]) {
			keyValue[letter] += 1;
		} else {
			keyValue[letter] = 1;
		}
	}

	for (let letter of str1) {
		if (!keyValue[letter]) return false;
		keyValue[letter] -= 1;
		if (keyValue[letter] < 0) return false;
	}

	return true;
}
