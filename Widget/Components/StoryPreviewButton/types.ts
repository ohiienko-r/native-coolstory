import { ImageSourcePropType } from "react-native";

export type StoryPreviewButtonPropTypes = {
  preview?: ImageSourcePropType;
  onPress: () => void;
};
