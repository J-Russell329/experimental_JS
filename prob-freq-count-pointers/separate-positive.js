// add whatever parameters you deem necessary
function separatePositive(arr) {
	let posIdx = 0;

	for (let i in arr) {
		if (arr[i] > 0) {
			let swap = arr[i];
			arr[i] = arr[posIdx];
			arr[posIdx] = swap;
			posIdx++;
		}
	}
	return arr;
}
