import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Random location feature
  const locations = ["Home", "City Center", "Park Avenue", "Downtown"];
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];

  // Fetch user info from AsyncStorage
  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name); // Assuming user object has a `name` field
        setUserEmail(parsedUser.email); // Assuming user object has an `email` field
      }
    };
    fetchUserInfo();
  }, []);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Profile Icon */}
      <TouchableOpacity onPress={toggleDrawer}>
        <FontAwesome name="user-circle" size={28} color="#333" />
      </TouchableOpacity>

      {/* Username in Center */}
      <Text style={styles.userName}>Hi, {userName}</Text>

      {/* Location */}
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={18} color="gray" />
        <Text style={styles.locationText}>{randomLocation}</Text>
      </View>

      {/* Side Drawer */}
      <Modal visible={drawerVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.drawerOverlay}
          onPress={() => setDrawerVisible(false)}
        >
          <View style={styles.drawerContainer}>
            <Text style={styles.drawerTitle}>Profile Details</Text>
            <Text style={styles.drawerItem}>Name: {userName}</Text>
            <Text style={styles.drawerItem}>Email: {userEmail}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDrawerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  drawerContainer: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "flex-start",
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  drawerItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ff7f50",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
