import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Signin({ setTokenAndId }) {
  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        console.log(response.data);
        if (response.data.token && response.data.id) {
          setTokenAndId(response.data.token, response.data.id);
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (error) {
        console.log(error);
      }
    }
    // else if (email || password) {
    //   setErrorMessage("Please fill all fields");
    // }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <FontAwesome5
          name="airbnb"
          size={100}
          color="#FF385C"
          style={styles.logo}
        />
        <Text style={styles.title}>Sign in</Text>
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          style={styles.signinput}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
          value={email}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.signinput}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
          value={password}
        />
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <View style={styles.button}>
        <Pressable
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.buttonTitle}>Sign in</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.txtRedirection}>No account? Register</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  logo: {
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: "#828282",
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputBlock: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  signinput: {
    borderWidth: 1,
    borderBottomColor: "lightpink",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    fontSize: 20,
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

  buttonTitle: {
    fontSize: 20,
    color: "#828282",
  },
  redirection: {
    marginHorizontal: 126,
  },
  txtRedirection: {
    fontSize: 14,
    marginTop: 10,
    color: "grey",
    textAlign: "center",
  },
  errorMessage: {
    color: "#FF385C",
    textAlign: "center",
  },
});
