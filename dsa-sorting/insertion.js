function insertionSort(oldArr) {
	let arr = [...oldArr];
	for (let indx in arr) {
		let correct = false;
		let compareIndx = indx - 2;
		while (!correct) {
			if (arr[indx] > arr[indx - 1] || Number(indx) === 0) {
				correct = true;
				break;
			}
			if (arr[indx] >= arr[compareIndx]) {
				let lowNum = arr[indx];
				arr.splice(indx, 1);
				arr.splice(compareIndx + 1, 0, lowNum);
				correct = true;
				break;
			} else {
				compareIndx--;
			}

			if (compareIndx < 0) {
				let lowNum = arr[indx];
				arr.splice(indx, 1);
				arr.unshift(lowNum);
				correct = true;
				break;
			}
		}
	}

	return arr;
}
// function insertionSort(oldArr) {
// 	let arr = [...oldArr];
// 	for (let indx in arr) {
// 		correct = false;
// 		let compareIndx = indx - 2;
// 		while (!correct && Number(indx) !== 0) {
// 			if (arr[indx] > arr[indx - 1]) {
// 				correct = true;
// 				break;
// 			}
// 			if (arr[indx] >= arr[compareIndx]) {
// 				let tempNum = arr[indx];
// 				arr.splice(indx, 1);
// 				arr.splice(compareIndx + 1, 0, tempNum);
// 				correct = true;
// 				break;
// 			} else if (
// 				arr[indx] < arr[compareIndx] &&
// 				arr[indx] > arr[compareIndx - 1]
// 			) {
// 				if (compareIndx - 1 < 0) {
// 					let lowNum = arr[indx];
// 					arr.splice(indx, 1);
// 					arr.unshift(lowNum);
// 					correct = true;
// 					break;
// 				} else {
// 					let tempNum = arr[indx];
// 					arr.splice(indx, 1);
// 					arr.splice(compareIndx, 0, tempNum);
// 					correct = true;
// 					break;
// 				}
// 			}
// 			compareIndx--;
// 		}
// 	}

// 	return arr;
// }

let test1 = [1, 2, 3, 5, 4];
let test2 = [3, 4, 2, 1, 5];
let test3 = [4, 20, 12, 10, 7, 9];

module.exports = insertionSort;
