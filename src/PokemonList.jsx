import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20); // Número de Pokémon por página

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, [offset, limit]);

  const handleNextPage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePrevPage = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <Link to={`/pokemon/${index + offset + 1}`} key={index} className="pokemon-card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1}.png`} alt={pokemon.name} />
            <div className="pokemon-name">{pokemon.name}</div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={offset === 0}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
