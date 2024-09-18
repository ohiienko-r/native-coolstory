import { Pressable } from "react-native";
import { Icon } from "..";
import { CloseButtonPropTypes } from "./types";
import { styles } from "./CloseButton.styles";

const CloseButton = ({ onPress }: CloseButtonPropTypes) => {
  return (
    <Pressable onPress={onPress} style={styles.closeButton}>
      <Icon.Close />
    </Pressable>
  );
};

export default CloseButton;
