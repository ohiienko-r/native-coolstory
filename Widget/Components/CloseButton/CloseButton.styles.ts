import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 10,
    left: 10,
    zIndex: 10,
  },
});
