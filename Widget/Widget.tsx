import { useState } from "react";
import { View, Text, Button } from "react-native";
import { Story, Dialog } from "./Components";
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
    <View style={styles.storyList}>
      <Story preview={placeholder} onPress={handleDialogOpen} />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <Text>This is our awesome Coolstory player!</Text>
        <Button title="Close" onPress={handleDialogClose} />
      </Dialog>
    </View>
  );
};

export default Widget;
