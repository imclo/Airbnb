import { Button, Text, View } from "react-native";

export default function Profile({ setToken }) {
  return (
    <View>
      <Text>Profile</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
