
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TipResult = ({ bill, tip, tipAmount, total }) => {
  if (!bill) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Tip ({tip}%): </Text>
        <Text style={styles.value}>${tipAmount.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total: </Text>
        <Text style={[styles.value, styles.total]}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f4fcfc',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1e3ea',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: 200,
  },
  label: {
    fontSize: 17,
    color: '#326273',
    fontWeight: '600'
  },
  value: {
    fontSize: 17,
    color: '#326273',
  },
  total: {
    color: '#21756a',
    fontWeight: 'bold',
    fontSize: 19
  }
});

export default TipResult;
