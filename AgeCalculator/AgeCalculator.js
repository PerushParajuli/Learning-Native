import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AgeCalculator = () => {
  const [dob, setDob] = useState(new Date(2000, 0, 1)); // Default to Jan 1, 2000
  const [showPicker, setShowPicker] = useState(false);
  const [age, setAge] = useState(null);

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // iOS stays open
    if (selectedDate) {
      setDob(selectedDate);
      setAge(null); // Reset age when new DOB is picked
    }
  };

  const calculateAge = () => {
    const today = new Date();
    let computedAge = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      computedAge--;
    }
    setAge(computedAge);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Age Calculator</Text>
      <Text style={styles.label}>Select your Date of Birth:</Text>
      <Button title={dob.toDateString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      <View style={{ margin: 12 }}>
        <Button title="Calculate Age" onPress={calculateAge} />
      </View>
      {age !== null && (
        <Text style={styles.result}>You are {age} years old.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#3165ff",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  result: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "500",
    color: "#228B22",
  },
});

export default AgeCalculator;
