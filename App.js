import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import Home from "./src/components/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
