import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const PRESET_TIPS = [10, 15, 20];

const TipSelector = ({ tip, setTip }) => {
  const [customTip, setCustomTip] = React.useState('');
  const handleCustomTipChange = text => {
    const val = parseInt(text, 10);
    setCustomTip(text);
    if (!isNaN(val)) {
      setTip(val);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tip Percentage</Text>
      <View style={styles.row}>
        {PRESET_TIPS.map(val => (
          <TouchableOpacity
            key={val}
            style={[
              styles.tipButton,
              tip === val && styles.selectedTipButton
            ]}
            onPress={() => {
              setTip(val);
              setCustomTip('');
            }}
          >
            <Text style={[
              styles.tipText,
              tip === val && styles.selectedTipText
            ]}>{val}%</Text>
          </TouchableOpacity>
        ))}
        <TextInput
          style={styles.customInput}
          placeholder="Other"
          keyboardType="numeric"
          value={customTip}
          onChangeText={handleCustomTipChange}
          onFocus={() => setTip(0)}
          maxLength={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#326273',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e7f3f9',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedTipButton: {
    backgroundColor: '#326273',
  },
  tipText: {
    fontSize: 16,
    color: '#326273',
  },
  selectedTipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customInput: {
    height: 44,
    width: 60,
    borderWidth: 1,
    borderColor: '#d1e3ea',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fafdff',
    textAlign: 'center'
  },
});

export default TipSelector;