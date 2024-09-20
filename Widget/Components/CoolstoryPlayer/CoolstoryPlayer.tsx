import { useRef, useState } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import {
  Pressable,
  LayoutChangeEvent,
  GestureResponderEvent,
} from "react-native";
import { CoolstoryPlayerPropTypes } from "./types";
import { styles } from "./CoolstoryPlayer.styles";

const CoolstoryPlayer = ({ uri }: CoolstoryPlayerPropTypes) => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [viewWidth, setViewWidth] = useState(0);
  const video = useRef<React.ElementRef<typeof Video>>(null);

  const isPlaying = (
    status: AVPlaybackStatus | null
  ): status is AVPlaybackStatusSuccess => {
    return (
      status != null && (status as AVPlaybackStatusSuccess).isPlaying === true
    );
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setViewWidth(width);
  };

  const handleLongPress = () => {
    if (isPlaying(status)) {
      video.current?.pauseAsync();
    }
  };
  const handlePressIn = (e: GestureResponderEvent) => {
    const { locationX } = e.nativeEvent;

    const leftZone = viewWidth * 0.2;
    const rightZone = viewWidth * 0.8;

    if (locationX < leftZone) {
      handleLeftPress();
    } else if (locationX > rightZone) {
      handleRightPress();
    }
  };

  const handlePressOut = () => {
    video.current?.playAsync();
  };

  const handleRightPress = () => {
    console.log("Go forward");
  };

  const handleLeftPress = () => {
    console.log("Go back");
  };

  return (
    <Pressable
      style={styles.container}
      onLayout={onLayout}
      delayLongPress={100}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Video
        ref={video}
        source={{ uri: uri }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        style={styles.video}
      />
    </Pressable>
  );
};

export default CoolstoryPlayer;
