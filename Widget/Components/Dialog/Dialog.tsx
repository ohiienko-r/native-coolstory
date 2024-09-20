import { Modal, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CloseButton from "../CloseButton/CloseButton";
import { DialogPropTypes } from "./types";
import { styles } from "./Dialog.styles";

const Dialog = ({ open, onClose, children }: DialogPropTypes) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <View
        style={[
          styles.dialog,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <CloseButton onPress={onClose} />
        {children}
      </View>
    </Modal>
  );
};

export default Dialog;
