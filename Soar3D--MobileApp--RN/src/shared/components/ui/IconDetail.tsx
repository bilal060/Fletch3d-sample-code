import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./Text";

type IconDetailProps = {
  label: string | undefined;
  onPress?: () => void;
  buttonLabel?: string;
  value?: string;
  Icon: JSX.Element;
};

const IconDetial = ({
  label,
  value,
  onPress,
  buttonLabel,
  Icon,
}: IconDetailProps): JSX.Element => {
  return (
    <View style={styles.checkBoxRow}>
      <View style={styles.checkBoxContainer}>
        {/* Following View to be replaced with icons when provided  */}
        {Icon}
        <Text style={styles.text}>{label}</Text>
      </View>
      <TouchableOpacity
        disabled={value !== undefined || !onPress}
        style={styles.button}
        onPress={onPress}
      >
        {/* {value ? (
          <Text>{value}</Text> */}

        {value ? (
          <Text style={styles.text}>{value}</Text>
        ) : (
          <Text style={styles.buttonLabel}>{buttonLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  checkBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderColor: "#F1F3F3",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkBox: {
    width: 34,
    height: 34,
    backgroundColor: "#F4F6F6",
    borderRadius: 8,
    marginRight: 12,
  },
  button: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonLabel: {
    color: "#6941C6",
  },
  text: { fontSize: 12 },
});

export default IconDetial;
