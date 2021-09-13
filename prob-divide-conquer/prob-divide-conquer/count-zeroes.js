function countZeroes(arr) {
	let leftIdx = 0;
	let rightIdx = arr.length - 1;

	while (leftIdx < rightIdx) {
		let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
		let middleVal = arr[middleIdx];

		if (rightIdx - leftIdx <= 1) {
			return checkLastTwo(arr, leftIdx, rightIdx);
		}

		if (middleVal !== 0) {
			leftIdx = middleIdx + 1;
		} else {
			rightIdx = middleIdx;
		}
	}

	return 0;
}

function checkLastTwo(arr, leftIdx, rightIdx) {
	if (arr[leftIdx] === 0) {
		return arr.length - leftIdx;
	} else if (arr[rightIdx] === 0) {
		return arr.length - rightIdx;
	} else {
		return 0;
	}
}
module.exports = countZeroes;
