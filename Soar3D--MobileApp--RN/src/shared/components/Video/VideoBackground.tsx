import { ImageBackground } from "react-native";

type VideoBackgroundProps = {
  width: number;
  height: number;
  thumbnail: string;
};

const VideoBackground = ({
  width,
  height,
  thumbnail,
}: VideoBackgroundProps) => {
  return (
    <ImageBackground source={{ uri: thumbnail }} style={{ width, height }} />
  );
};

export default VideoBackground;
