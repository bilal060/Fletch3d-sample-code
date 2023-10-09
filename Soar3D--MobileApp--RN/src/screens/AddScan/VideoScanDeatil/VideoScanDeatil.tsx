import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { scalableheight } from "shared/constants/resposnevaraiable";
import useVideoScanDeatil from "./useVideoScanDeatil";
import Video from "react-native-video";
import { useRoute } from "@react-navigation/native";
import { VideoScanDetailRouteProp } from "shared/navigators/AddScanStackNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft } from "react-native-feather";
import UploadScanDetailsSheet from "shared/components/Scans/UploadScanDetailsSheet";

const VideoScanDeatil = () => {
  const {
    params: { videoUrl },
  } = useRoute<VideoScanDetailRouteProp>();
  const {
    BacktoScreen,
    bottomSheet,
    onChangeText,
    pauseVideo,
    onplayVideo,
    onSubmit,
    videoUploadData,
    scanDetail,
    isScanSubmitting,
    selectProjectAndFolders,
    handleLaterUpload,
  } = useVideoScanDeatil(videoUrl);
  const { top } = useSafeAreaInsets();

  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "5.3%",
          backgroundColor: "#ffffff80",
          padding: 8,
          borderRadius: 4,
          zIndex: 1000,
          top,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          BacktoScreen();
        }}
      >
        <ArrowLeft color="#000" />
      </TouchableOpacity>
      <Video
        source={{ uri: videoUrl?.path }}
        style={{ width: "100%", height: "100%" }}
        repeat={true}
        fullscreen={true}
        resizeMode="cover"
        paused={pauseVideo}
      />
      <UploadScanDetailsSheet
        snapPoints={["10%", "45%", "70%"]}
        bottomSheetModalRef={bottomSheet}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
        scanDetail={scanDetail}
        videoUploadData={videoUploadData}
        isScanSubmitting={isScanSubmitting}
        handleLaterUpload={handleLaterUpload}
        {...selectProjectAndFolders}
      />
    </>
  );
};

const style = StyleSheet.create({
  parentContainer: {
    flex: 1,
    //backgroundColor: "red",
  },
  topHeaderContainer: {
    width: "86%",
    position: "absolute",
    top: scalableheight.six,
    justifyContent: "center",
    alignSelf: "center",
  },
  bottomContainer: {
    width: "86%",
    position: "absolute",
    bottom: scalableheight.three,
    height: scalableheight.tweleve,
    justifyContent: "space-between",
    alignSelf: "center",
    //backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTxtContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
  },
  headingTxt: {
    fontFamily: "Poppins-Regular",
    fontSize: 21,
    fontWeight: "600",
  },
  rightIconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  topNotification: {
    width: 14,
    height: 14,
    paddingHorizontal: 1,
    paddingVertical: 3,
    position: "absolute",
    backgroundColor: "#7680FF",
    borderRadius: 14 / 2,
    bottom: "40%",
    left: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  typeTxt: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    marginLeft: "4%",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: "0.4%",
    padding: "2%",
    //backgroundColor: "red",
  },
  PlayBtnContaner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "12%",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default VideoScanDeatil;
