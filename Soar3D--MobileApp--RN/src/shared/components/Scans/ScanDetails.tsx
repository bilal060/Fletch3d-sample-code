import {
  ArrowLeft,
  Delete,
  Fire,
  MessageSquare,
  Search,
  Share,
  Star,
  ThreeDots,
} from "assets/icons";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  IMyScansList,
  IScanListModel,
} from "shared/types/myScans/myScans.type";
import { IPostDefaultProps } from "shared/types/post/post.type";
import ViewerBtn from "../ui/ViewerBtn";
import LibraryPlayButton from "../Library/LibraryPlayButton";
import { Text } from "../ui";
import { fontSize } from "shared/constants/resposnevaraiable";
import HomeLeftbarButton from "../ui/HomeLeftbarButton";
import { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import VideoBackground from "../Video/VideoBackground";
import VideoPlayer from "../Video/VideoPlayer";
import { normalizeHeight } from "shared/utils/dimension";
import BottomTab from "../Video/BottomTab";
import { useNavigation } from "@react-navigation/native";
import VideoDetailsModal from "../Video/VideoDetailsModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface ScanDetailProps extends IMyScansList {
  defaultProps: IPostDefaultProps;
  activeIndex: number;
  currentIndex: number;
  handleGoBack: () => void;
  handleViewModel: (model: IScanListModel) => void;
  handleDelete: (id: string) => void;
}

interface ScanDeatilsItemsProp extends ScanDetailProps {
  showPlayVideoButton: boolean;
  handlePlayVideo: () => void;
  activeIndex: number;
}

const ScanDetailsItems = (props: ScanDeatilsItemsProp) => {
  const {
    defaultProps: {
      width,
      height,
      LibraryOverLayFrame,
      bottom,
      bottomNavigation,
      top,
      activeIconName,
      // bottomSheet,
      // showScanDetails,
    },
    activeIndex,
  } = props;
  const model = props.model_id as IScanListModel;
  const bottomSheet = useRef<BottomSheetModal>(null);

  useEffect(() => {
    bottomSheet.current?.close();
  }, [props.activeIndex]);

  const showScanDetails = () => {
    bottomSheet.current?.present();
  };

  const handleViewModel = () => {
    props.handleViewModel(model);
  };

  const handleDelete = () => {
    props.handleDelete(props._id);
  };

  return (
    <ImageBackground
      source={LibraryOverLayFrame}
      style={{ position: "absolute", width, height, zIndex: 100 }}
    >
      <View
        style={[
          styles.parentchildContainer,
          { paddingTop: top, paddingBottom: bottom },
        ]}
      >
        <View style={{ width: "100%", height: "90%" }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.goBackButton}
              onPress={props.handleGoBack}
            >
              <ArrowLeft />
            </TouchableOpacity>
            {model.status.toLowerCase() === "completed" && (
              <ViewerBtn onPress={handleViewModel} />
            )}
          </View>
          {props.showPlayVideoButton && (
            <View style={styles.PlayBtnContaner}>
              <LibraryPlayButton onPress={props.handlePlayVideo} />
            </View>
          )}
          <View style={styles.BottomHeadingContainer}>
            <View style={styles.childBottomContainer}>
              <Text
                style={{
                  ...styles.headingText,
                  marginTop: 6,
                  fontWeight: "bold",
                }}
              >
                {props.scan_name}
              </Text>
            </View>
            <View style={styles.leftBarTab}>
              <HomeLeftbarButton
                Icon={Delete}
                name="Delete"
                style={styles.deleteButton}
                onPress={handleDelete}
              />
              <HomeLeftbarButton
                Icon={ThreeDots}
                name=""
                onPress={showScanDetails}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <BottomTab
            bottomNavigation={bottomNavigation}
            activeIcon={activeIconName}
          />
        </View>
      </View>
      <VideoDetailsModal
        snapPoints={["47%", "60%"]}
        bottomSheetModalRef={bottomSheet}
        location={props?.location.name ?? "Not provided"}
        modelStatus={model?.status ?? "Not provided"}
        category={props?.category ?? "Not provided"}
        createdAt={props.created_at}
        captureIntent={props?.scan_capture_intent ?? "Not provided"}
        handleViewModel={handleViewModel}
        isScan={true}
        canView={model.status.toLowerCase() === "completed"}
        canDelete={true}
        handleDelete={handleDelete}
      />
    </ImageBackground>
  );
};

const ScanDetails = (props: ScanDetailProps) => {
  const [pauseVideo, setPauseVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [canRestartVideo, setCanRestartVideo] = useState(false);
  const [screenClosed, setScreenClosed] = useState(false);
  const navigation = useNavigation();

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const cleanup = () => {
      setScreenClosed(true);
      setPauseVideo(true);
    };

    const onScreenFocus = () => {
      setScreenClosed(false);
    };

    const unsubscribeBlur = navigation.addListener("blur", cleanup);
    const unsubscribeFocus = navigation.addListener("focus", onScreenFocus);

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation]);

  const {
    defaultProps: { width, height },
  } = props;

  // Also needed to show play button
  const handlePlayVideo = () => {
    setPauseVideo(false);
    if (canRestartVideo) setCanRestartVideo(false);
  };
  return (
    <View
      style={{
        flex: 1,
        width,
        height,
        position: "relative",
      }}
    >
      {!screenClosed && (
        <>
          <VideoPlayer
            source={{ uri: props.input_videos[0].url }}
            width={width}
            height={height}
            ref={videoRef}
            ignoreSilentSwitch="obey"
            setIsLoading={setIsLoading}
            setPauseVideo={setPauseVideo}
            currentIndex={props.currentIndex}
            activeIndex={props.activeIndex}
            pauseVideo={pauseVideo}
            handlePlayVideo={handlePlayVideo}
            canRestartVideo={canRestartVideo}
            setCanRestartVideo={setCanRestartVideo}
          />
          {isLoading && (
            <VideoBackground
              width={width}
              height={height}
              thumbnail={props.input_videos[0].thumbnail}
            />
          )}
        </>
      )}
      <ScanDetailsItems
        {...props}
        handlePlayVideo={handlePlayVideo}
        showPlayVideoButton={pauseVideo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },

  parentchildContainer: {
    paddingLeft: "5.3%",
    paddingRight: "2%",
    marginTop: "4%",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "3.9%",
    position: "absolute",
    zIndex: 200000,
    paddingRight: "2.3%",
  },
  PlayBtnContaner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomHeadingContainer: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: 0,
    // backgroundColor: "red",
    width: "100%",
  },
  childBottomContainer: {
    width: "80%",
  },
  headingimageContiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  parentTextContainer: {
    marginLeft: 6,
    marginTop: 6,
  },
  headingText: {
    color: "white",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    fontSize: fontSize.sixteen,
    lineHeight: 24,
    letterSpacing: 0.6,
  },

  leftBarTab: {
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "20%",
    alignSelf: "flex-end",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "8%",
    alignSelf: "center",
    width: "60%",
    left: "-0.5%",
  },
  deleteButton: {
    marginBottom: normalizeHeight(12),
  },
  goBackButton: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScanDetails;
