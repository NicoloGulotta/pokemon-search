import React from 'react';
import './PokeSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRightToBracket, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

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

    const handleClean = async () => {
        setPokemonName('');
        setPokemonData(null);
    };

    return (
        <>
            <div className='search-box'>
                <input
                    type="text"
                    placeholder="...."
                    value={pokemonName}
                    onChange={handleInputChange}
                    className='search-input'
                />
                <button className="clean-button" onClick={handleClean}>
                    <FontAwesomeIcon icon={faSquareXmark} />                </button>
                <button className="search-button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <button className="catch-button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </button>
            </div>
            {pokemonData && (
                <>
                    <div className="img-box">
                        <img
                            src={pokemonData.sprites.front_default}
                            alt={pokemonData.name}
                            className='poke-img'
                        />
                    </div>
                    <div className="text-box">
                        <h5>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</h5>
                        <h5>Height: {pokemonData.height} m</h5>
                        <h5>Weight: {pokemonData.weight} kg</h5>
                    </div>
                </>
            )}
        </>
    );
}