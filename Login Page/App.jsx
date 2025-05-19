import React, { useReducer } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ScreenContent } from './components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import "./global.css";

// --- Constants ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const PASSWORD_REQUIREMENTS = "Password should contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long.";

// --- Action Types ---
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_SHOW_PASSWORD = "SET_SHOW_PASSWORD";
const SET_PASSWORD_MESSAGE = "SET_PASSWORD_MESSAGE";
const SET_EMAIL_MESSAGE = "SET_EMAIL_MESSAGE";
const SET_ALLOW_SUBMISSION = "SET_ALLOW_SUBMISSION";

// --- Initial State ---
const initialState = {
  email: "",
  password: "",
  showPassword: false,
  passwordMessage: "",
  emailMessage: "",
  allowSubmission: false,
};

// --- Reducer ---
function reducer(state, action) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_SHOW_PASSWORD:
      return { ...state, showPassword: action.payload };
    case SET_PASSWORD_MESSAGE:
      return { ...state, passwordMessage: action.payload };
    case SET_EMAIL_MESSAGE:
      return { ...state, emailMessage: action.payload };
    case SET_ALLOW_SUBMISSION:
      return { ...state, allowSubmission: action.payload };
    default:
      return state;
  }
}

// --- InputField Component ---
function InputField(props) {
  const {
    label,
    value,
    onChange,
    placeholder,
    secureTextEntry = false,
    errorMessage = "",
    rightIcon = null,
    keyboardType = "default",
    autoCapitalize = "none",
    accessibilityLabel = "",
  } = props;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.textInput, errorMessage ? styles.inputErrorBorder : null]}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          accessibilityLabel={accessibilityLabel || label}
        />
        {rightIcon}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

// --- Main Component ---
function SignInScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit() {
    let valid = true;

    // Email validation
    if (state.email.length === 0) {
      dispatch({ type: SET_EMAIL_MESSAGE, payload: "Email is required." });
      valid = false;
    } else if (!EMAIL_REGEX.test(state.email)) {
      dispatch({ type: SET_EMAIL_MESSAGE, payload: "Email is not valid." });
      Alert.alert("Invalid Email", "Email is not valid.");
      valid = false;
    } else {
      dispatch({ type: SET_EMAIL_MESSAGE, payload: "" });
    }

    // Password validation
    if (state.password.length === 0) {
      dispatch({ type: SET_PASSWORD_MESSAGE, payload: "Password is required." });
      valid = false;
    } else if (!PASSWORD_REGEX.test(state.password)) {
      dispatch({ type: SET_PASSWORD_MESSAGE, payload: "Password is not valid." });
      Alert.alert("Invalid Password", "Password is not valid.\n" + PASSWORD_REQUIREMENTS);
      valid = false;
    } else {
      dispatch({ type: SET_PASSWORD_MESSAGE, payload: "" });
    }

    // Allow submission only if both are valid
    dispatch({ type: SET_ALLOW_SUBMISSION, payload: valid });

    if (valid) {
      Alert.alert("Success", "Login successful.");
      // TODO: Implement actual submission logic
    }
  }

  function toggleShowPassword() {
    dispatch({ type: SET_SHOW_PASSWORD, payload: !state.showPassword });
  }

  function handleGoogleSignIn() {
    Alert.alert("Info", "Google sign-in not implemented yet.");
  }

  return (
    <ScreenContent title="Sign In" path="SignInScreen.jsx">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Heading */}
          <Text style={styles.heading}>Log in and start sharing</Text>
          <Text style={styles.subheading}>
            Don't have an account?{' '}
            <Text style={styles.link} accessibilityRole="link">
              Sign up
            </Text>
          </Text>

          {/* Google Sign-In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            accessibilityLabel="Continue with Google"
          >
            <FontAwesome name="google" size={20} color="#4285F4" style={{ marginRight: 8 }} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Email Input */}
          <InputField
            label="Email"
            value={state.email}
            onChange={function (text) {
              dispatch({ type: SET_EMAIL, payload: text });
              if (state.emailMessage) {
                dispatch({ type: SET_EMAIL_MESSAGE, payload: "" });
              }
            }}
            placeholder="Enter your email"
            secureTextEntry={false}
            errorMessage={state.emailMessage}
            rightIcon={null}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Email input"
          />

          {/* Password Input */}
          <InputField
            label="Password"
            value={state.password}
            onChange={function (text) {
              dispatch({ type: SET_PASSWORD, payload: text });
              if (state.passwordMessage) {
                dispatch({ type: SET_PASSWORD_MESSAGE, payload: "" });
              }
            }}
            placeholder="Enter your password"
            secureTextEntry={!state.showPassword}
            errorMessage={state.passwordMessage}
            rightIcon={
              state.password.length > 0 ? (
                <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeButton} accessibilityLabel="Toggle password visibility">
                  <MaterialCommunityIcons
                    name={state.showPassword ? "eye" : "eye-off"}
                    size={22}
                    color="#888"
                  />
                </TouchableOpacity>
              ) : null
            }
            keyboardType="default"
            autoCapitalize="none"
            accessibilityLabel="Password input"
          />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forget your password?</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: state.allowSubmission ? '#1e40af' : '#60a5fa' }
            ]}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Login"
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Terms and Policies */}
          <Text style={styles.termsText}>
            By Logging in with an account, you agree to our Terms of Service,
            Privacy Policy and Acceptable Use Policy.
          </Text>
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </ScreenContent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 24,
    color: '#374151',
    textAlign: 'center',
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },
  dividerText: {
    marginHorizontal: 8,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  inputErrorBorder: {
    borderColor: '#f43f5e',
  },
  errorText: {
    color: '#f43f5e',
    fontSize: 12,
    marginTop: 2,
  },
  eyeButton: {
    marginLeft: 8,
    padding: 4,
  },
  forgotText: {
    color: '#2563eb',
    marginTop: 4,
    marginBottom: 12,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SignInScreen;
