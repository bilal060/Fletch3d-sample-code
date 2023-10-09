import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ArrowLeft } from "react-native-feather";
import { SvgProps } from "react-native-svg";

interface HeaderBackButtonProps extends TouchableOpacityProps {
  iconProps?: SvgProps;
}

const HeaderBackButton = (props: HeaderBackButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        { justifyContent: "center", alignItems: "center", padding: 8 },
        props.style,
      ]}
    >
      <ArrowLeft color="#000" {...props?.iconProps} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
