import { useRef, useState, useCallback, useEffect } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import {
  View,
  Text,
  Pressable,
  GestureResponderEvent,
  LayoutChangeEvent,
} from "react-native";
import { ProgressBar } from "..";
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

      if (locationX < viewWidth * 0.2) {
        handleLeftPress();
      } else if (locationX > viewWidth * 0.8) {
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
      if (prevStory < stories.length - 1) {
        return prevStory + 1;
      }
      return prevStory;
    });
  }, [stories.length]);

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
    if (videoRef.current) {
      videoRef.current.loadAsync(
        { uri: stories[currentStory].uri },
        { shouldPlay: true }
      );
    }
  }, [currentStory, stories]);

  if (stories.length === 0)
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Oops! Nothing to display yet.</Text>
      </View>
    );

  return (
    <View style={styles.playerContainer}>
      <ProgressBar stories={stories} currentStory={currentStory} />
      <Pressable
        style={styles.videoContainer}
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
