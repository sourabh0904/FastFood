import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const savedItems = await AsyncStorage.getItem("favorites");
    if (savedItems) {
      setFavorites(JSON.parse(savedItems));
    }
  };

  const removeFavorite = async (item) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <ScrollView>
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>
                  {item.description
                    ? item.description
                    : "Delicious and freshly made food for you!"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFavorite(item)}
              >
                <FontAwesome name="trash" size={20} color="#ff7f7f" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>
            You haven't added any favorites yet.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  noFavoritesText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 50,
  },
});
