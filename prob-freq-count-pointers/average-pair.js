// add whatever parameters you deem necessary
function averagePair(arr1, target) {
	checkedNums = new Set();

	for (let num of arr1) {
		let diff = target * 2 - num;
		if (checkedNums.has(diff)) return true;

		checkedNums.add(num);
	}
	return false;
}
