function createAccount(initPin, initAmount) {
	let pin = initPin;
	let amount = initAmount;

	function checkPin(inputPin) {
		return inputPin === pin;
	}

	return {
		checkBalance(inputPin) {
			if (!checkPin(inputPin)) return 'Invalid PIN';
			return amount;
		},
		depost(inputPin, addAmount) {
			if (!checkPin(inputPin)) return 'Invalid PIN';
			amount += addAmount;
			return `Succesfully deposited $${addAmount}. Current balance: $${amount}`;
		},
		withdraw(inputPin, subAmount) {
			if (!checkPin(inputPin)) return 'Invalid PIN';
			if (amount - subAmount < 0)
				return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
			amount -= subAmount;
			return `Succesfully withdrew $${subAmount}. Current balance: $${amount}`;
		},
		changePin(inputPin, newPin) {
			if (!checkPin(inputPin)) return 'Invalid PIN';
			pin = newPin;
			return 'PIN successfully changed!';
		},
	};
}

module.exports = { createAccount };
