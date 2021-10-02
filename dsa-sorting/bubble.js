function bubbleSort(arr) {
	let running = true;
	let limit = arr.length;
	while (running && limit >= 0) {
		running = false;
		limit--;

		for (let i = 0; i < limit; i++) {
			if (arr[i] > arr[i + 1]) {
				let tempHigh = arr[i];
				let tempLow = arr[i + 1];
				arr[i] = tempLow;
				arr[i + 1] = tempHigh;
				running = true;
			}
		}
	}

	return arr;
}

module.exports = bubbleSort;
