import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
    height: 10,
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  indicator: {
    flex: 1,
    height: 2,
    backgroundColor: "#6a7072",
  },
  active: {
    backgroundColor: "#FFFFFF",
  },
});
