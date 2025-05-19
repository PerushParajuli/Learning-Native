
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Counter</Text>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.decrement]}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.increment]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#0A5CDE"
  },
  counter: {
    fontSize: 56,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#222"
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    backgroundColor: "#0A5CDE",
  },
  increment: { backgroundColor: "#37cc44" },
  decrement: { backgroundColor: "#ff5656" },
  buttonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  }
});
