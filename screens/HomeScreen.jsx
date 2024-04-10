import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Cannot load");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stars = (rating) => {
    const tabStar = [];
    for (let i = 0; i < rating; i++) {
      tabStar.push(<AntDesign name="star" size={24} color="yellow" />);
    }

    for (let j = 0; j < 5 - rating; j++) {
      tabStar.push(<AntDesign name="star" size={24} color="grey" />);
    }

    return tabStar;
  };

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF385C" />
        </View>
      ) : (
        <FlatList
          style={{ height: "100%" }}
          data={data}
          keyExtractor={(elem) => elem._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                nextFocusRight="true"
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                  });
                }}
              >
                <View style={styles.homeBloc}>
                  <Image
                    style={styles.homePic}
                    source={{ uri: item.photos[0].url }}
                  />
                  <View style={styles.homeBlocPrice}>
                    <Text style={styles.price}>{item.price} €</Text>
                  </View>
                  <View style={styles.homeBlocDetail}>
                    <View style={styles.homeBlocDescription}>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        {stars(item.ratingValue)}
                        <Text style={styles.homeBlocReview}>
                          {item.reviews} avis
                        </Text>
                      </View>
                    </View>
                    <Image
                      style={styles.homeBlocDetailPic}
                      source={{ uri: item.user.account.photo.url }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  loading: {
    justifyContent: "center",
  },
  homeBloc: {
    marginBottom: 10,
  },
  homePic: {
    height: 230,
  },
  homeBlocPrice: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 110,
  },
  price: {
    color: "white",
  },
  homeBlocDetail: {
    paddingTop: 15,
    paddingBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  homeBlocDescription: {
    flex: 4,
  },
  homeBlocReview: {
    color: "#bbbbbb",
    paddingLeft: 30,
    fontSize: 18,
  },
  homeBlocDetailPic: {
    width: 50,
    height: 70,
    resizeMode: "cover",
    borderRadius: 50,
    flex: 1,
    marginLeft: 10,
  },
});
