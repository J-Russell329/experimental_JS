class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses iteration. */

	insert(val) {
		const newNode = new Node(val);
		if (this.root === null) {
			this.root = newNode;
			return 1;
		}
		let node = this.root;

		restartLoop: while (node.val !== null) {
			if (val < node.val) {
				if (node.left === null) {
					node.left = newNode;
					break;
				} else {
					node = node.left;
					continue restartLoop;
				}
			} else if (val > node.val) {
				if (node.right === null) {
					node.right = newNode;
					break;
				} else {
					node = node.right;
					continue restartLoop;
				}
			}
			break;
		}
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses recursion. */

	insertRecursively(val) {
		const newNode = new Node(val);
		if (this.root === null) {
			this.root = newNode;
			return 1;
		}
		let node = this.root;

		function insertLoop(curNode, val, newNode) {
			if (val < curNode.val) {
				curNode.left === null
					? (curNode.left = newNode)
					: insertLoop(curNode.left, val, newNode);
			} else if (val > curNode.val) {
				curNode.right === null
					? (curNode.right = newNode)
					: insertLoop(curNode.right, val, newNode);
			}
		}
		insertLoop(node, val, newNode);
	}

	/** find(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		if (this.root === null) {
			return undefined;
		}
		let node = this.root;

		try {
			restartLoop: while (node.val !== null) {
				if (val === node.val) {
					return node;
				} else if (val < node.val) {
					node = node.left;
					continue restartLoop;
				} else if (val > node.val) {
					node = node.right;
					continue restartLoop;
				}
			}
		} catch {
			return undefined;
		}
	}

	/** findRecursively(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val) {
		if (this.root === null) {
			return undefined;
		}
		let node = this.root;

		function findLoop(curNode, val) {
			if (curNode === null) {
				return undefined;
			}

			if (val === curNode.val) {
				return curNode;
			} else if (val < curNode.val) {
				return findLoop(curNode.left, val);
			} else if (val > curNode.val) {
				return findLoop(curNode.right, val);
			}
		}
		return findLoop(node, val);
	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
	 * Return an array of visited nodes. */

	dfsPreOrder(initNode = this.root) {
		let tempArr = [];
		if (!this.root) return tempArr;

		function nextNode(node) {
			tempArr.push(node.val);
			if (node.left !== null) {
				nextNode(node.left);
			}
			if (node.right !== null) {
				nextNode(node.right);
			}
			return;
		}
		nextNode(initNode);
		return tempArr;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
	 * Return an array of visited nodes. */

	dfsInOrder(initNode = this.root) {
		let tempArr = [];
		if (!this.root) return tempArr;

		function nextNode(node) {
			if (node.left !== null) {
				nextNode(node.left);
			}
			tempArr.push(node.val);
			if (node.right !== null) {
				nextNode(node.right);
			}
			return;
		}
		nextNode(initNode);
		return tempArr;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
	 * Return an array of visited nodes. */

	dfsPostOrder(initNode = this.root) {
		let tempArr = [];
		if (!this.root) return tempArr;

		function nextNode(node) {
			if (node.left !== null) {
				nextNode(node.left);
			}
			if (node.right !== null) {
				nextNode(node.right);
			}
			tempArr.push(node.val);
			return;
		}
		nextNode(initNode);
		return tempArr;
	}

	/** bfs(): Traverse the array using BFS.
	 * Return an array of visited nodes. */

	bfs(initNode = this.root) {
		let tempArr = [];
		if (!this.root) return tempArr;

		let queue = new Queue();
		queue.enqueue(initNode);

		while (!queue.isEmpty()) {
			tempArr.push(queue.first.val.val);
			if (queue.first.val.left) queue.enqueue(queue.first.val.left);
			if (queue.first.val.right) queue.enqueue(queue.first.val.right);
			queue.dequeue();
		}

		return tempArr;
	}

	/** Further Study!
	 * remove(val): Removes a node in the BST with the value val.
	 * Returns the removed node. */

	remove(val) {}

	/** Further Study!
	 * isBalanced(): Returns true if the BST is balanced, false otherwise. */

	isBalanced() {}

	/** Further Study!
	 * findSecondHighest(): Find the second highest value in the BST, if it exists.
	 * Otherwise return undefined. */

	findSecondHighest() {}
}

let test = new BinarySearchTree();
test.insert(15);
test.insert(20);
test.insert(10);
test.insert(12);
test.insert(1);
test.insert(5);
test.insert(50);

class QueueNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
	constructor() {
		this.first = null;
		this.last = null;
		this.size = 0;
	}

	/** enqueue(val): add new value to end of the queue. Returns undefined. */

	enqueue(val) {
		const newNode = new QueueNode(val);
		if (this.isEmpty()) {
			this.first = newNode;
			this.last = newNode;
		} else {
			this.last.next = newNode;
			this.last = newNode;
		}
		this.size++;
		return undefined;
	}

	/** dequeue(): remove the node from the start of the queue
	 * and return its value. Should throw an error if the queue is empty. */

	dequeue() {
		if (this.isEmpty()) {
			return error('Queue is empty');
		}
		let returnVal = this.first.val;
		this.first = this.first.next;
		this.size--;
		return returnVal;
	}

	/** peek(): return the value of the first node in the queue. */

	peek() {
		return this.first.val;
	}

	/** isEmpty(): return true if the queue is empty, otherwise false */

	isEmpty() {
		return this.size === 0;
	}
}

module.exports = BinarySearchTree;
