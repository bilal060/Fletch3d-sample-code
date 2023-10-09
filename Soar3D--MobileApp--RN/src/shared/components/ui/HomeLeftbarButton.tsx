import {
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { fontSize } from "shared/constants/resposnevaraiable";

interface HomeLeftBarButton extends TouchableOpacityProps {
  name: string | number;
  Icon: React.ElementType<SVGElement>;
}

export default function HomeLeftbarButton(props: HomeLeftBarButton) {
  const { name, Icon } = props;
  return (
    <TouchableOpacity {...props} style={[style.parentContainer, props.style]}>
      <Icon width={20} height={20} color="#fff" />
      <Text style={style.headingText}>{name}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  parentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  headingText: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontSize: fontSize.fourteen,
    lineHeight: 24,
    letterSpacing: 0.6,
    marginTop: "3.5%",
  },
});
