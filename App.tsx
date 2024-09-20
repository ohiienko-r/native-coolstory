import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { Widget } from "./Widget";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: "50%" }}>
      <Widget />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
