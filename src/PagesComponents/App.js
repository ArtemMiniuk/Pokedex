import "../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonCard from "../PokemonsCardsComponents/PokemonCard";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { connect } from "react-redux";

import {
  fetchPokemonDataSuccess,
  fetchPokemonDataFailure,
} from "../Redux/actions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  margin: 20,
  width: "300px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#f0f0f0",
  },
});

const mapStateToProps = (state) => {
  return {
    pokemonData: state.pokemon,
    // loading: state.loading,
  };
};

const App = connect(mapStateToProps)(ConnectedApp);

function ConnectedApp({ pokemonData }) {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const getPokemon = async (res) => {
    if (res) {
      console.log(res);
      try {
        const promises = res.map(async (item) => {
          const result = await axios.get(item.url);
          return result.data;
        });
        const pokemon = await Promise.all(promises);
        dispatch(fetchPokemonDataSuccess(pokemon));
      } catch (error) {
        dispatch(fetchPokemonDataFailure(error.message));
      }
    }
  };

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      getPokemon(res.data.results);
    } catch (error) {
      dispatch(fetchPokemonDataFailure(error.message));
    }
    setLoading(false);
  };

  useEffect(() => {
    pokeFun();
  }, []);

  const [selectedTag, setSelectedTag] = useState("all");

  const handleChange = (event, newSelectTag) => {
    setSelectedTag(newSelectTag);
  };

  return (
    <div>
      <div className="header">
        <h1>POKEDEX</h1>
        <Link to="/favorites">
          <Button variant="outlined">Favorites⭐</Button>
        </Link>
        <div className="searchSection">
          <div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              ></StyledInputBase>
            </Search>
          </div>
          <div>
            <ToggleButtonGroup
              color="primary"
              value={selectedTag}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton id="grass" value="grass">
                #grass
              </ToggleButton>
              <ToggleButton id="fire" value="fire">
                #fire
              </ToggleButton>
              <ToggleButton id="water" value="water">
                #water
              </ToggleButton>
              <ToggleButton id="bug" value="bug">
                #bug
              </ToggleButton>
              <ToggleButton id="normal" value="normal">
                #normal
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
      <div>
        <PokemonCard
          selectedTag={selectedTag}
          searchInput={searchInput}
          pokemon={pokemonData}
          loading={loading}
        ></PokemonCard>
      </div>
    </div>
  );
}

export default App;
