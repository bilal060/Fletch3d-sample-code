import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Dispatch,
  ForwardedRef,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus } from "react-native";
import Video, { OnLoadData, VideoProperties } from "react-native-video";

interface VideoPlayerProps extends VideoProperties {
  width: number;
  height: number;
  currentIndex: number;
  activeIndex: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setPauseVideo: Dispatch<SetStateAction<boolean>>;
  pauseVideo: boolean;
  handlePlayVideo: () => void;
  canRestartVideo: boolean;
  setCanRestartVideo: Dispatch<SetStateAction<boolean>>;
}

const VideoPlayer = forwardRef(
  (props: VideoPlayerProps, videoRef: ForwardedRef<Video>) => {
    const {
      width,
      height,
      setIsLoading,
      setPauseVideo,
      currentIndex,
      activeIndex,
      pauseVideo,
      canRestartVideo,
      setCanRestartVideo,
    } = props;
    const [isCurrentPostActive, setCurrentPostActive] = useState(
      currentIndex === activeIndex
    );
    const appState = useRef<AppStateStatus>(AppState.currentState);

    useEffect(() => {
      setCurrentPostActive(props.activeIndex === props.currentIndex);

      return () => {
        setIsLoading(true);
        setPauseVideo(true);
      };
    }, [props.activeIndex]);

    useEffect(() => {
      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );

      return () => {
        subscription.remove();
      };
    }, []);

    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        handleStopVideo();
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        props.handlePlayVideo();
      }

      appState.current = nextAppState;
    };

    const handleVideoLoad = (_: OnLoadData) => {
      if (videoRef && "current" in videoRef && videoRef.current) {
        if (isCurrentPostActive) {
          videoRef.current.seek(0);
          props.handlePlayVideo();
          setIsLoading(false);
        }
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleStopVideo = () => {
      setPauseVideo(true);
    };

    const handleEndVideo = () => {
      setPauseVideo(true);
      setIsLoading(true);
      setCanRestartVideo(true);
    };

    return (
      <>
        {isCurrentPostActive && !canRestartVideo ? (
          <Video
            {...props}
            repeat={false}
            fullscreen={false}
            resizeMode="cover"
            onLoad={handleVideoLoad}
            paused={pauseVideo}
            onLoadStart={handleLoadStart}
            onEnd={handleEndVideo}
            ref={videoRef}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width,
              height,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        ) : null}
      </>
    );
  }
);

export default VideoPlayer;
