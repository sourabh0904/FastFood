import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.headerContainer}>
      {/* Profile Icon */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FontAwesome name="user-circle" size={28} color="#333" />
      </TouchableOpacity>

      {/* Username in Center */}
      <Text style={styles.userName}>Hi, {userName}</Text>

      {/* Location */}
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={18} color="gray" />
        <Text style={styles.locationText}>{randomLocation}</Text>
      </View>

      {/* Profile Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile Details</Text>
            <Text style={styles.modalItem}>Name: {userName}</Text>
            <Text style={styles.modalItem}>Email: {userEmail}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f8f8", // Light gray background
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Subtle border for separation
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "#ff7f50", // Use the accent orange color for location
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for modal
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10, // Enhanced shadow for a more prominent effect
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#ff7f50", // Match theme accent color for the title
  },
  modalItem: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#ff7f50", // Use theme color for buttons
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
