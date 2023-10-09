import {
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { ArrowRight } from "react-native-feather";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";

export default function ViewerBtn(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props} style={style.parentContainer}>
      <Text style={style.viewerTxt}>Viewer</Text>
      <ArrowRight
        style={{
          marginLeft: "2%",
        }}
        color="#7680FF"
        width={20}
        height={20}
      />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  parentContainer: {
    borderRadius: 11,
    backgroundColor: "#FFFFFF80",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  viewerTxt: {
    color: "#7680FF",
    fontSize: fontSize.eleven,
    fontFamily: "Poppins-Medium",
  },
});
