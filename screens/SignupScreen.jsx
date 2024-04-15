import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Signup({ setTokenAndId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, description, password }
          );
          // console.log(response.data);
          if (data.token && data.id) {
            setTokenAndId(data.token, data._id);
          } else {
            setErrorMessage("An error occurred");
          }
          alert("Account created");
        } catch (error) {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
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
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.inputBlock}>
        <TextInput
          autoCapitalize="none"
          placeholder="email"
          style={styles.signinput}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          autoCapitalize="none"
          placeholder="username"
          style={styles.signinput}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
      </View>
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="Describe yourself in a few words..."
          multiline={true}
          numberOfLines={20}
          style={styles.signinputDescription}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
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
      <View style={styles.inputBlock}>
        <TextInput
          placeholder="confirm password"
          secureTextEntry={true}
          style={styles.signinput}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage("");
          }}
          value={confirmPassword}
        />
      </View>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <View style={styles.button}>
        <Pressable
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.buttonTitle}>Sign up</Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.txtConnect}>
            Already have an account? Sign in
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

//Helloworld@mail.fr
//azerty

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
  txtConnect: {
    fontSize: 14,
    marginTop: 10,
    color: "grey",
    textAlign: "center",
    marginBottom: 100,
  },
  errorMessage: {
    color: "#FF385C",
    textAlign: "center",
  },
});
