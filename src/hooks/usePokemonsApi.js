import { useState } from "react";
import pokeApi from "../api/pokeApi";

export default () => {
    //initial state for query
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
   //fetching 20 Pokemons details
  const searchPokemons = async () => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });
    try {
      let pokemonData = [];
      //Finding pokemons 
      const response = await pokeApi.get("/pokemon?limit=20&offset=0");
      //checking if data is exists
      if (response.data.results) {
        let pokemons = response.data.results;
        //Fetching details for pokemons
        await Promise.all(
          pokemons.map(async (pokemon) => {
            let pokemonDetails = await pokeApi.get(`/pokemon/${pokemon.name}`);
            let pokemonTypes = [];
            await pokemonDetails.data.types.map((type) => {
              pokemonTypes.push(type.type.name);
            });
            let pokemonInfo = {
              name: pokemon.name,
              types: pokemonTypes,
              image_url: pokemonDetails.data.sprites.front_default,
            };
            //storing details of pokemon
            pokemonData.push(pokemonInfo);
          })
        );
      }
      setResults({
        data: pokemonData,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setResults({
        data: null,
        loading: false,
        error: "Something went wrong",
      });
    }
  };
  //returing data and function
  return [results, searchPokemons];
};
