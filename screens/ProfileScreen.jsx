import { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

import axios from "axios";

export default function Profile({ userToken, setTokenAndId, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const fetchData = async () => {
    try {
      // console.log(userToken);
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(data);
      setUsername(data.username);
      setEmail(data.email);
      setDescription(data.description);

      if (data.photo) {
        setPicture(data.photo.url);
      }

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response.data.error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.profileDescription, styles.alignItemsCenter]}>
      <Text style={[styles.h2, styles.marginBottom]}>Email</Text>
      <TextInput
        placeholder="email"
        value={email}
        style={[styles.marginBigBottom, styles.h2, styles.signinput]}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Text style={[styles.h2, styles.marginBottom]}>Username</Text>
      <TextInput
        placeholder="username"
        value={username}
        style={[styles.marginBigBottom, styles.h2, styles.signinput]}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <Text style={[styles.h2, styles.marginBottom]}>Description</Text>
      <TextInput
        onChangeText={(text) => {
          setDescription(text);
        }}
        value={description}
        placeholder="description"
        multiline={true}
        numberOfLines={20}
        style={[styles.marginBigBottom, styles.h2, styles.signinputDescription]}
      />

      <View style={styles.button}>
        <Pressable
          style={styles.buttonTitle}
          title="Log Out"
          onPress={() => {
            setTokenAndId(null);
          }}
        >
          <Text style={styles.buttonTitle}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 18,
  },
  marginBottom: { marginBottom: 10 },
  marginBigBottom: {
    marginBottom: 20,
  },
  profileDescription: {
    marginTop: 40,
    marginBottom: 15,
  },
  signinputDescription: {
    borderWidth: 1,
    borderBottomColor: "lightpink",
    borderTopColor: "lightpink",
    borderLeftColor: "lightpink",
    borderRightColor: "lightpink",
    fontSize: 20,
    height: 100,
    textAlignVertical: "top",
    padding: 5,
  },
  signinput: {
    borderWidth: 1,
    borderBottomColor: "lightpink",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    fontSize: 20,
  },
  buttonTitle: {
    fontSize: 20,
    color: "#828282",
  },
  button: {
    borderColor: "#FF385C",
    borderRadius: 205,
    borderWidth: 3,
    width: 200,
    height: 60,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    marginTop: 50,
  },
});
