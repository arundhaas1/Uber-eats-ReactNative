import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Categories from "./Components/Categories";
import Header from "./Components/Header";
import RestaurantItems, {
  localRestaurants,
} from "./Components/RestaurantItems";
import SearchBar from "./Components/SearchBar";
import BottomTabs from './Components/BottomTabs';
import { Divider } from "react-native-elements/dist/divider/Divider";


const YELP_API_KEY =
  "1onWUu7Plm72HBxVprC0Htw3FQmW92KdX0SbxEPFqrR48eZtR70szETgFGKqTpXCere4yFGK5VvKMup9rYC5g9zIWmPoxpI44kW6t9orB5EsnCaUns_K7Agv3Ve_X3Yx";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city,setCity]=useState("hollywood`")

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(json.businesses)
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee" }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <Header/>
        <SearchBar setCity={setCity}  />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
        />
      </ScrollView>
      <Divider />
      <BottomTabs style={{bottom:0,left:0,right:0,position:"fixed"}} />
    </SafeAreaView>
  );
}