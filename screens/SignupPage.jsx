import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "846383838349-2q5he33460m3votij5karp7beo1mcjns.apps.googleusercontent.com",
    iosClientId:
      "846383838349-8r8l9kv3gh6n5j6bn8ekhs7ra71a7nsh.apps.googleusercontent.com",
    webClientId:
      "846383838349-bhu9o2n2q8gj39qf1urglotb2bb6oe1g.apps.googleusercontent.com",
  });

  const navigation = useNavigation();

  const handleSignInWithGoogle = async () => {
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken);
    } else {
      alert("Google sign-in failed. Please try again.");
    }
  };

  const getUserInfo = async (token) => {
    if (!token) {
      console.error("No token provided for fetching user info.");
      return;
    }

    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const user = await res.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate("Home"); 
    } catch (error) {
      console.error("Error fetching user info:", error);
      alert("Failed to fetch user information. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@flipr\.ai$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length > 8;
  };

  const handleLoginSignup = () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email (abc@flipr.ai)."
      );
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be more than 8 characters."
      );
      return;
    }

    
    Alert.alert("Success", "Logging you in...");
    navigation.navigate("Home"); 
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      handleSignInWithGoogle();
    }
  }, [response]);

  return (
    <LinearGradient
      colors={["#ffeb3b", "#ff7f50"]} 
      style={styles.container}
    >
      <Text style={styles.header}>SignUp</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email (abc@flipr.ai)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password (More Than 8 Characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLoginSignup}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Facebook Sign-In Placeholder */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Facebook login not implemented yet.")}
      >
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity
        onPress={() => alert("Forgot Password feature is not implemented.")}
        style={styles.forgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginSignupPage")}
          style={styles.signupLink}
        >
          <Text style={styles.signupLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "black",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#000", 
    borderRadius: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#fff",
  },
  signupLink: {
    justifyContent: "center",
    alignItems: "center",
  },
  signupLinkText: {
    fontSize: 14,
    color: "red", 
    fontWeight: "600",
  },
});
