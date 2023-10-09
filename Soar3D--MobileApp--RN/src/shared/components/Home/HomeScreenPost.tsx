import {
  ArrowLeft,
  ColouredFire,
  ColouredStar,
  Fire,
  Star,
  ThreeDots,
} from "assets/icons";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Video from "react-native-video";
import ViewerBtn from "../ui/ViewerBtn";
import LibraryPlayButton from "../Library/LibraryPlayButton";
import { Text } from "../ui";
import HomeLeftbarButton from "../ui/HomeLeftbarButton";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";
import { IPost, PostActionTypes } from "shared/types/feed/post.type";
import VideoPlayer from "../Video/VideoPlayer";
import VideoBackground from "../Video/VideoBackground";
import { IPostDefaultProps } from "shared/types/post/post.type";
import BottomTab from "../Video/BottomTab";
import { IScanListModel } from "shared/types/myScans/myScans.type";
import { Alert } from "react-native";
import VideoDetailsModal from "../Video/VideoDetailsModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface HomeAndItemCommonProps extends IPost {
  defaultProps: IPostDefaultProps;
  handleGoBack: () => void;
  handleViewModel: (model: IScanListModel) => void;
  canDelete?: boolean;
  actionOnPost: (type: PostActionTypes, post_id: string) => void;
}

interface PostItemProps extends HomeAndItemCommonProps {
  handlePlayVideo: () => void;
  showPlayVideoButton: boolean;
  handleDelete?: () => void;
  activeIndex: number;
  isLiked: boolean;
  isStarred: boolean;
  handleLike: () => void;
  handleStar: () => void;
}

interface HomeScreenPostProps extends HomeAndItemCommonProps {
  activeIndex: number;
  currentIndex: number;
  handleDelete?: (id: string) => void;
  userId: string;
}

export const PostItems = (props: PostItemProps) => {
  const {
    defaultProps: {
      width,
      height,
      LibraryOverLayFrame,
      bottom,
      bottomNavigation,
      top,
      // showScanDetails,
      // bottomSheet,
    },
    isLiked,
    isStarred,
    handleLike,
    handleStar,
  } = props;
  const bottomSheet = useRef<BottomSheetModal>(null);
  const showScanDetails = () => {
    bottomSheet.current?.present();
  };

  const model = props.scan_id?.model_id as IScanListModel;

  const handleViewModel = () => {
    if (model.status.toLowerCase() !== "completed")
      return Alert.alert(
        `Cannot view a ${model.status.toLowerCase()} scan model`
      );
    props.handleViewModel(model);
  };

  useEffect(() => {
    bottomSheet.current?.close();
  }, [props.activeIndex]);

  return (
    <ImageBackground
      source={LibraryOverLayFrame}
      style={{ position: "absolute", width, height }}
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
            <ViewerBtn onPress={handleViewModel} />
          </View>
          {props.showPlayVideoButton && (
            <View style={styles.PlayBtnContaner}>
              <LibraryPlayButton onPress={props.handlePlayVideo} />
            </View>
          )}
          <View style={styles.BottomHeadingContainer}>
            <View style={styles.childBottomContainer}>
              <View style={styles.headingimageContiner}>
                <Image
                  resizeMode="cover"
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                  source={{ uri: props.user_id?.profile_img?.url }}
                />
                <Text style={styles.parentTextContainer}>
                  <Text style={styles.headingText}>
                    {props.user_id?.full_name + " "}
                  </Text>

                  {/* <Text style={styles.normalText}>@{props.user_id?.email}</Text> */}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.headingText,
                  marginTop: 6,
                  fontWeight: "bold",
                }}
              >
                {props.title}
              </Text>
              <Text
                style={{
                  ...styles.headingText,
                  marginTop: 6,
                  fontSize: fontSize.twelve,
                  width: "80%",
                  lineHeight: 16,
                }}
              >
                {props.description}
              </Text>
            </View>
            <View style={styles.leftBarTab}>
              <HomeLeftbarButton
                Icon={isLiked ? ColouredFire : Fire}
                name={props.total_likes ?? 0}
                onPress={handleLike}
              />
              {/* <HomeLeftbarButton
                Icon={MessageSquare}
                name={props.total_comments ?? 0}
              /> */}
              <HomeLeftbarButton
                Icon={isStarred ? ColouredStar : Star}
                name="Star"
                onPress={handleStar}
              />
              {/* <HomeLeftbarButton Icon={Share} name="Share" /> */}
              <HomeLeftbarButton
                Icon={ThreeDots}
                name=""
                onPress={showScanDetails}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <BottomTab activeIcon="Videos" bottomNavigation={bottomNavigation} />
        </View>
      </View>
      <VideoDetailsModal
        snapPoints={["38%", "60%"]}
        bottomSheetModalRef={bottomSheet}
        location={props.scan_id?.location.name ?? "Not provided"}
        modelStatus={model?.status || "Not provided"}
        category={props.scan_id?.category ?? "Not provided"}
        createdAt={props.created_at}
        captureIntent={props.scan_id?.scan_capture_intent ?? "Not provided"}
        handleViewModel={handleViewModel}
        showLocation={false}
        isScan={false}
        canDelete={props.canDelete}
        handleDelete={props.handleDelete}
        likes={props.total_likes || 0}
        isLiked={isLiked}
        starred={isStarred}
        handleLike={handleLike}
        handleStar={handleStar}
      />
    </ImageBackground>
  );
};

