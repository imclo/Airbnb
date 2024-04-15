import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useEffect, useState } from "react";

import { Entypo, Ionicons, EvilIcons } from "@expo/vector-icons";

import SignIn from "./screens/SigninScreen";
import SignUp from "./screens/SignupScreen";
import Home from "./screens/HomeScreen";
import Profile from "./screens/ProfileScreen";
import Room from "./screens/RoomScreen";
import AroundMe from "./screens/AroundmeScreen";

import HeaderIcon from "./components/HeaderIcon";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setTokenAndId = async (token, id) => {
    if (token & id) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }
    setUserToken(token);
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      console.log(userToken);
      console.log(userId);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
      setUserId(userId);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          <>
            <Stack.Screen name="SignIn">
              {() => <SignIn setTokenAndId={setTokenAndId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUp setTokenAndId={setTokenAndId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "#FF385C",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                      <Entypo name="home" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "#FF385" },
                          headerTitle: () => <HeaderIcon size={"small"} />,
                        }}
                      >
                        {() => <Home />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitle: () => <HeaderIcon size={"small"} />,
                          headerBackVisible: false,
                        }}
                      >
                        {(props) => <Room {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color }) => (
                      <EvilIcons name={"location"} size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMeScreen"
                        options={{
                          headerTitle: () => <HeaderIcon size={"small"} />,
                          headerBackVisible: false,
                        }}
                      >
                        {() => <AroundMe setTokenAndId={setTokenAndId} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="ProfileTab"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color }) => (
                      <Ionicons name="person-sharp" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: true }}>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "#FF385" },
                          headerTitle: () => <HeaderIcon size={"small"} />,
                        }}
                      >
                        {(props) => (
                          <Profile
                            {...props}
                            userToken={userToken}
                            setTokenAndId={setTokenAndId}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
