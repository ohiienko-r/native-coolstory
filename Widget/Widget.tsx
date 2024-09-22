import { useState, useRef } from "react";
import { ScrollView, View, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoryPreviewButton, Dialog, CoolstoryPlayer } from "./Components";
import { Story, RenderItemPropTypes, ScrollToIndexInfo } from "./types";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { styles } from "./Widget.styles";

const placeholder = require("../assets/placeholder.jpg");

const data: Story[] = [
  {
    id: 0,
    uri: [
      {
        key: 0,
        type: "video",
        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
      {
        key: 1,
        type: "video",
        uri: "https://cdn.pixabay.com/video/2024/09/06/230060_small.mp4",
      },
      {
        key: 2,
        type: "video",
        uri: "https://cdn.pixabay.com/video/2024/08/20/227567_small.mp4",
      },
    ],
  },
  {
    id: 1,
    preview: placeholder,
    uri: [
      {
        key: 0,
        type: "video",
        uri: "https://cdn.pixabay.com/video/2024/09/06/230060_small.mp4",
      },
    ],
  },
  {
    id: 2,
    preview: placeholder,
    uri: [
      {
        key: 0,
        type: "video",
        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      },
    ],
  },
];

const { width: windowWidth } = Dimensions.get("window");

const Widget = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleDialogOpen = (index: number) => {
    setCurrentStoryIndex(index);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentStoryIndex(null);
  };

  const handleGetItemLayout = (_data: any, index: number) => ({
    length: windowWidth,
    offset: windowWidth * index,
    index,
  });

  const handleKeyExtraction = (item: Story) => item.id.toString();

  const renderItem = ({ item, index }: RenderItemPropTypes) => (
    <View style={{ width: windowWidth }}>
      <CoolstoryPlayer
        stories={item.uri}
        isActive={currentStoryIndex === index}
      />
    </View>
  );

  const handleOnScrollToIndexFailed = (info: ScrollToIndexInfo) => {
    console.warn("Scroll to index failed:", info);
    if (currentStoryIndex !== null) {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };

  const handleOnMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.floor(e.nativeEvent.contentOffset.x / windowWidth);
    setCurrentStoryIndex(index);
  };

  const inititalScrollIndex =
    currentStoryIndex !== null
      ? Math.min(currentStoryIndex, data.length - 1)
      : 0;

  return (
    <SafeAreaProvider>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storyList}
        contentContainerStyle={styles.contentContainer}
      >
        {data?.map((story, index) => (
          <StoryPreviewButton
            key={story.id}
            preview={story.preview}
            onPress={() => handleDialogOpen(index)}
          />
        ))}
      </ScrollView>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={handleGetItemLayout}
          keyExtractor={handleKeyExtraction}
          renderItem={renderItem}
          initialScrollIndex={inititalScrollIndex}
          onScrollToIndexFailed={handleOnScrollToIndexFailed}
          onMomentumScrollEnd={handleOnMomentumScrollEnd}
        />
      </Dialog>
    </SafeAreaProvider>
  );
};

export default Widget;