const HomeScreenPost = (props: HomeScreenPostProps) => {
  const [pauseVideo, setPauseVideo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [canRestartVideo, setCanRestartVideo] = useState(false);
  const [likedData, setLikedData] = useState({
    likes: props.total_likes ?? 0,
    isLiked:
      props.like_ids !== undefined &&
      props.like_ids.length > 0 &&
      props.like_ids.some(
        (item) => item?.user_id && item?.user_id === props.userId
      ),
  });
  const [starredData, setStarredData] = useState({
    starred: props.total_stars ?? 0,
    isStarred:
      props.starred_by !== undefined &&
      props.starred_by.length > 0 &&
      props.starred_by.includes(props.userId),
  });

  const videoRef = useRef<Video>(null);

  const {
    defaultProps: { width, height },
    actionOnPost,
  } = props;

  // Also needed to show play button
  const handlePlayVideo = () => {
    setPauseVideo(false);
    if (canRestartVideo) setCanRestartVideo(false);
  };

  const handleDelete = () => {
    if (props.handleDelete) props.handleDelete(props._id);
  };

  const handleLikePost = () => {
    actionOnPost("like", props._id);
    setLikedData((prevState) => ({
      isLiked: !prevState.isLiked,
      likes: prevState.isLiked ? prevState.likes - 1 : prevState.likes + 1,
    }));
  };

  const handleStarPost = () => {
    actionOnPost("star", props._id);
    setStarredData((prevState) => ({
      isStarred: !prevState.isStarred,
      starred: prevState.isStarred
        ? prevState.starred - 1
        : prevState.starred + 1,
    }));
  };

  return (
    <View style={{ flex: 1, width, height, position: "relative" }}>
      <>
        <VideoPlayer
          source={{ uri: props.scan_id?.input_videos[0].url ?? "" }}
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
            thumbnail={props.scan_id?.input_videos[0].thumbnail ?? ""}
          />
        )}
        <PostItems
          {...props}
          handlePlayVideo={handlePlayVideo}
          showPlayVideoButton={pauseVideo}
          canDelete={props.canDelete}
          handleDelete={handleDelete}
          total_likes={likedData.likes}
          isLiked={likedData.isLiked}
          isStarred={starredData.isStarred}
          total_stars={starredData.starred}
          handleLike={handleLikePost}
          handleStar={handleStarPost}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },

  parentchildContainer: {
    paddingLeft: "5.3%",
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
    paddingRight: "2.3%",
  },
  searchimage: {
    tintColor: "white",
    height: "100%",
    width: "7%",
    //backgroundColor: "red",
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
    width: "100%",
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
  normalText: {
    color: "#C4C4C4",
    fontWeight: "300",
    fontFamily: "Poppins-Regular",
    fontSize: fontSize.eleven,
    lineHeight: 18,
    letterSpacing: 0.4,
  },
  leftBarTab: {
    height: scalableheight.twentyfour,
    alignItems: "center",
    justifyContent: "space-between",
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
  bottomTabHomeContainer: {
    alignItems: "center",
  },
  homeIconBorder: {
    width: 16,
    height: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 6,
  },
  bottomTabImage: {
    marginBottom: 6,
  },
  goBackButton: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreenPost;
