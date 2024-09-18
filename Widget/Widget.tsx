import { useState } from "react";
import { ScrollView, Button } from "react-native";
import { Story, Dialog, CoolstoryPlayer, CloseButton } from "./Components";
import { styles } from "./Widget.styles";

const placeholder = require("../assets/placeholder.jpg");

const videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

const localVideo = require("../assets/temp/0.mp4");

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
        <CoolstoryPlayer uri={videoUri} />
        <Button title="Close" onPress={handleDialogClose} />
      </Dialog>
    </ScrollView>
  );
};

export default Widget;
