import React from 'react';
import './PokeSearch.css'
export default function PokeSearch() {
    const [pokemonName, setPokemonName] = React.useState('');
    const [pokemonData, setPokemonData] = React.useState(null);

    const handleInputChange = (event) => {
        setPokemonName(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const hendleClean = async () => {
        setPokemonName("");
        setPokemonData(null);
    }
    return (
        <div className='poke-search-container'>
            <h1 className='title-pages'>Cerca il tuo pokemon preferito!</h1>
            <input type="text" placeholder="Inseriscipokemon" value={pokemonName} onChange={handleInputChange} />
            <button className="search-button" onClick={handleSearch}>Cerca</button>
            <button className="clean-button" onClick={hendleClean}>Pulisci</button>

            <div className='poke-box'>
                {pokemonData && (
                    <div>
                        <h4>{pokemonData.name}</h4>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                        <img src={pokemonData.sprites.back_default} alt={pokemonData.name} />
                        <h5>Type: {pokemonData.types.map(type => type.type.name).join(', ')}</h5>
                    </div>
                )}
            </div>
        </div>
    );
}