import { View, ActivityIndicator } from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AroundMe() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getPermission = async () => {
    try {
      // demander la permission

      const { status } = await Location.requestForegroundPermissionsAsync();

      //   console.log(status); // granted/denied

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync();
        // console.log(location.coords.latitude);
        setLatitude(location.coords.latitude);
        // console.log(location.coords.longitude);
        setLongitude(location.coords.longitude);
      } else {
        alert("position refusée");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const fetchData = async () => {
    try {
      // console.log(latitude);
      // console.log(longitude);
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${latitude}&longitude=${longitude}`
        // `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=48.856614&longitude=2.3522219`
      );
      setData(data);
      console.log(data);
      // console.log(latitude);
      // console.log(longitude);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [longitude, latitude]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#FF385C" />
  ) : (
    <View>
      <View>
        <MapView
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {data.map((elem) => {
            return (
              <Marker
                key={elem._id}
                coordinate={{
                  longitude: elem.location[0],
                  latitude: elem.location[1],
                }}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
}
