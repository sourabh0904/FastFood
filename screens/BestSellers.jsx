import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

// Helper function to generate random delivery time (between 20 to 60 minutes)
const getRandomDeliveryTime = () => {
  return `${Math.floor(Math.random() * (60 - 20 + 1)) + 20} min`;
};

export default function BestSellers({ bestSellers }) {
  const [likedItems, setLikedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // For selected product modal

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

  const openProductPopup = (product) => {
    setSelectedProduct(product);
  };

  const closeProductPopup = () => {
    setSelectedProduct(null);
  };

  const handleAddToFavorites = async () => {
    if (selectedProduct) {
      const isLiked = likedItems.find(
        (liked) => liked.id === selectedProduct.id
      );
      if (!isLiked) {
        const updatedItems = [...likedItems, selectedProduct];
        setLikedItems(updatedItems);
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedItems));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {bestSellers.map((item) => {
          const isLiked = likedItems.some((liked) => liked.id === item.id);
          return (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity onPress={() => openProductPopup(item)}>
                <Image source={item.image} style={styles.itemImage} />
              </TouchableOpacity>
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
            </View>
          );
        })}
      </ScrollView>

      {/* Modal for selected product details */}
      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        transparent={true}
        onRequestClose={closeProductPopup}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable onPress={closeProductPopup} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            {selectedProduct && (
              <>
                <Image
                  source={selectedProduct.image}
                  style={styles.largeImage}
                />
                <Text style={styles.detailText}>
                  Name: {selectedProduct.name}
                </Text>
                <Text style={styles.detailText}>
                  Delivery Time: {getRandomDeliveryTime()}
                </Text>
                <Text style={styles.detailText}>Rating: ⭐⭐⭐⭐</Text>
                <Text style={styles.detailText}>
                  Description:{" "}
                  {selectedProduct.description ||
                    "Delicious and freshly made food for you!"}
                </Text>
                <TouchableOpacity
                  style={styles.addToFavoritesButton}
                  onPress={handleAddToFavorites}
                >
                  <Text style={styles.addToFavoritesText}>
                    Add to Favorites
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: "#fff", // Light background for cleanliness
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f50", // Vibrant orange to match fast food theme
    marginLeft: 15,
    marginBottom: 10,
    letterSpacing: 1, // Adds space between letters for emphasis
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
    transition: "transform 0.3s ease", // Hover effect on items
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#ff7f50", // Vibrant orange to match the theme
    fontWeight: "bold",
  },
  largeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  addToFavoritesButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addToFavoritesText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  showAllButton: {
    justifyContent: "center",
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  showAllText: {
    color: "#ff7f50", // Matching color for consistency
    fontSize: 16,
    fontWeight: "bold",
  },

  // Hover effect
  itemContainerHovered: {
    transform: "scale(1.05)", // Slight scale up effect on hover
  },
});
