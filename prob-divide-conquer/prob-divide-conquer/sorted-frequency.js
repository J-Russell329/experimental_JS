function sortedFrequency(arr, val) {
	let l1 = 0;
	let l2 = 0;
	let r1 = arr.length - 1;
	let r2 = arr.length - 1;
	let firstIndex;
	let lastIndex;

	while (l1 <= r1) {
		if (r1 - l1 <= 1) {
			firstIndex = checkLastTwo(arr, l1, r1, val, 'l');
			break;
		}
		let middleIdx = Math.floor((l1 + r1) / 2);
		let middleVal = arr[middleIdx];

		if (middleVal < val) {
			l1 = middleIdx + 1;
			l2 = l1 > l2 ? l1 : l2;
		} else if (middleVal > val) {
			r1 = middleIdx - 1;
			r2 = r1 > r2 ? r1 : r2;
		} else if (middleVal === val) {
			r1 = middleIdx - 1;
			l2 = middleIdx + 1 > l2 ? middleIdx + 1 : l2;
		}
	}
	while (l2 <= r2) {
		if (r2 - l2 <= 1) {
			lastIndex = checkLastTwo(arr, l2, r2, val, 'r');
			break;
		}

		let middleIdx = Math.floor((l2 + r2) / 2);
		let middleVal = arr[middleIdx];

		if (middleVal < val || middleVal === val) {
			l2 = middleIdx + 1;
		} else if (middleVal > val) {
			r2 = middleIdx - 1;
		}
	}

	return lastIndex - firstIndex + 1 || -1;
}

function checkLastTwo(arr, left, right, val, side) {
	let offSet = side === 'l' ? 1 : -1;
	if (left === right) {
		return arr[left] === val ? left : left + offSet;
	} else {
		if (arr[right] === val) {
			return right;
		} else {
			return arr[left] === val ? left : left + offSet;
		}
	}
}

module.exports = sortedFrequency;
