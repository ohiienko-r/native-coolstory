import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Story, Dialog, CoolstoryPlayer } from "./Components";
import { styles } from "./Widget.styles";

const placeholder = require("../assets/placeholder.jpg");

const data = [
  {
    id: 0,
    preview: placeholder,
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: 1,
    preview: placeholder,
    uri: "https://cdn.pixabay.com/video/2024/09/06/230060_small.mp4",
  },
  {
    id: 2,
    preview: placeholder,
    uri: "https://cdn.pixabay.com/video/2024/08/20/227567_small.mp4",
  },
];

const Widget = () => {
  const [uri, setUri] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = (storyUri: string) => {
    setUri(storyUri);
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
        {data.map((story) => (
          <Story
            key={story.id}
            preview={story.preview}
            onPress={() => handleDialogOpen(story.uri)}
          />
        ))}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <CoolstoryPlayer uri={uri} />
        </Dialog>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Widget;
