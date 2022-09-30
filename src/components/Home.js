import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import usePokemonsApi from "../hooks/usePokemonsApi";
import PokemonItem from "./PokemonItem";

export default function Home() {
  const [{ data, loading, error }, searchPokemons] = usePokemonsApi();
  useEffect(() => {
    searchPokemons();
  }, []);
  if (loading) {
    return <ActivityIndicator size={"large"} marginVertical={150} />;
  }
  if (error) {
    return <Text style={styles.header}>{error}</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.bagContainer}>
        <TouchableOpacity
          onPress={() => {
            alert("Displaying Data from Database");
          }}
        >
          <View style={styles.bagButton}>
            <Text style={styles.bagButtonText}>Pokémons Bag</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.pokemonListContainer}>
        <FlatList
          data={data}
          keyExtractor={(pokemon) => pokemon.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
           <PokemonItem pokemon={item} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bagContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  bagButton: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: "40",
    marginRight: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  bagButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  pokemonListContainer: { flex: 4, marginHorizontal: 25 }
});
