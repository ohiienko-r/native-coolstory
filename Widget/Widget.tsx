import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Story, Dialog, CoolstoryPlayer } from "./Components";
import { styles } from "./Widget.styles";

const placeholder = require("../assets/placeholder.jpg");

const videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

const Widget = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
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
        <Story preview={placeholder} onPress={handleDialogOpen} />
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <CoolstoryPlayer uri={videoUri} />
        </Dialog>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Widget;
