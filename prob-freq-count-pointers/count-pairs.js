// add whatever parameters you deem necessary
function countPairs(arr, target) {
	let setArr = new Set(arr);
	let returnCount = 0;

	for (let num of arr) {
		let pair = target - num;
		if (setArr.has(pair) && pair !== num) {
			returnCount++;
			setArr.delete(num);
			setArr.delete(pair);
		}
	}
	return returnCount;
}
