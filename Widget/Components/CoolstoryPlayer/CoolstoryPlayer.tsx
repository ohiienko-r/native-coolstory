import { useRef, useState } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import {
  View,
  Pressable,
  LayoutChangeEvent,
  GestureResponderEvent,
} from "react-native";
import PagerView from "react-native-pager-view";
import { CoolstoryPlayerPropTypes } from "./types";
import { styles } from "./CoolstoryPlayer.styles";

const CoolstoryPlayer = ({ stories }: CoolstoryPlayerPropTypes) => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [viewWidth, setViewWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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
    if (stories.length < 2) return;

    if (currentPage < stories.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleLeftPress = () => {
    console.log("Go back");
  };

  return (
    <PagerView style={{ flex: 1 }} initialPage={0}>
      {stories.map((story, index) => (
        <View style={styles.container} key={index}>
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
              source={{ uri: story }}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              style={styles.video}
            />
          </Pressable>
        </View>
      ))}
    </PagerView>
  );
};

export default CoolstoryPlayer;
