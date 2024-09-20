import { Pressable } from "react-native";
import { Icon } from "..";
import { CloseButtonPropTypes } from "./types";
import { styles } from "./CloseButton.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CloseButton = ({ onPress }: CloseButtonPropTypes) => {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.closeButton, { top: insets.top + 10 }]}
      hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
    >
      <Icon.Close />
    </Pressable>
  );
};

export default CloseButton;
