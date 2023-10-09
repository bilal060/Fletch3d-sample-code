import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import {
  Camera,
  CameraPermissionRequestResult,
  VideoFile,
  useCameraDevices,
} from "react-native-vision-camera";
import { MainStackNavigatorProps } from "shared/navigators/MainNavigator";
import BottomSheet from "@gorhom/bottom-sheet";
import useUppyFileUploader from "shared/hooks/useUppyFileUploader";
import { useSubmitMyScanMutation } from "shared/apis/myScans/myScansApi";
import Geolocation from "@react-native-community/geolocation";
import * as mime from "react-native-mime-types";
import { IUploadScanDetails } from "shared/types/scans/scans.type";
import { useGetProjectsQuery } from "shared/apis/projects/projectsApi";
import { IProjectsListResponse } from "shared/types/projects/projects.type";
import { IFolderList } from "shared/types/folders/folders.type";
import { ISelectMenuList } from "shared/types/utils/utils.type";
import {
  ISubmitMyScanPayload,
  ISubmitScanLocal,
} from "shared/types/myScans/myScans.type";
import { useAppDispatch } from "shared/hooks/useRedux";
import { setUploadLaterScan } from "store/slices/myScans/myScansSlice";

interface LocationCoordinate {
  latitude: string;
  longitude: string;
}

