import { VideoPlay } from "assets/icons";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

const LibraryPlayButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props} style={styles.playButtonContainer}>
      <VideoPlay />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButtonContainer: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});

export default LibraryPlayButton;
