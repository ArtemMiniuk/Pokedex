import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../Redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const FavoritePokemonCard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");
  const [pokemonImg, setPokemonImg] = useState();

  const openPokeInfo = async (res) => {
    setPokemonName(res.name);
    setPokemonHeight(res.height);
    setPokemonWeight(res.weight);
    setPokemonImg(res.sprites.front_default);
    handleOpen();
  };

  const getColorForTags = (res) => {
    if (res.types && res.types.length > 0) {
      if (res.types[0].type.name === "grass") {
        return "green";
      } else if (res.types[0].type.name === "fire") {
        return "red";
      } else if (res.types[0].type.name === "water") {
        return "blue";
      } else if (res.types[0].type.name === "bug") {
        return "brown";
      } else if (res.types[0].type.name === "normal") {
        return "black";
      }
    }
  };

  const favorites = useSelector((state) => state.favorites);

  const handleAddFavorite = (item) => {
    dispatch(toggleFavorite(item));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {pokemonName}
          </Typography>
          <img src={pokemonImg} alt="pokemon"></img>
          <p>Weight : {pokemonWeight}</p>
          <p>Height : {pokemonHeight}</p>
        </Box>
      </Modal>

      <div className="card-row">
        {favorites.length > 0 ? (
          favorites.map((pokemon) => (
            <div
              className="card"
              key={pokemon.id}
              onClick={() => openPokeInfo(pokemon)}
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddFavorite(pokemon);
                }}
              >
                ⭐
              </button>

              <h2 key={`title-${pokemon.id}`}>{pokemon.id}</h2>
              <img
                key={`image-${pokemon.id}`}
                src={pokemon.sprites && pokemon.sprites.front_default}
                alt=""
              />
              <h2>{pokemon.name}</h2>
              <h2>
                Type:&nbsp;
                {pokemon.types && pokemon.types.length > 0 && (
                  <span style={{ color: getColorForTags(pokemon) }}>
                    {pokemon.types[0].type.name}
                  </span>
                )}
              </h2>
            </div>
          ))
        ) : (
          <p>No favorite Pokemon yet.</p>
        )}
      </div>
    </>
  );
};

export default FavoritePokemonCard;
