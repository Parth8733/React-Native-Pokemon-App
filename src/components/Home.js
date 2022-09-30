import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import usePokemonsApi from "../hooks/usePokemonsApi";
import PokemonItem from "./PokemonItem";
import Empty from "./Empty";
import usePokemonsDB from "../hooks/usePokemonsDB";

export default function Home() {
  const [displayDataType, setDisplayDataType] = useState("api");
  const [{ data, loading, error }, searchPokemons] = usePokemonsApi();
  const [
    { data: dbData, loading: dbLoading, error: dbError },
    searchPokemonsFromDB,
  ] = usePokemonsDB();
  useEffect(() => {
    if (displayDataType === "api") {
      searchPokemons();
    } else {
      searchPokemonsFromDB();
    }
  }, [displayDataType]);
  if (loading || dbLoading) {
    return <ActivityIndicator size={"large"} marginVertical={150} />;
  }
  if (error || dbError) {
    return <Text style={styles.header}>{error}</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.bagContainer}>
        <TouchableOpacity
          onPress={() => {
            if (displayDataType === "api") setDisplayDataType("database");
            else setDisplayDataType("api");
          }}
        >
          <View style={styles.bagButton}>
            <Text style={styles.bagButtonText}>
              {displayDataType === "api" ? "Pokémons Bag" : "Search Pokémons"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.pokemonListContainer}>
        <FlatList
          data={displayDataType === "api" ? data : dbData}
          ListEmptyComponent={() => (
            <Empty
              displayDataType={displayDataType}
              setDisplayDataType={setDisplayDataType}
            />
          )}
          keyExtractor={(pokemon) => pokemon.name}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PokemonItem pokemon={item} displayDataType={displayDataType} />
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
  pokemonListContainer: { flex: 4, marginHorizontal: 25 },
});
