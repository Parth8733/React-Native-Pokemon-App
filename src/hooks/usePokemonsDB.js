import { useState } from "react";
import pokemonApi from "../api/pokemonApi";

export default () => {
  //initial state for query
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
  //Finding All Pokemons
  const searchPokemonsFromDB = async () => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await pokemonApi.get("/pokemon/");
      // Security: Validate response data is an array before using
      const data = response.data && Array.isArray(response.data) ? response.data : [];
      setResults({
        data: data,
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
return [results, searchPokemonsFromDB];
};
