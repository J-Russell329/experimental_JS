class Vehicle {
	constructor(make, model, year) {
		this.make = make;
		this.model = model;
		this.year = year;
	}
	honk() {
		return 'Beep!';
	}
	toString() {
		return `the vehicle is a ${this.make} ${this.model} from ${this.year}.`;
	}
}

class Car extends Vehicle {
	constructor(make, model, year) {
		super(make, model, year);
		this.numWheels = 4;
	}
}

class Motorcycle extends Vehicle {
	constructor(make, model, year) {
		super(make, model, year);
		this.numWheels = 2;
	}
	revEngine() {
		return `VROOM!!!`;
	}
}

class Garage {
	constructor(capacity) {
		this.capacity = capacity;
		this.vehicles = [];
	}
	add(classObj) {
		if (this.vehicles.length !== this.capacity) {
			this.vehicles.push(classObj);
		} else return 'Were Full!!!';
	}
}
