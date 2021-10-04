// add whatever parameters you deem necessary
function sameFrequency(oldNum1, oldNum2) {
	let nums1 = String(oldNum1);
	let nums2 = String(oldNum2);
	if (nums1.length !== nums2.length) return false;
	let keyValue = {};

	for (let num of nums2) {
		if (keyValue[num]) {
			keyValue[num] += 1;
		} else {
			keyValue[num] = 1;
		}
	}

	for (let num of nums1) {
		if (!keyValue[num]) return false;
		keyValue[num] -= 1;
		if (keyValue[num] < 0) return false;
	}

	return true;
}
