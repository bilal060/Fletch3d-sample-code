import { useState } from "react";
import {
  TextInputProps,
  TextInput as NativeTextInput,
  View,
  StyleSheet,
  ViewProps,
} from "react-native";
import { Eye, EyeOff } from "react-native-feather";
import ErrorText from "./ErrorText";

interface MyTextInputProps extends TextInputProps {
  containerProps?: ViewProps;
  error?: string;
  showError?: boolean;
}

const TextInput = (props: MyTextInputProps) => {
  const { textContentType, style, containerProps } = props;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focus, setFocus] = useState(false);

  const isPasswordField = textContentType?.toLowerCase().includes("password");
  const showPassword = passwordVisible || !isPasswordField;

  const containerFocus = {
    borderColor: focus ? "#000" : "#DFDFDF",
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const EyeIcon = () => {
    if (showPassword)
      return <Eye color="black" onPress={() => setPasswordVisible(false)} />;
    return <EyeOff color="black" onPress={() => setPasswordVisible(true)} />;
  };

  return (
    <>
      <View
        {...containerProps}
        style={[
          styles.container,
          focus ? containerFocus : null,
          containerProps?.style,
        ]}
      >
        <NativeTextInput
          secureTextEntry={!showPassword}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
          style={[styles.input, style]}
          placeholderTextColor="rgba(94,93,93,0.5)"
        />
        {isPasswordField ? <EyeIcon /> : null}
      </View>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#transparent",
    borderRadius: 100,
    padding: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(94,93,93,0.5)",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 20,
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
});

export default TextInput;
