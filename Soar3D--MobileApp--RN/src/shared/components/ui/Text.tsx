import React from "react";
import { Text as NativeText, StyleSheet, TextProps } from "react-native";
import { fontSize } from "shared/constants/resposnevaraiable";

const Text = (props: TextProps) => {
  return (
    <NativeText {...props} style={[styles.text, props.style]}>
      {props.children}
    </NativeText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#7E7D7D",
  },
});

export default Text;
