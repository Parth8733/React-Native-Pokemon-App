import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Home() {
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
      <View style={{ flex: 4 }}></View>
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
  bagButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
