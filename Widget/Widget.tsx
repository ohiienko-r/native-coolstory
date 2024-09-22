import { useState } from "react";
import { ScrollView } from "react-native";
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
        uri: "https://cdn.pixabay.com/video/2024/08/20/227567_small.mp4",
      },
    ],
  },
  {
    id: 3,
    preview: placeholder,
    uri: [],
  },
];

const Widget = () => {
  const [story, setSory] = useState<Story>({
    id: NaN,
    preview: undefined,
    uri: [],
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = (story: Story) => {
    setSory(story);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <SafeAreaProvider>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storyList}
        contentContainerStyle={styles.contentContainer}
      >
        {data?.map((story) => (
          <StoryPreviewButton
            key={story.id}
            preview={story.preview}
            onPress={() => handleDialogOpen(story)}
          />
        ))}
      </ScrollView>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <CoolstoryPlayer stories={story.uri} />
      </Dialog>
    </SafeAreaProvider>
  );
};

export default Widget;
