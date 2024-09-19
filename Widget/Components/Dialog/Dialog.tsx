import { Modal, SafeAreaView } from "react-native";
import CloseButton from "../CloseButton/CloseButton";
import { DialogPropTypes } from "./types";
import { styles } from "./Dialog.styles";

const Dialog = ({ open, onClose, children }: DialogPropTypes) => {
  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <SafeAreaView style={styles.dialog}>
        <CloseButton onPress={onClose} />
        {children}
      </SafeAreaView>
    </Modal>
  );
};

export default Dialog;
