/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		const newNode = new Node(val);
		if (this.head === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		const newNode = new Node(val);
		newNode.next = this.head;
		this.head = newNode;
	}

	/** pop(): return & remove last item. */

	pop() {
		let current = this.head;
		while (current.next.next !== null) {
			current = current.next;
		}
		const returnHolder = current.next;
		current.next = null;
		this.tail = current;
		return returnHolder;
	}

	/** shift(): return & remove first item. */

	shift() {
		const returnHolder = this.head;
		this.head = this.head.next;
		return returnHolder;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		let current = this.head;
		let idxHolder = 0;

		while (current !== null && idxHolder < idx) {
			current = current.next;
			idxHolder++;
		}
		if (idxHolder === idx) {
			return current;
		}

		return false;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		let current = this.head;
		let idxHolder = 0;

		if (idx === 0) {
			this.head.val = val;
			return this.head;
		}

		while (current.next !== null && idxHolder < idx) {
			current = current.next;
			idxHolder++;
		}

		if (current.next === null && idxHolder + 1 === idx) {
			this.push(val);
			return this.tail;
		}

		if (idxHolder === idx) {
			current.val = val;
			return current;
		}

		return new Error('index does not exist');
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		let current = this.head;
		let idxHolder = 0;

		if (idx === 0) {
			this.head.val = val;
			return this.head;
		}

		while (current.next !== null && idxHolder < idx - 1) {
			current = current.next;
			idxHolder++;
		}

		if (current.next === null && idxHolder + 1 === idx) {
			this.push(val);
			return this.tail;
		}

		if (idxHolder === idx - 1) {
			const newNode = new Node(val);
			newNode.next = current.next;
			current.next = newNode;

			return newNode;
		}

		return new Error('index does not exist');
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		let current = this.head;
		let idxHolder = 0;

		if (idx === 0) {
			this.shift();
		}

		while (current.next !== null && idxHolder < idx - 1) {
			current = current.next;
			idxHolder++;
		}

		if (idxHolder === idx - 1) {
			let returnHolder = current.next;
			current.next = current.next.next;
			return returnHolder;
		}

		return new Error('index does not exist');
	}

	/** average(): return an average of all values in the list */

	average() {}
}

let test = new LinkedList();
test.push(1);
test.push(2);
test.push(3);

module.exports = LinkedList;
