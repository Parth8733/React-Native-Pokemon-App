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
      const response = await pokemonApi.post("/pokemon/create",{
            name: pokemon.name,
            types:pokemon.types,
            image_url: pokemon.image_url,
      });
      setResults({
        data: response.data ? response.data : [],
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
return [results, addPokemon];
};
