import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import BillInput from './components/BillInput';
import TipSelector from './components/TipSelector';
import TipResult from './components/TipResult';

export default function App() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(15);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tip / 100);
  const total = billNum + tipAmount;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Tips Calculator</Text>
      <View style={styles.card}>
        <BillInput bill={bill} setBill={setBill} />
        <TipSelector tip={tip} setTip={setTip} />
        <TipResult bill={billNum} tip={tip} tipAmount={tipAmount} total={total} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#326273'
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
});