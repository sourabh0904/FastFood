import React, { useState } from "react";
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

export default function Categories({ categories }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const openProductPopup = (product) => {
    setSelectedProduct(product);
  };

  const closeProductPopup = () => {
    setSelectedProduct(null);
  };

  const addToFavorites = () => {
    if (selectedProduct) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedProduct]);
      alert(`${selectedProduct.name} has been added to favorites!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <TouchableOpacity
              onPress={() => openProductPopup(category)}
              activeOpacity={0.7}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal for product details */}
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
                  Description: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </Text>
                <Text style={styles.detailText}>
                  Price: ${selectedProduct.price}
                </Text>
                <Text style={styles.detailText}>
                  Availability:{" "}
                  {selectedProduct.stock ? "In Stock" : "Out of Stock"}
                </Text>
                <Text style={styles.detailText}>
                  Category: {selectedProduct.categoryType}
                </Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={addToFavorites}
                >
                  <Text style={styles.favoriteButtonText}>
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
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff7f50",
    marginBottom: 15,
    paddingHorizontal: 15,
    letterSpacing: 1,
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  categoryContainer: {
    alignItems: "center",
    marginHorizontal: 12,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#ff7f50",
  },
  categoryText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginTop: -10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#ff7f50",
    fontWeight: "bold",
  },
  largeImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  favoriteButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  favoriteButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
