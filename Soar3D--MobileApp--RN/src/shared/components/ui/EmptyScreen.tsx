import {
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  useWindowDimensions,
} from "react-native";
import Text from "./Text";

interface EmptyScreenProps extends ViewProps {
  label: string;
  textStyle?: TextStyle;
}

const EmptyScreen = (props: EmptyScreenProps) => {
  return (
    <View {...props} style={[styles.emptyScreen, props.style]}>
      <Text style={[styles.emptyScreenText, props.textStyle]}>
        {props.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
    width: "100%",
  },
  emptyScreenText: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default EmptyScreen;
