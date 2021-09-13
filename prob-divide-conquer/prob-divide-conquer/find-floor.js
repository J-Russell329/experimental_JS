function findFloor(arr, val) {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		if (right - left <= 1) {
			return lastTwo(arr, left, right, val);
			break;
		}

		mid = Math.floor((left + right) / 2);
		midVal = arr[mid];

		if (midVal > val) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
}

function lastTwo(arr, left, right, val) {
	let leftVal = arr[left];
	let rightVal = arr[right];

	if (leftVal > val && rightVal > val) {
		return arr[left - 1] || -1;
	} else if (leftVal <= val && rightVal > val) {
		return leftVal;
	} else {
		return rightVal;
	}
}

module.exports = findFloor;
