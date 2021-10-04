// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
	if (str1.length > str2.length) return false;

	let check = '';
	let idxHolder = 0;
	for (let letter of str2) {
		if (letter === str1[idxHolder]) {
			check += letter;
			idxHolder++;
		}
		if (check === str1) break;
	}

	return check === str1 ? true : false;
}

// function isSubsequence(str1, str2) {
// 	let possible = new Set();

// 	if (str1.length > str2.length) return false;

// 	for (let i in str2) {
// 		if (str2[i] === str1[0] && str1.length <= str2.length - i) {
// 			let addPosible = [];
// 			for (let j = i; j < str1.length; j++) {
// 				addPosible.push(str2[j]);
// 			}
// 			possible.add(addPosible.join(''));
// 			if (possible.has(str1)) return true;
// 		}
// 	}

// 	return false;
// }
