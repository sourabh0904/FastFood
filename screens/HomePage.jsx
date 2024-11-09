import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Categories from "./Categories";
import BestSellers from "./BestSellers";
import Menubar from "./Menubar";

export default function HomePage() {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const contentOffset = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    Animated.timing(contentOffset, {
      toValue: dropdownVisible ? 0 : 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dummyCategories = [
    {
      id: 1,
      name: "Burgers",
      image: require("../assets/FastFoodApp-IMAGE/image-8.svg"),
    },
    {
      id: 2,
      name: "Pizzas",
      image: require("../assets/FastFoodApp-IMAGE/image-9.svg"),
    },
    {
      id: 3,
      name: "Sushi",
      image: require("../assets/FastFoodApp-IMAGE/image-10.svg"),
    },
    {
      id: 4,
      name: "Drinks",
      image: require("../assets/FastFoodApp-IMAGE/image-11.svg"),
    },
  ];

  const dummyBestSellers = [
    {
      id: 1,
      name: "Cheeseburger",
      description: "Juicy grilled beef with fresh toppings",
      price: "$8.99",
      image: require("../assets/FastFoodApp-IMAGE/image-1.svg"),
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with extra cheese",
      price: "$12.99",
      image: require("../assets/FastFoodApp-IMAGE/image-2.svg"),
    },
    {
      id: 3,
      name: "California Roll",
      description: "Fresh sushi with avocado and crab",
      price: "$6.99",
      image: require("../assets/FastFoodApp-IMAGE/image-3.svg"),
    },
    {
      id: 4,
      name: "Margarita",
      description: "Refreshing cocktail with a hint of lime",
      price: "$5.99",
      image: require("../assets/FastFoodApp-IMAGE/image-4.svg"),
    },
  ];

  return (
    <View style={styles.container}>
      <Header toggleDropdown={toggleDropdown} />

      {/* Dropdown container */}
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>Name: User Name</Text>
          <Text style={styles.dropdownText}>Email: user@example.com</Text>
        </View>
      )}

      {/* Animated content container */}
      <Animated.View style={[styles.content, { marginTop: contentOffset }]}>
        <ScrollView style={styles.scrollContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
          >
            {dummyBestSellers.map((item) => (
              <View key={item.id} style={styles.specialItemContainer}>
                <Image source={item.image} style={styles.specialImage} />
                <View style={styles.overlay}>
                  <Text style={styles.specialLabel}>Our Special</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <Categories categories={dummyCategories} />
          <BestSellers bestSellers={dummyBestSellers} />
        </ScrollView>
      </Animated.View>

      <Menubar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    zIndex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 60,
  },
  imageScroll: {
    marginVertical: 20,
  },
  specialItemContainer: {
    position: "relative",
    width: 300,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 15,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  specialImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
    justifyContent: "flex-end",
    borderRadius: 12,
  },
  specialLabel: {
    fontSize: 14,
    color: "#ffcc00",
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: "#ffcc00",
    fontWeight: "bold",
    marginTop: 5,
  },
});
