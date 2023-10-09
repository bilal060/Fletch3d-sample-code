import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Camera } from "react-native-vision-camera";
import { scalableheight } from "shared/constants/resposnevaraiable";
import useVideo from "./useVideo";
import {
  FlashOff,
  Flash,
  StartRecording,
  StopRecording,
  VideoSynch,
} from "assets/icons";
import { X } from "react-native-feather";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Video = () => {
  const {
    cameraPermission,
    camera,
    navigateBack,
    startRecording,
    stopRecording,
    isVideoRecording,
    switchCamera,
    cameraMode,
    cameraActive,
    switchFlash,
    isFlash,
    panGesture,
  } = useVideo();

  return (
    <GestureDetector gesture={panGesture}>
      <View style={style.parentContainer}>
        <StatusBar hidden={true} />
        {cameraMode && cameraPermission === "authorized" ? (
          <Camera
            device={cameraMode}
            isActive={cameraActive}
            video={true}
            ref={camera}
            style={{ width: "100%", height: "100%" }}
          />
        ) : // <ActivityIndicator size="large" color="white" />
        null}
        <TouchableOpacity
          style={style.topHeaderContainer}
          onPress={navigateBack}
        >
          <X color="#000" />
        </TouchableOpacity>

        <View style={style.bottomContainer}>
          <TouchableOpacity onPress={() => switchCamera()}>
            <VideoSynch />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isVideoRecording == false ? startRecording() : stopRecording();
            }}
          >
            {isVideoRecording === true ? <StopRecording /> : <StartRecording />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchFlash()}>
            {isFlash === "on" ? (
              <Flash width={24} height={24} />
            ) : (
              <FlashOff width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
};

const style = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  topHeaderContainer: {
    position: "absolute",
    top: scalableheight.four,
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 6,
    left: "5.3%",
    borderRadius: 10,
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
});
export default Video;
