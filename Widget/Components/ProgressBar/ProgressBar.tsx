import { View } from "react-native";
import { ProgressBarPropTypes } from "./types";
import { styles } from "./ProgressBar.styles";

const StatusBar = ({ stories, currentStory }: ProgressBarPropTypes) => {
  return (
    <View style={styles.progressBar}>
      {stories.map((story, index) => (
        <View
          key={story.key}
          style={[
            styles.indicator,
            index <= currentStory ? styles.active : null,
          ]}
        ></View>
      ))}
    </View>
  );
};

export default StatusBar;
