import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Empty = ({ displayDataType }) => {
  return (
    <View style={styles.container}>
      {displayDataType === "database" ? <Text>Looks like you haven't caught anything yet</Text> : null}
    </View>
  );
};
export default Empty;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
