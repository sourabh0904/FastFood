import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("@user");
    navigation.navigate("Login"); // Navigate to login page after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to HomePage!</Text>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "900",
    color: "#000",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    backgroundColor: "#ff7f50",
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
