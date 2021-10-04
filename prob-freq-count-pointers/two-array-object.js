// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
	let obj = {};
	for (let i in arr1) {
		let key = arr1[i];

		if (!key) break;

		let val = arr2[i] || null;
		obj[key] = val;
	}

	return obj;
}
