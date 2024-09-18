import { useRef, useState } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { View, Button } from "react-native";
import { CoolstoryPlayerPropTypes } from "./types";
import { styles } from "./CoolstoryPlayer.styles";

const CoolstoryPlayer = ({ uri }: CoolstoryPlayerPropTypes) => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const video = useRef<React.ElementRef<typeof Video>>(null);

  //   const isPlaying = (
  //     status: AVPlaybackStatus | null
  //   ): status is AVPlaybackStatusSuccess => {
  //     return (
  //       status != null &&
  //       (status as AVPlaybackStatusSuccess).isPlaying !== undefined
  //     );
  //   };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={{ uri: uri }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        style={styles.video}
      />
    </View>
  );
};

export default CoolstoryPlayer;
