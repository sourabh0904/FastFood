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

// Helper function to generate random delivery time (between 20 to 60 minutes)
const getRandomDeliveryTime = () => {
  return `${Math.floor(Math.random() * (60 - 20 + 1)) + 20} min`;
};

export default function BestSellers({ bestSellers }) {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    loadLikedItems();
  }, []);

  const loadLikedItems = async () => {
    const savedItems = await AsyncStorage.getItem("favorites");
    if (savedItems) {
      setLikedItems(JSON.parse(savedItems));
    }
  };

  const handleLike = async (item) => {
    const isLiked = likedItems.find((liked) => liked.id === item.id);
    const updatedItems = isLiked
      ? likedItems.filter((liked) => liked.id !== item.id)
      : [...likedItems, item];
    setLikedItems(updatedItems);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedItems));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bestSellers.map((item) => {
          const isLiked = likedItems.some((liked) => liked.id === item.id);
          return (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => handleLike(item)}
              >
                <FontAwesome
                  name="heart"
                  size={18}
                  color={isLiked ? "#ff7f7f" : "#ccc"}
                />
              </TouchableOpacity>
              <Text style={styles.itemText}>{item.name}</Text>

              {/* New product details */}
              <View style={styles.itemDetails}>
                <Text style={styles.deliveryText}>
                  Delivery Time: {getRandomDeliveryTime()}
                </Text>
                <Text style={styles.ratingText}>Rating: ⭐⭐⭐⭐</Text>
                <Text style={styles.descriptionText}>
                  {item.description
                    ? item.description
                    : "Delicious and freshly made food for you!"}
                </Text>
              </View>
            </View>
          );
        })}
        <TouchableOpacity style={styles.showAllButton}>
          <Text style={styles.showAllText}>Show All</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
    marginBottom: 10,
  },
  itemContainer: {
    width: 180,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
    paddingBottom: 15,
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  likeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 15,
    padding: 4,
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    paddingHorizontal: 5,
  },
  itemDetails: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  deliveryText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },
  showAllButton: {
    justifyContent: "center",
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  showAllText: {
    color: "#ff7f50",
    fontSize: 16,
    fontWeight: "bold",
  },
});
