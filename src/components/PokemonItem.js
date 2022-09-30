import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import createPokemon from "../hooks/createPokemon";

export default function PokemonItem({ pokemon, displayDataType }) {
  const [{ data, loading, error }, addPokemon] = createPokemon();
  const [isPokemonAdded, setIsPokemonAdded] = useState(false);

  console.log(pokemon);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: pokemon.image_url }} />
      <View style={styles.pokemonInfo}>
        <Text style={styles.header}>{pokemon.name}</Text>
        <View style={styles.typeContainer}>
          {pokemon.types.map((type, index) => {
            return (
              <Text key={index}>{index !== 0 ? `, ${type}` : `${type}`}</Text>
            );
          })}
        </View>
      </View>
      {displayDataType === "api" ? (
        <TouchableOpacity
          onPress={async () => {
            await addPokemon(pokemon);
            setIsPokemonAdded(true);
            Alert.alert(
              "Pockemon Caught",
              `${pokemon.name} is successfully added to the Pokemon Bag`
            );
          }}
          disabled={isPokemonAdded}
        >
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>
              {isPokemonAdded ? "Added" : "Add"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 100,
    alignSelf: "stretch",
    borderRadius: 50,
    marginVertical: 10,
    marginRight: 3,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 3,
    shadowOpacity: 0.1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: "rgba(200, 200, 200, 0.5)",
  },
  pokemonInfo: {
    flex: 1,
    paddingHorizontal: 5,
  },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  typeContainer: { flexDirection: "row" },
  addButton: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "rgba(200, 200, 200, 0.5)",
  },
  addButtonText: { padding: 10 },
});
