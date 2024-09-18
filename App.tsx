import { Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Widget } from "./Widget";

import { styles } from "./styles";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Here is our Coolstory widget!</Text>
      <Widget />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
