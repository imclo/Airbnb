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

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);
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
              {() => <SignIn setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUp setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => (
                      <Entypo name="home" size={24} color="#FF385C" />
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
                  name="AroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name={"location"} size={24} color="#FF385C" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "Around Me",
                          tabBarLabel: "Around Me",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20,
                          },
                        }}
                      >
                        {() => <AroundMe />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="ProfileTab"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({}) => (
                      <Ionicons name="person-sharp" size={24} color="#FF385C" />
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
                        {() => <Profile />}
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
