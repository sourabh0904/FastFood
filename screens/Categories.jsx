// Categories.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Categories({ categories }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryContainer}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.showAllButton}>
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  categoryContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  showAllButton: {
    alignItems: "center",
    marginTop: 10,
  },
  showAllText: {
    fontSize: 16,
    color: "#ff7f50",
    fontWeight: "bold",
  },
});
