async function getGif(search) {
	const params = {
		api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
		q: search,
		limit: 1,
		offset: randomNumber(),
	};
	const gif = await axios.get('http://api.giphy.com/v1/gifs/search?', {
		params,
	});

	return gif.data.data[0] && gif.data.data[0].images.original.url;
}

function createimg() {
	return document.createElement('img');
}

function randomNumber() {
	return Math.floor(Math.random() * 500);
}
function imgReset() {
	document.querySelector('#gifsection').innerHTML = '';
}

async function appendimg(source) {
	const imgSection = document.querySelector('#gifsection');
	const image = document.createElement('img');
	image.src = source;
	imgSection.appendChild(image);
}

const form = document.querySelector('form');
form.addEventListener('click', async function (event) {
	event.preventDefault();
	const searchInput = document.querySelector('#search').value;
	if (event.target.id === 'submit' && searchInput !== '') {
		const imgSrc = await getGif(searchInput);
		if (imgSrc !== undefined) {
			appendimg(imgSrc);
		} else xalert('no gifs found');
	}
	if (event.target.id === 'resetbtn') {
		imgReset();
	}
});
