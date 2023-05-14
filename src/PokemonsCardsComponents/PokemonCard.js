import React from "react";
import { useEffect, useState } from "react";
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

const PokemonCard = ({ searchInput, loading, selectedTag, pokemon }) => {
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

  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const filterFunctions = {
    grass: (pokemon) => pokemon.types[0].type.name === "grass",
    fire: (pokemon) => pokemon.types[0].type.name === "fire",
    water: (pokemon) => pokemon.types[0].type.name === "water",
    bug: (pokemon) => pokemon.types[0].type.name === "bug",
    normal: (pokemon) => pokemon.types[0].type.name === "normal",
  };
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    let filteredData = pokemon;
    if (pokemon && Array.isArray(pokemon)) {
      filteredData = pokemon;
    }
    if (selectedTag && filterFunctions[selectedTag]) {
      filteredData = filteredData.filter(filterFunctions[selectedTag]);
    }
    if (searchInput !== "") {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setFilteredPokemon(filteredData);
  }, [selectedTag, searchInput, pokemon]);

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
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          filteredPokemon.map((item) => {
            // const isFavorite = favorites.includes(item);
            const isFavorite = favorites.some((f) => f.id === item.id);

            return (
              <>
                <div
                  className="card"
                  key={item.id}
                  onClick={() => openPokeInfo(item)}
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddFavorite(item);
                    }}
                  >
                    {isFavorite ? "⭐" : "✩"}
                  </button>

                  <h2 key={`title-${item.id}`}>{item.id}</h2>
                  <img
                    key={`image-${item.id}`}
                    src={item.sprites && item.sprites.front_default}
                    alt=""
                  />
                  <h2>{item.name}</h2>
                  <h2>
                    Type:&nbsp;
                    {item.types && item.types.length > 0 && (
                      <span style={{ color: getColorForTags(item) }}>
                        {item.types[0].type.name}
                      </span>
                    )}
                  </h2>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default PokemonCard;
