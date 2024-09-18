import { useState } from "react";
import { ScrollView } from "react-native";
import { Story, Dialog, AmpStoryPlayer } from "./Components";
import { styles } from "./Widget.styles";

const placeholder = require("../assets/placeholder.jpg");

const Widget = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.storyList}
      contentContainerStyle={styles.contentContainer}
    >
      <Story preview={placeholder} onPress={handleDialogOpen} />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <AmpStoryPlayer
          onClose={handleDialogClose}
          storyHref="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
        />
      </Dialog>
    </ScrollView>
  );
};

export default Widget;
