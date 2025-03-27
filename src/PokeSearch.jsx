// PokeSearch.js
import React, { useState } from 'react';
import './PokeSearch.css';
import PokemonDisplay from './PokemonDisplay'; // Import the new component
import 'bootstrap/dist/css/bootstrap.min.css';

function PokeSearch() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setPokemonName(event.target.value);
    };

    const handleSearch = async () => {
        if (!pokemonName.trim()) {
            setError('Inserisci un nome di Pokémon valido');
            return;
        }
        setIsLoading(true);
        setError(null);
        setPokemonData(null);

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon non trovato');
            }
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setPokemonName('');
        setPokemonData(null);
        setError(null);
    };

    return (
        <div className="container">
            <div className="row">
                {/* First Column: Search Box */}
                <div className="col-md-4 mt-3 search-box gap-2">
                    <div className="">
                        <div className="">
                            <input
                                type="text"
                                value={pokemonName}
                                onChange={handleInputChange}
                                placeholder="Cerca Pokémon"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <button onClick={handleSearch} className="btn btn-primary" style={{ "padding": "5px" }}>
                            Cerca
                        </button>
                        <button onClick={handleClear} className="btn btn-danger" style={{ "padding": "5px" }}>
                            Elimina
                        </button>
                    </div>
                </div>

                {/* Second Column: Pokémon Image and Info */}
                <PokemonDisplay
                    pokemonData={pokemonData}
                    isLoading={isLoading}
                    error={error}
                />

                {/* Third Column: Pokémon Information */}
                <div className="col-md-4 additional-info">
                    {pokemonData && (
                        <div className="text-box ">
                            <h5>Tipo: {pokemonData.types.map(type => type.type.name).join(', ')}</h5>
                            <h5>Altezza: {pokemonData.height / 10} m</h5> {/* Altezza in metri */}
                            <h5>Peso: {pokemonData.weight / 10} kg</h5> {/* Peso in chilogrammi */}
                        </div>
                    )}
                    {!isLoading && !pokemonData && !error
                    }
                </div>
            </div>
        </div>
    );
}

export default PokeSearch;
