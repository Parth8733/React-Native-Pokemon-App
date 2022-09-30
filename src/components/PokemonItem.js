import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React from "react";

export default function PokemonItem({ pokemon }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: pokemon.image }} />
      <View style={styles.pokemonInfo}>
        <Text style={styles.header}>{pokemon.name}</Text>
        <View style={styles.typeContainer}>
          {pokemon.type.map((type, index) => {
            return (
              <Text key={type}>{index !== 0 ? `, ${type}` : `${type}`}</Text>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Pockemon Caught",
            `${pokemon.name} is successfully added to the Pokemon Bag`
          );
        }}
      >
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </View>
      </TouchableOpacity>
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
  addButtonText:{ padding: 10 }
});
