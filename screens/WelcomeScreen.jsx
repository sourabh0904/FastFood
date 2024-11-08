import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomePage() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "846383838349-2q5he33460m3votij5karp7beo1mcjns.apps.googleusercontent.com",
    iosClientId:
      "846383838349-8r8l9kv3gh6n5j6bn8ekhs7ra71a7nsh.apps.googleusercontent.com",
    webClientId:
      "846383838349-bhu9o2n2q8gj39qf1urglotb2bb6oe1g.apps.googleusercontent.com",
  });

  const navigation = useNavigation();

  React.useEffect(() => {
    if (response?.type === "success") {
      handleGoogleLogin(response.authentication.accessToken);
    }
  }, [response]);

  const handleGoogleLogin = async (token) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userInfo = await userInfoResponse.json();
      await AsyncStorage.setItem("@user", JSON.stringify(userInfo));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/FastFoodApp-IMAGE/background.webp")}
      style={styles.background}
    >
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 140, 0, 0.6)",
          "rgba(255, 140, 0, 0.8)",
        ]}
        style={styles.overlay}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            <Text style={styles.welcomeText}>Welcome to </Text>
          </Text>
          <Text style={[styles.title, styles.fastFoodText]}>Fast Food</Text>
          <Text style={styles.subtitle}>
            Get your favorite meal delivered quickly right to your doorstep
          </Text>
        </View>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate("SignupPage")}
        >
          <Text style={styles.buttonText}>Start With Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
        >
          <Text style={styles.buttonText}>Continue With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() => {
            navigation.navigate("Welcome");
          }}
        >
          <Text style={styles.buttonText}>Continue With Facebook</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 52,
    fontWeight: "bold",
    textAlign: "left",
  },
  welcomeText: {
    color: "#000",
    fontWeight: "900",
    textAlign: "left",
  },
  fastFoodText: {
    color: "red",
    fontWeight: "900",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 18,
    color: "#4A4A4A",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  emailButton: {
    width: "80%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 15,
  },
  googleButton: {
    width: "80%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#4285F4",
    alignItems: "center",
    marginBottom: 15,
  },
  facebookButton: {
    width: "80%",
    padding: 15,
    borderRadius: 30,
    backgroundColor: "#3b5998",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
