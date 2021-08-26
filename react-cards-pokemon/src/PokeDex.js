import React, { useState } from 'react';
// import { v4 as uuid } from "uuid";
// import axios from "axios";
import PokemonSelect from './PokemonSelect';
import PokemonCard from './PokemonCard';
import './PokeDex.css';
import { useAxios } from './hooks';

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
	const [pokemon, getPokemon] = useAxios('');

	return (
		<div className="PokeDex">
			<div className="PokeDex-buttons">
				<h3>Please select your pokemon:</h3>
				<PokemonSelect add={getPokemon} />
			</div>
			<div className="PokeDex-card-area">
				{pokemon.map((cardData) => (
					<PokemonCard
						key={cardData.id}
						front={cardData.front}
						back={cardData.back}
						name={cardData.name}
						stats={cardData.stats.map((stat) => ({
							value: stat.base_stat,
							name: stat.stat.name,
						}))}
					/>
				))}
			</div>
		</div>
	);
}

export default PokeDex;
