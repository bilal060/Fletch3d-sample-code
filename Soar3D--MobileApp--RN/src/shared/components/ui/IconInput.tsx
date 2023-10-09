import {
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Text from "./Text";

interface CheckBoxItemProps {
  label: string;
  category: string;
  onPress?: () => void;
  buttonLabel?: string;
  placeholder?: string;
  value: string;
  editable: boolean;
  onChangeText?: (value: string, name: string) => void;
  Icon: React.ElementType<SVGElement>;
  keyName: string;
  onPressIn?: () => void;
}

const IconInput = (props: CheckBoxItemProps): JSX.Element => {
  const {
    label,
    category,
    buttonLabel,
    placeholder,
    onPress,
    value,
    editable,
    onChangeText,
    Icon,
    keyName,
    onPressIn,
  } = props;
  return (
    <View style={styles.checkBoxRow}>
      <View style={styles.checkBoxContainer}>
        <Icon
          color="#9E9E9E"
          width={20}
          height={20}
          style={{ marginRight: 12 }}
        />
        <Text>{label}</Text>
      </View>
      <TextInput
        editable={editable}
        placeholder={placeholder}
        style={styles.buttonLabel}
        value={value}
        onChangeText={(text) => {
          if (onChangeText) onChangeText(text, keyName);
        }}
        onPressIn={onPressIn}
      >
        {/* {buttonLabel} */}
      </TextInput>
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
    width: "40%",
  },
  checkBox: {
    width: 34,
    height: 34,
    backgroundColor: "#F4F6F6",
    borderRadius: 8,
    marginRight: 12,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  buttonLabel: {
    color: "#7E7D7D",
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
});

export default IconInput;
