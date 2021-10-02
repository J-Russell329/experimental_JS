function merge(arr1, arr2) {
	if (arr2 === undefined) {
		return arr1;
	}
	let returnArr = [];
	const newArr1 = arr1.length < arr2.length ? arr1 : arr2;
	const newArr2 = arr1.length < arr2.length ? arr2 : arr1;
	let indexHolder1 = 0;
	let indexHolder2 = 0;

	while (indexHolder1 < newArr1.length) {
		if (newArr2[indexHolder2] === undefined) break;
		if (newArr1[indexHolder1] < newArr2[indexHolder2]) {
			returnArr.push(newArr1[indexHolder1]);
			indexHolder1++;
		} else {
			returnArr.push(newArr2[indexHolder2]);
			indexHolder2++;
		}
	}
	returnArr.push(...newArr1.slice(indexHolder1));
	returnArr.push(...newArr2.slice(indexHolder2));

	return returnArr;
}

function mergeSort(arr) {
	let seperating = true;
	let sepList = [[...arr]];
	let tempSepList = [];

	while (seperating) {
		seperating = false;
		tempSepList = [];
		for (sepListItem of sepList) {
			let midNum = Math.ceil(sepListItem.length / 2);

			let first = sepListItem;
			let second = first.splice(midNum);

			tempSepList.push(first);
			if (second) {
				tempSepList.push(second);
			}
		}
		sepList[0].length > 1 ? (seperating = true) : null;
		sepList = tempSepList;
	}

	while (sepList.length > 1) {
		tempSepList = [];
		for (let i = 0; i * 2 < sepList.length; i++) {
			j = i * 2;

			tempSepList.push(merge(sepList[j], sepList[j + 1]));
		}
		sepList = tempSepList;
	}

	return sepList[0];
}

let temp1 = [1, 3, 5, 6];
let temp2 = [2, 4, 7];

let temp3 = [5, 7, 9, 12, 60];
let temp4 = [20, 30, 40, 50];

let temp5 = [7, 2, 3, 4, 1, 9];
module.exports = { merge, mergeSort };

// function merge(arr1, arr2) {
// 	let returnArr = [];
// 	const opperations = Math.min(arr1.length, arr2.length);

// 	for (let i = 0; i < opperations; i++) {
// 		if (arr1[i] > arr2[i]) {
// 			returnArr.push(arr2[i]);
// 			returnArr.push(arr1[i]);
// 		} else {
// 			returnArr.push(arr1[i]);
// 			returnArr.push(arr2[i]);
// 		}
// 	}
// 	returnArr.push(...arr1.slice(arr2.length));
// 	returnArr.push(...arr2.slice(arr1.length));
// 	return returnArr;
// }

// let temp1 = [1, 3, 5, 6];
// let temp2 = [2, 4, 7];

// function mergeSort(arr) {}

// module.exports = { merge, mergeSort };
