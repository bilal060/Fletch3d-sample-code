import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import Text from "./Text";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  textStyle?: TextStyle;
}

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 8,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB617A",
  },
  text: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
});

export default Button;
