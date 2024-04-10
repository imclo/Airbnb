import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import Swiper from "react-native-swiper";

import { AntDesign } from "@expo/vector-icons";

export default function Room({ route }) {
  const { id } = route.params;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
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
    <View>
      {isLoading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <>
          <View style={styles.roomPic}>
            <Swiper
              style={styles.wrapper}
              showsButtons={false}
              dotColor="grey"
              activeDotColor="grey"
              buttonColor="yellow"
            >
              {data.photos.map((photo) => {
                return (
                  <View style={styles.slide} key={photo.picture_id}>
                    <Image style={styles.homePic} source={{ uri: photo.url }} />
                  </View>
                );
              })}
            </Swiper>
            <View style={styles.roomBlocPrice}>
              <Text style={styles.price}> {data.price} €</Text>
            </View>
          </View>

          <View style={[styles.homeBloc, styles.container]}>
            <View style={[styles.homeBlocDetail]}>
              <View style={styles.homeBlocDescription}>
                <Text style={styles.title} numberOfLines={1}>
                  {data.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  {stars(data.ratingValue)}
                  <Text style={styles.homeBlocReview}>{data.reviews} avis</Text>
                </View>
              </View>
              <Image
                style={styles.homeBlocDetailPic}
                source={{ uri: data.user.account.photo.url }}
              />
            </View>
            <TouchableOpacity
              style={styles.description}
              onPress={() => {
                setDisplayAllText(!displayAllText);
              }}
            >
              <Text numberOfLines={displayAllText === false ? 3 : null}>
                {data.description}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
  },
  roomPic: {
    height: 230,
  },
  slide: {
    height: 240,
  },
  homePic: {
    height: 230,
  },
  roomBlocPrice: {
    backgroundColor: "black",
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
  },
  price: {
    color: "white",
  },
  container: {
    margin: 25,
  },
  homeBloc: {
    marginBottom: 10,
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
  homeBlocDetailPic: {
    width: 50,
    height: 70,
    resizeMode: "cover",
    borderRadius: 50,
    flex: 1,
    marginLeft: 10,
  },
});
