import { Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StoryPropTypes } from "./types";
import { styles } from "./Story.styles";

const fallbackIcon = require("../../../assets/fallback_icon.png");

const Story = ({ preview, onPress }: StoryPropTypes) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={[
          "#ffa95f",
          "#f99c4a",
          "#f47838",
          "#e75157",
          "#d92d7a",
          "#cc2a92",
          "#c32e92",
        ]}
        locations={[0.05, 0.15, 0.3, 0.45, 0.7, 0.8, 0.95]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.story}
      >
        {preview ? (
          <Image source={preview} style={styles.preview}></Image>
        ) : (
          <Image
            source={fallbackIcon}
            style={{ width: "100%", height: "100%", borderRadius: 50 }}
          ></Image>
        )}
      </LinearGradient>
    </Pressable>
  );
};

export default Story;
