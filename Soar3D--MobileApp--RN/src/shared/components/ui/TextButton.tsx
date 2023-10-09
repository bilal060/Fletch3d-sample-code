import { TextProps } from "react-native";
import { Text } from "shared/components/ui";

const TextButton = (props: TextProps) => {
  return (
    <Text {...props} style={[{ color: "#7680FF" }, props?.style]}>
      {props.children}
    </Text>
  );
};

export default TextButton;
