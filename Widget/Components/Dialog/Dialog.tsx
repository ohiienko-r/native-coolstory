import { Modal, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GestureRecognizer from "react-native-swipe-gestures";
import CloseButton from "../CloseButton/CloseButton";
import { DialogPropTypes } from "./types";
import { styles } from "./Dialog.styles";

const Dialog = ({ open, onClose, children }: DialogPropTypes) => {
  const insets = useSafeAreaInsets();

  return (
    <GestureRecognizer style={{ flex: 1 }} onSwipeDown={onClose}>
      <Modal animationType="slide" visible={open} onRequestClose={onClose}>
        <SafeAreaView style={{ flex: 1 }}>
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
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
};

export default Dialog;
