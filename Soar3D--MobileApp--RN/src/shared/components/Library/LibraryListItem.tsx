import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
  TouchableOpacityProps,
} from "react-native";
import useThemeImages from "assets/images";
import { fontSize } from "shared/constants/resposnevaraiable";
import LibraryPlayButton from "./LibraryPlayButton";

interface LibraryItemProps extends TouchableOpacityProps {
  name: string;
  image: ImageSourcePropType;
  selectName?: string;
}

export default function LibraryListItem(props: LibraryItemProps) {
  const { LibraryOverLayFrame } = useThemeImages();
  return (
    <TouchableOpacity {...props}>
      <ImageBackground
        imageStyle={{ borderRadius: 15 }}
        style={styles.containerView}
        resizeMode="cover"
        source={props.image}
      >
        <ImageBackground
          source={LibraryOverLayFrame}
          resizeMode="cover"
          style={styles.overlayView}
          imageStyle={{ borderRadius: 15 }}
        >
          <LibraryPlayButton />
          <Text numberOfLines={1} style={styles.typeTxt}>
            {props?.name}
          </Text>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  overlayView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  typeTxt: {
    position: "absolute",
    bottom: "4%",
    color: "#DFDFDF90",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    fontSize: fontSize.twelve,
    width: "80%",
    textAlign: "center",
  },
});
