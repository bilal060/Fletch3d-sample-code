import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Linking } from "react-native";
import { useDeleteMyScanMutation } from "shared/apis/myScans/myScansApi";
import { useAppSelector } from "shared/hooks/useRedux";
import { BottomTabRoutes } from "shared/navigators/BottomStack";
import { MainStackNavigatorProps } from "shared/navigators/MainNavigator";
import { IUserData } from "shared/types/auth/user.type";
import {
  IMyScansList,
  IScanListModel,
} from "shared/types/myScans/myScans.type";

const useScans = (scans: IMyScansList[]) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigation = useNavigation<MainStackNavigatorProps>();
  const user = useAppSelector((state) => state.auth.user as IUserData);
  const [deleteScan, { error }] = useDeleteMyScanMutation();
  const [myScans, setMyScans] = useState<IMyScansList[]>(scans);

  // const showScanDetails = () => {
  //   bottomSheet.current?.present();
  // };

  const bottomNavigation = (screen: BottomTabRoutes) => {
    if (screen !== BottomTabRoutes.ADD_SCAN)
      navigation.navigate("BottomTab", { screen });
    else {
      if (user.scan_credit > 0) navigation.navigate("AddScanStack");
      else Alert.alert("You don't have enough scan credits");
    }
  };

  if (error) {
    Alert.alert("Error deleting the post");
  }

  const handleDeleteScan = async (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Removing that scan from list so falt list does not throw error
            const newScans = myScans.filter((item) => item._id !== id);
            setMyScans(newScans);
            // Now deleting that scan
            await deleteScan({ id, type: "everything" });
            Alert.alert("Scan Deleted");
            // navigation.goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onViewCallBack = useCallback((viewableItems: any) => {
    setActiveIndex(viewableItems.changed[0].index);
    // bottomSheet.current?.close();
  }, []);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const viewModel = (model: IScanListModel) => {
    if (model.status.toLowerCase() !== "completed")
      return Alert.alert(
        `Cannot view a ${model.status.toLowerCase()} scan model`
      );
    if (!model.public_link)
      return Alert.alert("Error", "Viewer link is not available right now");
    navigation.navigate("ModelViewer", { url: model.public_link });
  };

  return {
    activeIndex,
    // bottomSheet,
    // showScanDetails,
    bottomNavigation,
    onViewCallBack,
    viewConfigRef,
    handleGoBack,
    viewModel,
    handleDeleteScan,
    myScans,
  };
};

export default useScans;
