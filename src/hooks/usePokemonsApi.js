import { useState } from "react";
import pokeApi from "../api/pokeApi"

export default () => {
  const [results, setResults] = useState({
    data: null,
    loading: false,
    error: null,
  });
  const searchPokemons = async () => {
    setResults({
      data: null,
      loading: true,
      error: null,
    });
    try {
      let pokemonData=[];
      const response = await pokeApi.get("/pokemon?limit=20&offset=0");
      if(response.data.results){
        let pokemons = response.data.results;
        await Promise.all(pokemons.map(async(pokemon) => {
         let pokemonDetails = await pokeApi.get(`/pokemon/${pokemon.name}`);
         let pokemonTypes= [];
        await pokemonDetails.data.types.map((type)=>{
            pokemonTypes.push(type.type.name);
         })
         let pokemonInfo = {
            name:pokemon.name,
            type:pokemonTypes,
            image:pokemonDetails.data.sprites.front_default,
         }
         pokemonData.push(pokemonInfo);
        }))
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
return [results, searchPokemons];
};
