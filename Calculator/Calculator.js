import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);

  const parseNum = (n) => (n === "" ? 0 : parseFloat(n));

  const handleOperation = (op) => {
    const a = parseNum(num1);
    const b = parseNum(num2);
    let res = null;
    switch (op) {
      case "+":
        res = a + b;
        break;
      case "-":
        res = a - b;
        break;
      case "×":
        res = a * b;
        break;
      case "÷":
        if (b === 0) {
          res = "Error";
        } else {
          res = a / b;
        }
        break;
      default:
        res = "";
    }
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation("+")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation("-")}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation("×")}>
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperation("÷")}>
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultLabel}>Result:</Text>
      <Text style={styles.result}>{result !== null ? result : "---"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#0077cc",
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#fafbfc"
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: "#3165ff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },
  resultLabel: {
    marginTop: 28,
    fontSize: 18,
    fontWeight: "500",
  },
  result: {
    fontSize: 22,
    color: "#228B22",
    marginTop: 6,
    fontWeight: "bold"
  }
});

export default Calculator;