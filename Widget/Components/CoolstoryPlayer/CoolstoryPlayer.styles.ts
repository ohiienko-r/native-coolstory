import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  playerContainer: {
    flex: 1,
    position: "relative",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    width: "100%",
    height: "100%",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  fallbackText: {
    color: "#FFFFFF",
  },
});
