import { Modal, SafeAreaView } from "react-native";
import { DialogPropTypes } from "./types";

const Dialog = ({ open, onClose, children }: DialogPropTypes) => {
  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <SafeAreaView>{children}</SafeAreaView>
    </Modal>
  );
};

export default Dialog;
