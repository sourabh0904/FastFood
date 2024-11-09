import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Menubar() {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="compass" size={24} color="#fff" />
        <Text style={styles.menuText}>Discover</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="utensils" size={24} color="#fff" />
        <Text style={styles.menuText}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="search" size={24} color="#fff" />
        <Text style={styles.menuText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="heart" size={24} color="#fff" />
        <Text style={styles.menuText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ff7f50", // Use the Fast Food theme accent color
    borderTopWidth: 1,
    borderTopColor: "#ff7f50", // Keep consistency with the theme
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 25, // Rounded top left corner
    borderTopRightRadius: 25, // Rounded top right corner
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10, // Adds depth to the menu
  },
  menuItem: {
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
    color: "#fff", // Text color changed to white to contrast with the background
    marginTop: 4,
    fontWeight: "bold", // Make text bold for prominence
  },
});
