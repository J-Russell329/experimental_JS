function PokemonData(pokemon) {
	console.log(pokemon);
	const { id, name, type, base_experience } = pokemon.pokemon;
	const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
	// console.log(id);
	return (
		<div className="col-4 border">
			<header className="display-4">{name}</header>
			<img className="img-thumbnail" src={image}></img>
			<p>type: {type}</p>
			<p>EXP: {base_experience}</p>
		</div>
	);
}

export default PokemonData;
