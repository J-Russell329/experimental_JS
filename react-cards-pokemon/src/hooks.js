import axios from 'axios';
import uuid from 'uuid';
import React, { useState } from 'react';

function useFlip(init) {
	const [state, setState] = useState(init);
	const flip = () => setState((state) => !state);
	return [state, flip];
}

function useAxios(site) {
	const [state, setState] = useState([]);
	let url;
	async function getResponse(name = '') {
		site === 'deck'
			? (url = 'https://deckofcardsapi.com/api/deck/new/draw/')
			: (url = `https://pokeapi.co/api/v2/pokemon/${name}/`);
		const response = await axios.get(url);
		if (site === 'deck') {
			setState([
				...state,
				{ id: uuid(), image: response.data.cards[0].image },
			]);
		} else {
			setState([
				...state,
				{
					id: uuid(),
					front: response.data.sprites.front_default,
					back: response.data.sprites.back_default,
					name: response.data.name,
					stats: response.data.stats,
				},
			]);
		}
	}
	return [state, getResponse];
}

export { useFlip, useAxios };