const useVideoScanDeatil = (videoUrl: VideoFile) => {
  const {
    data: projectsData,
    error: projectsError,
    isLoading,
  } = useGetProjectsQuery(undefined);
  const [create, { data: submitData, error: submitError }] =
    useSubmitMyScanMutation();
  const dispatch = useAppDispatch();

  const bottomSheet = useRef<BottomSheet>(null);
  const { navigate, goBack } = useNavigation<MainStackNavigatorProps>();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const { uploadUppyFile, data: videoUploadData } = useUppyFileUploader({
    onSuccess(data) {
      onSubmit(data);
    },
  });

  const [pauseVideo, setPauseVideo] = useState(false);
  const [location, setLocation] = useState<LocationCoordinate>({
    latitude: "",
    longitude: "",
  });
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionRequestResult>();
  const [isScanSubmitting, setIsScanSubmitting] = useState<boolean>(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [scanDetail, setScanDetail] = useState<IUploadScanDetails>({
    scanName: "",
    location: "",
    projectName: "",
  });
  const [activeProject, setActiveProject] = useState<ISelectMenuList | null>(
    null
  );
  const [activeFolder, setActiveFolder] = useState<ISelectMenuList | null>(
    null
  );
  const [foldersDropdownData, setFoldersDropDownData] = useState<
    ISelectMenuList[] | null
  >(null);

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const cameraDevice = devices.back;

  // Selecting folder and projects logic
  let projectsDropdownData: ISelectMenuList[] = [];
  let tempFolders: ISelectMenuList[] = [];

  if (projectsData !== undefined && !isLoading) {
    if (projectsData?.data && projectsDropdownData.length === 0) {
      projectsData?.data.map((item: IProjectsListResponse) => {
        if (item._id && item.name)
          projectsDropdownData.push({
            label: item.name,
            value: item._id,
          });
      });
    }
  }

  useEffect(() => {
    if (!projectsData) return;
    tempFolders = [];
    let activeProjectIndex = projectsData.data.findIndex(
      (item: IProjectsListResponse) => item._id === activeProject?.value
    );
    if (activeProjectIndex >= 0) {
      projectsData.data[activeProjectIndex].folders.map((item: IFolderList) => {
        if (item._id && item.name)
          tempFolders.push({ label: item.name, value: item._id });
      });
    }
    setFoldersDropDownData(tempFolders);
    setActiveFolder(null);
    setShowProjectDropdown(false);
  }, [activeProject]);

  useEffect(() => {
    setShowFolderDropdown(false);
  }, [activeFolder]);

  const onSubmitVideo = () => {
    if (scanDetail.scanName === "")
      return Alert.alert("Error", "Scan Name is required");
    const fileName = videoUrl?.path.substring(
      videoUrl?.path.lastIndexOf("/") + 1
    );
    setIsScanSubmitting(true);
    let payload = {
      ...videoUrl,
      name: fileName,
      type: mime.lookup(videoUrl.path),
      uri: videoUrl?.path,
    };
    uploadUppyFile(payload);
  };

  const handleKeyboardOpen = (_: KeyboardEvent) => {
    bottomSheet.current?.snapToIndex(2);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardOpen
    );

    // Clean up the event listener when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (submitData?.status == "Success") {
      Alert.alert("Your scan has been uploaded successfully");
      navigate("BottomTab", { screen: "Videos" });
    } else if (submitError) {
      // @ts-ignore
      const errorResponse: any = JSON.parse(submitError.data);
      Alert.alert("Error", errorResponse.error);
    }
  }, [submitData || submitError]);

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
      setPauseVideo(true);
    } else if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      setPauseVideo(false);
      bottomSheet.current?.snapToIndex(0);
    }

    appState.current = nextAppState;
  };

  const renderCameraRecording = () => {
    if (cameraDevice && cameraPermission === "authorized") {
      return (
        <Camera
          device={cameraDevice}
          isActive={true}
          video={true}
          ref={camera}
          style={{ width: "100%", height: "100%" }}
        />
      );
    }
    return <ActivityIndicator size="large" color="#1C6758" />;
  };
  function BacktoScreen() {
    goBack();
  }

  const onChangeText = (value: string, name: string) => {
    setScanDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onplayVideo = () => {
    setPauseVideo(false);
  };

  const handleLaterUpload = () => {
    let scanData: ISubmitScanLocal = {
      scan_name: scanDetail.scanName,
      scan_capture_intent: "Building",
      category: "3d Scan",
      scanning_device: "Iphone 14",
      location: location,
    };
    if (activeProject)
      scanData = { ...scanData, project_id: activeProject.value };
    if (activeFolder && activeProject)
      scanData = { ...scanData, folder_id: activeFolder.value };

    dispatch(
      setUploadLaterScan({
        videoUrl,
        scanData,
      })
    );
    Alert.alert(
      "Upload Later",
      "You can upload this video next time you open the application.",
      [
        {
          text: "Done",
          style: "cancel", // Default button style
          onPress: () => navigate("BottomTab", { screen: "Videos" }),
        },
      ]
    );
  };

  const onSubmit = (videoUploadData: any) => {
    setIsScanSubmitting(true);
    let payLoad: ISubmitMyScanPayload = {
      scan_name: scanDetail.scanName,
      scan_capture_intent: "Building",
      category: "3d Scan",
      scanning_device: "Iphone 14",
      input_videos: [videoUploadData?.data?._id],
      location: location,
    };
    if (activeProject)
      payLoad = { ...payLoad, project_id: activeProject.value };
    if (activeProject && activeFolder)
      payLoad = { ...payLoad, folder_id: activeFolder.value };

    create(payLoad).finally(() => setIsScanSubmitting(false));
  };

  const getAddressFromCoordinates = (latitude: string, longitude: string) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyDlDCNhuZmEmgltF_kuoNEBhmGltDhbgUA`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        onChangeText(
          result?.results?.[0]?.formatted_address.toString(),
          "location"
        );
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      if (location.longitude !== "" && location.latitude !== "") return;
      if (info) {
        setLocation({
          latitude: info.coords.latitude.toString(),
          longitude: info.coords.longitude.toString(),
        });
      }
    });
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
    })();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude)
      getAddressFromCoordinates(location.latitude, location.longitude);
  }, [location]);

  return {
    renderCameraRecording,
    BacktoScreen,
    onplayVideo,
    onChangeText,
    bottomSheet,
    pauseVideo,
    onSubmit: onSubmitVideo,
    videoUploadData,
    scanDetail,
    isScanSubmitting,
    handleLaterUpload,
    selectProjectAndFolders: {
      activeProject,
      setActiveProject,
      activeFolder,
      setActiveFolder,
      projectsDropdownData,
      foldersDropdownData,
      showProjectDropdown,
      setShowProjectDropdown,
      showFolderDropdown,
      setShowFolderDropdown,
    },
  };
};

export default useVideoScanDeatil;
