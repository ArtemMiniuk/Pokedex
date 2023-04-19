import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./PokemonCard";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [searchInput, setSearchInput] = useState("");

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    if (res) {
      console.log(res);
      res.map(async (item) => {
        const result = await axios.get(item.url);
        setPokemonData((state) => {
          state = [...state, result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      });
    }
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
        <Card
          selectedTag={selectedTag}
          searchInput={searchInput}
          pokemon={pokemonData}
          loading={loading}
        ></Card>
      </div>
    </div>
  );
}

export default App;
