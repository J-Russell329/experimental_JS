submitBTN = document.querySelector('#submit-cupcake');

function posting() {
	console.log('posting.........');
}

async function createCupcake() {
	posting();
	flavor = document.querySelector('#flavor').value;
	size = document.querySelector('#size').value;
	rating = document.querySelector('#rating').value;
	image = document.querySelector('#image').value;
	if (image === '') {
		image = 'https://tinyurl.com/demo-cupcake';
	} else {
	}

	json = JSON.stringify({
		flavor: flavor,
		size: size,
		rating: 5,
		image: image,
	});
	const res = await axios.post('/api/cupcakes', json, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	getCupcakes();
}

async function getCupcakes() {
	cupcakeView = document.querySelector('#cupcake-view');
	const res = await axios.get('api/cupcakes');
	cupcakeView.innerHTML = '';
	const cupcakes = res.data.cupcakes;
	for (let index in res.data.cupcakes) {
		headDIV = document.createElement('div');
		headDIV.setAttribute('class', 'head-div');

		flavorDIV = document.createElement('div');
		sizeDIV = document.createElement('div');
		ratingDIV = document.createElement('div');
		imageDIV = document.createElement('div');

		flavor = document.createElement('h2');
		flavor.append(`Flavor: ${cupcakes[index].flavor}`);
		flavorDIV.append(flavor);

		size = document.createElement('p');
		size.append(`Size: ${cupcakes[index].size}`);
		flavorDIV.append(size);

		rating = document.createElement('p');
		rating.append(`Rating: ${cupcakes[index].rating}`);
		flavorDIV.append(rating);

		image = document.createElement('img');
		image.setAttribute('src', cupcakes[index].image);
		imageDIV.append(image);

		headDIV.append(flavorDIV);
		headDIV.append(sizeDIV);
		headDIV.append(ratingDIV);
		headDIV.append(imageDIV);

		cupcakeView.prepend(headDIV);
	}
}

submitBTN.addEventListener('click', createCupcake);

document.addEventListener('load', getCupcakes());
