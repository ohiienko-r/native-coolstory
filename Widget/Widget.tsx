import { useState, useRef } from "react";
import { ScrollView, View, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoryPreviewButton, Dialog, CoolstoryPlayer } from "./Components";
import { Story } from "./types";
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
          getItemLayout={(_data, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index,
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={{ width: windowWidth }}>
              <CoolstoryPlayer
                stories={item.uri}
                isActive={currentStoryIndex === index}
              />
            </View>
          )}
          initialScrollIndex={
            currentStoryIndex !== null
              ? Math.min(currentStoryIndex, data.length - 1)
              : 0
          }
          onScrollToIndexFailed={(info) => {
            console.warn("Scroll to index failed:", info);
            if (currentStoryIndex !== null) {
              flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            }
          }}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(
              event.nativeEvent.contentOffset.x / windowWidth
            );
            setCurrentStoryIndex(index);
          }}
        />
      </Dialog>
    </SafeAreaProvider>
  );
};

export default Widget;
