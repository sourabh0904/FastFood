// HomePage.js
import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Categories from "./Categories";
import BestSellers from "./BestSellers";
import Menubar from "./Menubar";

export default function HomePage() {
  const navigation = useNavigation();

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
      image: require("../assets/FastFoodApp-IMAGE/image-1.svg"),
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      image: require("../assets/FastFoodApp-IMAGE/image-2.svg"),
    },
    {
      id: 3,
      name: "California Roll",
      image: require("../assets/FastFoodApp-IMAGE/image-3.svg"),
    },
    {
      id: 4,
      name: "Margarita",
      image: require("../assets/FastFoodApp-IMAGE/image-4.svg"),
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@user");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        >
          <Image
            source={require("../assets/FastFoodApp-IMAGE/image-5.svg")}
            style={styles.carouselImage}
          />
          <Image
            source={require("../assets/FastFoodApp-IMAGE/image-6.svg")}
            style={styles.carouselImage}
          />
          <Image
            source={require("../assets/FastFoodApp-IMAGE/image-7.svg")}
            style={styles.carouselImage}
          />
        </ScrollView>
        <Categories categories={dummyCategories} />
        <BestSellers bestSellers={dummyBestSellers} />
      </ScrollView>
      <Menubar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 60,
  },
  imageScroll: {
    marginVertical: 20,
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
});
