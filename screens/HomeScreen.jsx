import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      console.log(response.data);
      setData(response.data.rooms);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Cannot load");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF385C" />
        </View>
      ) : (
        <FlatList
          style={{ height: "100%", backgroundColor: "red" }}
          data={data}
          keyExtractor={(elem) => elem._id}
          renderItem={({ item }) => {
            return (
              <View style={styles.homeBloc}>
                <Image
                  style={styles.homePic}
                  source={{ uri: item.photos[0] }}
                />
              </View>
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
    height: 250,
    width: "100%",
    backgroundColor: "blue",
  },
  homePic: {
    height: 230,
  },
});
