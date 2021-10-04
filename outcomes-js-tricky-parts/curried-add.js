function curriedAdd() {
	let subTotal;
	subTotal = subTotal ? subTotal : 0;

	// return (function (total) {
	// 	if (total) {
	// 		subTotal += total;
	// 	}

	// 	return subTotal;
	// })();

	return (total) => {
		if (total) {
			subTotal += total;
		}
		return subTotal;
	};
}

module.exports = { curriedAdd };
