import { useState } from "react";
import pokemonApi from "../api/pokemonApi";

export default () => {
  //Intia state for create query
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
  /**
   * adding pokemon to database
   * param: pokemon {name:string,types:array, image_url:string}
   * return: newPokemon object
   */
  const addPokemon = async (pokemon) => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });
    try {
      // Security: Validate input before sending to API
      if (!pokemon || !pokemon.name || !Array.isArray(pokemon.types)) {
        throw new Error("Invalid pokemon data");
      }
      const response = await pokemonApi.post("/pokemon/create",{
            name: pokemon.name,
            types:pokemon.types,
            image_url: pokemon.image_url || '',
      });
      setResults({
        data: response.data ? response.data : [],
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
return [results, addPokemon];
};
