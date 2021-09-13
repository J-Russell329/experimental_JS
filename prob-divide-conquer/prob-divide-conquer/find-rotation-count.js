function findRotationCount(arr) {
	let left = 0;
	let right = arr.length - 1;
	let mid = Math.floor(left + right / 2);
	let midVal = arr[mid];
	let lastVal;
	let breakPoint = 0;

	[left, right, lastVal] = intialCheker(arr, mid, midVal, left, right);

	while (left <= right) {
		if (right - left <= 1) {
			breakPoint = lastTwo(arr, left, right, lastVal);
			break;
		}

		mid = Math.floor(left + right / 2);
		midVal = arr[mid];

		if (lastVal > midVal) {
			right = mid - 1;
		} else if (lastVal < midVal) {
			left = mid + 1;
		} else if (lastVal === midVal) {
			left = right + 1;
			breakPoint = mid;
			break;
		}
	}
	return breakPoint;
}

function intialCheker(arr, mid, midVal, left, right) {
	let leftVal = arr[0];
	let rightVal = arr[arr.length - 1];
	let lastVal;

	if (leftVal > midVal && midVal < rightVal) {
		right = mid;
		left = 1;
		lastVal = leftVal;
	} else if (leftVal < midVal && midVal > rightVal) {
		left = mid + 1;
		lastVal = midVal;
	} else if (leftVal < midVal && midVal < rightVal) {
		left = 0;
		right = 1;
		lastVal = leftVal;
	}

	return [left, right, lastVal];
}

function lastTwo(arr, left, right, lastVal) {
	let returnVal = 0;
	if ((left = right)) {
		returnVal = arr[left] <= lastVal ? left : left - 1;
	} else {
		if (arr[left] <= arr[right]) {
			returnVal = left - 1;
		} else {
			arr[left] > arr[right] ? right : left;
		}
	}
	return returnVal;
}

module.exports = findRotationCount;
