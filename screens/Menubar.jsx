// Menubar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Menubar() {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="compass" size={24} color="#333" />
        <Text style={styles.menuText}>Discover</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="utensils" size={24} color="#333" />
        <Text style={styles.menuText}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="search" size={24} color="#333" />
        <Text style={styles.menuText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <FontAwesome5 name="heart" size={24} color="#333" />
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
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  menuItem: {
    alignItems: "center",
  },
  menuText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
});
