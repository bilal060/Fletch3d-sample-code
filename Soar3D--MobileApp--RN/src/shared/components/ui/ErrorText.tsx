import { Text as NativeText, StyleSheet, TextProps } from "react-native";

const ErrorText = (props: TextProps) => {
  return (
    <NativeText {...props} style={[styles.text, props.style]}>
      {props.children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginVertical: 4,
    color: "#EB617A",
  },
});

export default ErrorText;
