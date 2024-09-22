import { useRef, useState, useCallback, useEffect } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import {
  View,
  Pressable,
  GestureResponderEvent,
  LayoutChangeEvent,
} from "react-native";
import { CoolstoryPlayerPropTypes } from "./types";
import { styles } from "./CoolstoryPlayer.styles";

const CoolstoryPlayer = ({ stories }: CoolstoryPlayerPropTypes) => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [viewWidth, setViewWidth] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  const videoRef = useRef<React.ElementRef<typeof Video>>(null);

  const isPlaying = useCallback(
    (status: AVPlaybackStatus | null): status is AVPlaybackStatusSuccess => {
      return status != null && (status as AVPlaybackStatusSuccess).isPlaying;
    },
    []
  );

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setViewWidth(width);
  }, []);

  const handleLongPress = useCallback(() => {
    if (isPlaying(status)) {
      videoRef.current?.pauseAsync();
    }
  }, [status]);

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      const { locationX } = e.nativeEvent;
      const leftZone = viewWidth * 0.2;
      const rightZone = viewWidth * 0.8;

      if (locationX < leftZone) {
        handleLeftPress();
      } else if (locationX > rightZone) {
        handleRightPress();
      }
    },
    [viewWidth]
  );

  const handlePressOut = useCallback(() => {
    videoRef.current?.playAsync();
  }, []);

  const handleRightPress = useCallback(() => {
    setCurrentStory((prevStory) => {
      if (stories && prevStory < stories.length - 1) {
        return prevStory + 1;
      }
      return prevStory;
    });
  }, [stories?.length]);

  const handleLeftPress = useCallback(() => {
    setCurrentStory((prevStory) => {
      if (prevStory > 0) {
        return prevStory - 1;
      }
      return prevStory;
    });
  }, []);

  const handlePlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      setStatus(status);

      if ((status as AVPlaybackStatusSuccess).didJustFinish) {
        handleRightPress();
      }
    },
    [handleRightPress]
  );

  useEffect(() => {
    if (stories && videoRef.current) {
      videoRef.current.loadAsync(
        { uri: stories[currentStory].uri },
        { shouldPlay: true }
      );
    }
  }, [currentStory, stories]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.container}
        onLayout={onLayout}
        delayLongPress={100}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Video
          ref={videoRef}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          style={styles.video}
        />
      </Pressable>
    </View>
  );
};

export default CoolstoryPlayer;
