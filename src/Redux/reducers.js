const initialState = {
  favorites: [],
  pokemon: [], // изменено значение на пустой массив
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "TOGGLE_FAVORITE":
    //   const itemId = action.payload;
    //   const isItemFavorite = state.favorites.includes(itemId);
    //   if (isItemFavorite) {
    //     return {
    //       ...state,
    //       favorites: state.favorites.filter((id) => id !== itemId),
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       favorites: [...state.favorites, itemId],
    //     };
    //   }
    // case "TOGGLE_FAVORITE":
    //   const { payload } = action;
    //   const isFavorite = state.favorites.some((item) => item.id === payload.id);
    //   if (isFavorite) {
    //     const updatedFavorites = state.favorites.filter(
    //       (item) => item.id !== payload.id
    //     );
    //     return { ...state, favorites: updatedFavorites };
    //   } else {
    //     return { ...state, favorites: [...state.favorites, payload] };
    //   }
    case "TOGGLE_FAVORITE":
      const { payload } = action;
      const isFavorite = state.favorites.some((item) => item.id === payload.id);
      if (isFavorite) {
        const updatedFavorites = state.favorites.filter(
          (item) => item.id !== payload.id
        );
        return { ...state, favorites: updatedFavorites };
      } else {
        return { ...state, favorites: [...state.favorites, payload] };
      }
    case "FETCH_POKEMON_DATA_SUCCESS":
      const pokemonData = action.payload;
      return {
        ...state,
        pokemon: pokemonData.flat(),
        error: null,
      };
    case "FETCH_POKEMON_DATA_FAILURE":
      return {
        ...state,
        pokemon: [], // сбрасываем данные о покемонах в пустой массив
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
