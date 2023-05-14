import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavoritePokemonCard from "../FavoritePokemonCard";

const Favorites = () => {
  const [searchInput, setSearchInput] = useState("");

  const favorites = useSelector((state) => state.favorites);
  const pokemonData = useSelector((state) => state.pokemon);

  const filteredPokemon = pokemonData.filter((pokemon) =>
    favorites.includes(pokemon.id)
  );

  return (
    <div>
      <div className="header">
        <h1>POKEDEX</h1>
        <Link to="/">
          <Button variant="outlined">Home</Button>
        </Link>
        <h2>My Favorites</h2>
      </div>
      <FavoritePokemonCard pokemon={pokemonData} />
      {/* {favorites.length > 0 ? (
        favorites.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <button>⭐</button>

            <h2 key={`title-${pokemon.id}`}>{pokemon.id}</h2>
            <img
              key={`image-${pokemon.id}`}
              src={pokemon.sprites && pokemon.sprites.front_default}
              alt=""
            />
            <h2>{pokemon.name}</h2>
          </div>
        ))
      ) : (
        <p>No favorite Pokemon yet.</p>
      )} */}
    </div>
  );
};

export default Favorites;
