import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./Text";
import { fontSize } from "shared/constants/resposnevaraiable";

interface OutlinedButtonProps extends TouchableOpacityProps {
  label: string;
}

const OutlinedButton = (props: OutlinedButtonProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text style={styles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColo: "#DFDFDF",
  },
  buttonText: {
    fontSize: fontSize.ten,
  },
});

export default OutlinedButton;
