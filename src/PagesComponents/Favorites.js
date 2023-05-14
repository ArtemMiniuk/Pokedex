import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import FavoritePokemonCard from "../PokemonsCardsComponents/FavoritePokemonCard";

const Favorites = () => {
  const pokemonData = useSelector((state) => state.pokemon);

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
    </div>
  );
};

export default Favorites;
