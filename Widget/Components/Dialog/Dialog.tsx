import { Modal, SafeAreaView } from "react-native";
import { DialogPropTypes } from "./types";
import { styles } from "./Dialog.styles";

const Dialog = ({ open, onClose, children }: DialogPropTypes) => {
  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <SafeAreaView style={styles.dialog}>{children}</SafeAreaView>
    </Modal>
  );
};

export default Dialog;
