import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native";

interface IconButtonProps extends TouchableOpacityProps {
  label: string;
  Icon?: JSX.Element;
  propTextStyle?: TextStyle;
  loading?: boolean;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          ...styles.button,
          backgroundColor: props.loading ? "#eee" : "#7680FF",
        },
        props.style,
      ]}
    >
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={{ ...styles.text, ...props.propTextStyle }}>
            {props.label}
          </Text>
          {props.Icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    marginRight: 8,
  },
});

export default IconButton;
