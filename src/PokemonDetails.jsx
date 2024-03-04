import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h2>{pokemonDetails.name}</h2>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>ID: {pokemonDetails.id}</p>
      <p>Types: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
      <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
};

export default PokemonDetails;

