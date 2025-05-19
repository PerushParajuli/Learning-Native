
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';

// Safe calculator eval
function safeEval(expression) {
  try {
    // Only allow numbers, basic operators, dot, and parentheses
    const safeExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[\d+\-*/.() ]+$/.test(safeExpr)) {
      return 'Err';
    }
    // eslint-disable-next-line no-eval
    const val = eval(safeExpr);
    // Validation: eval may return undefined (e.g., empty string)
    if (val === undefined || val === null || Number.isNaN(val)) return 'Err';
    return val.toString();
  } catch (e) {
    return 'Err';
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);

  // Main grid for buttons
  const BUTTONS = [
    ['AC', '⌫', '(', ')'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  const handleTap = (value) => {
    if (value === 'AC') {
      setDisplay('');
    } else if (value === '⌫') {
      setDisplay(display.slice(0, -1));
    } else if (value === '=') {
      const result = safeEval(display);
      setHistory([{ expression: display, result }, ...history.slice(0, 9)]);
      setDisplay(result);
    } else {
      // Prevent sequential operators except '-' (to allow negatives)
      if (
        /[+\-×÷.]$/.test(display) &&
        /[+\-×÷.]/.test(value) &&
        (value !== '-' || /[+\-×÷.]$/.test(display)) // Allow negative sign at start or after operator
      ) {
        return; // Ignore invalid sequential operator
      }
      // Prevent multiple decimals in same number
      if (
        value === '.' &&
        /(\.\d*|\d+\.)$/.test(display.split(/[+\-×÷()]/).pop())
      ) {
        return;
      }
      setDisplay(display + value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display calculation history (vertical) */}
      {history.length > 0 && (
        <View style={styles.historyWrapper}>
          <ScrollView
            style={styles.history}
            contentContainerStyle={{ padding: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {history.map((item, idx) =>
              item.expression ? (
                <View key={idx} style={styles.historyItem}>
                  <Text style={styles.historyExpr}>{item.expression}</Text>
                  <Text style={styles.historyResult}>= {item.result}</Text>
                </View>
              ) : null
            )}
          </ScrollView>
        </View>
      )}

      {/* Calculator display */}
      <View style={styles.displayContainer}>
        <Text
          style={styles.displayText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {display || '0'}
        </Text>
      </View>

      {/* Calculator keypad */}
      <View style={styles.buttons}>
        {BUTTONS.map((row, rIdx) => (
          <View key={rIdx} style={styles.row}>
            {row.map((btn, bIdx) => (
              <TouchableOpacity
                key={bIdx}
                style={[
                  styles.button,
                  btn === '='
                    ? styles.equalsButton
                    : /[+\-×÷]/.test(btn)
                    ? styles.operatorButton
                    : /AC|⌫/.test(btn)
                    ? styles.controlButton
                    : styles.numberButton,
                  Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
                ]}
                onPress={() => handleTap(btn)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.buttonText,
                    btn === '='
                      ? styles.equalsText
                      : /[+\-×÷]/.test(btn)
                      ? styles.operatorText
                      : /AC|⌫/.test(btn)
                      ? styles.controlText
                      : styles.numberText,
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'flex-end',
    paddingTop: 0,
    width: '100%',
  },
  historyWrapper: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 0,
    marginTop: 18,
    marginBottom: 6,
    maxWidth: '100%',
    width: '100%',
    maxHeight: 110,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignSelf: 'stretch',
  },
  history: {
    maxHeight: 110,
    width: '100%',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 0.2,
    borderColor: '#444',
    opacity: 0.8,
  },
  historyExpr: {
    color: '#B0B0B0',
    fontSize: 15,
    flex: 3,
    fontWeight: '400',
  },
  historyResult: {
    color: '#00C6AD',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },
  displayContainer: {
    minHeight: 110,
    marginHorizontal: 0,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 22,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    width: '100%',
    alignSelf: 'stretch',
  },
  displayText: {
    color: '#fff',
    fontSize: 54,
    fontWeight: '400',
    textAlign: 'right',
    letterSpacing: 1,
  },
  buttons: {
    backgroundColor: '#23252B',
    padding: 12,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: 24,
    paddingTop: 18,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    width: '100%',
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 7,
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2D37',
    // Shadows added per platform below
    transform: [{ scale: 1 }],
    minWidth: 0,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  androidShadow: {
    elevation: 4,
  },
  numberButton: {
    backgroundColor: '#2A2D37',
  },
  operatorButton: {
    backgroundColor: '#FFD600',
  },
  controlButton: {
    backgroundColor: '#53555d',
  },
  equalsButton: {
    backgroundColor: '#00C6AD',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  operatorText: {
    color: '#23252B',
    fontWeight: 'bold',
  },
  controlText: {
    color: '#FFD600',
    fontWeight: 'bold',
  },
  numberText: {
    color: 'white',
    fontWeight: '500',
  },
  equalsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
  },
});
