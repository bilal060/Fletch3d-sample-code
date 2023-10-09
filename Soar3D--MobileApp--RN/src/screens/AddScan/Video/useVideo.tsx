import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  Camera,
  CameraPermissionRequestResult,
  VideoFile,
  useCameraDevices,
} from "react-native-vision-camera";

import { AddScanStackNavigatorProps } from "shared/navigators/AddScanStackNavigator";
import { launchImageLibrary } from "react-native-image-picker";
import { runOnJS } from "react-native-reanimated";

interface LocationCoordinate {
  latitude: number;
  longitude: number;
}

const useVideo = () => {
  //Alert.alert("123");
  const navigation = useNavigation<AddScanStackNavigatorProps>();
  const { navigate, goBack, addListener } = navigation;
  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  const cameraDevice = devices.back;

  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionRequestResult>();
  const [isVideoRecording, setisVideoRecording] = useState<boolean>(false);
  const [cameraMode, setcameraMode] = useState(cameraDevice);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationCoordinate>();
  const [isFlash, setIsFlash] = useState<string>("off");
  let isImageLibraryOpen = false; // To stop multiple callings of opening the library

  const camera = useRef<Camera>(null);

  const renderCameraRecording = () => {
    if (cameraMode && cameraPermission === "authorized") {
      return (
        <Camera
          device={cameraMode}
          isActive={true}
          video={true}
          ref={camera}
          style={{ width: "100%", height: "100%" }}
        />
      );
    }
    return <ActivityIndicator size="large" color="#1C6758" />;
  };

  function startRecording() {
    if (camera != null) {
      setisVideoRecording(true);
      camera.current.startRecording({
        flash: isFlash,
        onRecordingFinished: (video) => {
          //Alert.alert(video.path);
          //setVideoResult(video.path);
          NavigatetoVideoDeatilScreen(video);
        },
        onRecordingError: (error) => console.error(error),
      });
    }
  }

  async function stopRecording() {
    if (camera != null) {
      setisVideoRecording(false);
      await camera.current.stopRecording();
    }
  }

  function switchCamera() {
    if (cameraMode == devices.back) {
      setcameraMode(devices.front);
    } else {
      setcameraMode(devices.back);
    }
  }

  function switchFlash() {
    if (isFlash == "off") {
      setIsFlash("on");
    } else {
      setIsFlash("off");
    }
  }

  function NavigatetoVideoDeatilScreen(url: VideoFile) {
    navigate("VideoScanDeatil", { videoUrl: url });
  }

  function navigateBack() {
    goBack();
  }

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
      if (cameraPermissionStatus) setCameraActive(true);
    })();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setCameraActive(true);
    } else {
      setCameraActive(false);
    }
  }, [navigation, isFocused]);

  useEffect(() => {
    setcameraMode(devices.back);
  }, [cameraDevice]);

  useEffect(() => {
    const unsubscribe = addListener("focus", () => {
      // Geolocation.getCurrentPosition((info) => {
      //   if (location) return;
      //   if (info) {
      //     setLocation({
      //       latitude: info.coords.latitude,
      //       longitude: info.coords.longitude,
      //     });
      //   }
      // });

      setCameraActive(false);
    });

    return unsubscribe;
  }, [navigation]);

  const openVideoLibrary = () => {
    launchImageLibrary({ mediaType: "video" }).then((res) => {
      if (!res.didCancel) {
        if (res.assets) {
          const uri = res.assets[0].uri;
          const duration = res.assets[0].duration;
          if (uri && duration) {
            const videoUrl: VideoFile = {
              path: uri,
              duration,
            };
            navigate("VideoScanDeatil", { videoUrl });
          } else {
            Alert.alert(
              "Error",
              "The video selected was invalid. Please choose another one"
            );
          }
        }
      }
    });
  };

  const panGesture = Gesture.Pan().onEnd((e) => {
    if (e.translationY < 80) {
      runOnJS(openVideoLibrary)();
    }
  });

  return {
    renderCameraRecording,
    cameraPermission,
    camera,
    NavigatetoVideoDeatilScreen,
    navigateBack,
    startRecording,
    stopRecording,
    isVideoRecording,
    switchCamera,
    switchFlash,
    isFlash,
    cameraMode,
    cameraActive,
    panGesture,
  };
};

export default useVideo;
