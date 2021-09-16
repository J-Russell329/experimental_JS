/** product: calculate the product of an array of numbers. */

function product(nums) {
	if (nums[0] === undefined) {
		return 1;
	}
	return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, num = 0) {
	if (words[0] === undefined) {
		return 0;
	}
	let tempNum = words[0].length - num > 0 ? words[0].length - num : 0;
	console.log('num:', num);
	console.log(tempNum);
	return tempNum + longest(words.slice(1), num + tempNum);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, num = 0) {
	if (num > str.length - 1) {
		return '';
	}
	const letter = num % 2 == 0 ? str[num] : '';
	num++;
	return letter + everyOther(str, num);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0) {
	const limit = Math.ceil(str.length / 2) - 1;
	if (idx > limit) return true;
	let left = str[idx];
	let right = str[str.length - 1 - idx];
	if (left !== right) return false;

	return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
	if (arr[idx] === val) return idx;
	if (arr.length < idx) return -1;
	return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = 0) {
	if (str.length === idx) return '';
	let letter = str[str.length - 1 - idx] || '';
	return letter + revString(str, idx + 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
	let stringArr = [];
	for (let key in obj) {
		if (typeof obj[key] === 'string') stringArr.push(obj[key]);
		if (typeof obj[key] === 'object')
			stringArr.push(...gatherStrings(obj[key]));
	}
	return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, idx = 0) {
	if (arr[idx] === val) return idx;
	if (arr.length < idx) return -1;
	return binarySearch(arr, val, idx + 1);
}

module.exports = {
	product,
	longest,
	everyOther,
	isPalindrome,
	findIndex,
	revString,
	gatherStrings,
	binarySearch,
};
