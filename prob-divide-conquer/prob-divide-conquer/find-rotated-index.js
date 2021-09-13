function findRotatedIndex(arr, val) {
	let left = 0;
	let right = arr.length - 1;
	let mid = Math.floor(left + right / 2);
	let midVal = arr[mid];

	if (midVal === val) {
		return mid;
	}

	[left, right] = intialCheker(arr, val, mid, midVal, left, right);

	while (left <= right) {
		if (right - left <= 1) {
			return lastTwo(arr, left, right, val);
			break;
		}

		mid = Math.floor((left + right) / 2);
		midVal = arr[mid];

		if (midVal === val) {
			return mid;
		}
		if (midVal < val) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
}

function intialCheker(arr, val, mid, midVal, left, right) {
	let leftMost = arr[0];
	let rightMost = arr[arr.length - 1];

	if (leftMost === val) {
		return [left, left];
	}
	if (rightMost === val) {
		return [right, right];
	}

	if (leftMost < val && midVal > val) {
		right = mid - 1;
		left = left + 1;
	} else {
		left = mid + 1;
		right = right - 1;
	}

	return [left, right];
}

function lastTwo(arr, left, right, val) {
	if (arr[left] === val) {
		return left;
	}
	if (arr[right] === val) {
		return right;
	}

	return -1;
}

module.exports = findRotatedIndex;
