import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ios = Platform.OS === "ios";

export default function CustomKeyboardView({ children, inChat }) {
  let keyConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    keyConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      {...keyConfig}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        {...scrollViewConfig}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Prevent keyboard dismissal on tap
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}