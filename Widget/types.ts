import { ImageSourcePropType } from "react-native";
import { MEDIA_TYPE } from "./Widget.dto";

type Media = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];

export type StoryUri = {
  key: number;
  type: Media;
  uri: string;
};

export type Story = {
  id: number;
  uri: StoryUri[];
  preview?: ImageSourcePropType;
};
