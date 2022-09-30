import { useState } from "react";
import pokemonApi from "../api/pokemonApi";

export default () => {
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const searchPokemonsFromDB = async () => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await pokemonApi.get("/pokemon/");
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
return [results, searchPokemonsFromDB];
};
