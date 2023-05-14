// export const toggleFavorite = (itemId) => {
//   return {
//     type: "TOGGLE_FAVORITE",
//     payload: itemId,
//   };
// };

export const toggleFavorite = (item) => {
  return {
    type: "TOGGLE_FAVORITE",
    payload: item,
  };
};

export const fetchPokemonDataSuccess = (pokemonData) => {
  return {
    type: "FETCH_POKEMON_DATA_SUCCESS",
    payload: pokemonData,
  };
};

export const fetchPokemonDataFailure = (error) => {
  return {
    type: "FETCH_POKEMON_DATA_FAILURE",
    payload: error,
  };
};
