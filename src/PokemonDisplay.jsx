import React from 'react';

function PokemonDisplay({ pokemonData, isLoading, error }) {
    return (
        <div className="col-md-4 pokemon-box">
            {isLoading && <p>Caricamento...</p>}
            {error && <div className="error">{error}</div>}
            {pokemonData && (
                <div
                    className="img-box"
                    style={{
                        transition: "transform 0.3s",
                        cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                        style={{ width: "300px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default PokemonDisplay;
