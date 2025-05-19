
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const BillInput = ({ bill, setBill }) => (
  <View style={styles.container}>
    <Text style={styles.label}>Bill Amount</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter bill amount"
      keyboardType="numeric"
      value={bill}
      onChangeText={setBill}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#326273',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#d1e3ea',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafdff',
  },
});

export default BillInput;
