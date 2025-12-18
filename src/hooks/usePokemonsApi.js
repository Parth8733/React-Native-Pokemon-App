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
      if (response.data && response.data.results && Array.isArray(response.data.results)) {
        let pokemons = response.data.results;
        //Fetching details for pokemons
        await Promise.all(
          pokemons.map(async (pokemon) => {
            // Security: Validate pokemon object has required properties
            if (!pokemon || !pokemon.name) {
              return;
            }
            let pokemonDetails = await pokeApi.get(`/pokemon/${pokemon.name}`);
            // Security: Validate response structure before accessing nested properties
            if (!pokemonDetails.data || !pokemonDetails.data.types || !pokemonDetails.data.sprites) {
              return;
            }
            let pokemonTypes = [];
            pokemonDetails.data.types.forEach((type) => {
              if (type && type.type && type.type.name) {
                pokemonTypes.push(type.type.name);
              }
            });
            let pokemonInfo = {
              name: pokemon.name,
              types: pokemonTypes,
              image_url: pokemonDetails.data.sprites.front_default || '',
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
      // Security: Avoid logging error details that may contain sensitive information
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
