import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import RNFS from "react-native-fs";

import {
  useGetAllScanQuery,
  useGetPersonalPostQuery,
  useGetStarredPostQuery,
} from "shared/apis/Library/libraryApi";
import { useAppDispatch, useAppSelector } from "shared/hooks/useRedux";
import useUppyFileUploader from "shared/hooks/useUppyFileUploader";
import { tabBarStyles } from "shared/navigators/BottomStack";
import { LibraryStackNavigatorProps } from "shared/navigators/LibraryStackNavigator";
import { MainStackNavigatorProps } from "shared/navigators/MainNavigator";
import { IPost } from "shared/types/feed/post.type";
import {
  IMyScansList,
  ISubmitMyScanPayload,
  ISubmitScanLocal,
  IUploadLaterScan,
} from "shared/types/myScans/myScans.type";
import * as mime from "react-native-mime-types";
import { useSubmitMyScanMutation } from "shared/apis/myScans/myScansApi";
import {
  dummyRemoveAllItems,
  removeUploadLaterScan,
} from "store/slices/myScans/myScansSlice";

enum ScansSections {
  MY_SCANS = "My Scans",
  MY_POST = "My Post",
  MY_STARRED = "My Starred",
}

let isFirstRender = true;

type ScansRecord = Record<string, IMyScansList[]>;

const useLibraryScreen = () => {
  const navigation = useNavigation<LibraryStackNavigatorProps>();
  const { navigate } = navigation;
  const isFocused = useIsFocused();
  const [libraryType, setlibraryType] = useState(ScansSections.MY_SCANS);
  const uploadLaterScanData = useAppSelector(
    (state) => state.myScan.uploadLaterScanData
  );
  const [create, { data: submitData, error: submitError }] =
    useSubmitMyScanMutation();
  const { uploadUppyFile, data: videoUploadData } = useUppyFileUploader({
    onSuccess(data) {
      onSubmit(data);
    },
  });
  const dispatch = useAppDispatch();

  const { data, refetch } = useGetAllScanQuery(null);
  const { data: personalPost, refetch: refetchMyPosts } =
    useGetPersonalPostQuery(null);
  const { data: starredPost, refetch: refetchStarredPosts } =
    useGetStarredPostQuery(null);
  // const [myPersonalPosts, setMyPersonalPosts] = useState<IPost[]>([]);
  // const [myStarredPosts, setMyStarredPosts] = useState<IPost[]>([]);
  let myPersonalPosts: IPost[] = [];
  let myStarredPosts: IPost[] = [];

  let scans: ScansRecord = {
    [ScansSections.MY_SCANS]: [],
    [ScansSections.MY_POST]: [],
    [ScansSections.MY_STARRED]: [],
  };

  if (data) {
    if (data.data) {
      const filteredScans: IMyScansList[] = data.data.filter(
        (item: IMyScansList) => item !== undefined && item !== null
      );
      scans[ScansSections.MY_SCANS] = filteredScans;
    }
  }

  if (personalPost) {
    if (personalPost.data.posts) {
      const filteredMyPosts: IPost[] = personalPost.data.posts.filter(
        (item: IPost) => item !== null && item !== undefined
      );
      scans[ScansSections.MY_POST] = filteredMyPosts.map((item: IPost) => {
        return {
          ...item.scan_id,
          _id: item._id,
        } as IMyScansList;
      });
      myPersonalPosts = filteredMyPosts;
    }
  }

  if (starredPost) {
    if (starredPost.data.posts) {
      const filteredStarredPosts: IPost[] = starredPost.data.posts.filter(
        (item: IPost) => item !== null && item !== undefined
      );
      scans[ScansSections.MY_STARRED] = filteredStarredPosts.map(
        (item: IPost) => {
          return {
            ...item.scan_id,
            _id: item._id,
          } as IMyScansList;
        }
      );
      myStarredPosts = filteredStarredPosts;
    }
  }

  const onSubmit = (data: any) => {
    const payLoad: ISubmitMyScanPayload = {
      ...data.scanData,
      input_videos: [data?.data?.data._id],
    };
    create(payLoad);
  };

  const fileDoesExists = async (file: string): Promise<boolean> => {
    try {
      const exists = await RNFS.exists(file);
      return exists ? true : false;
    } catch (error) {
      console.error("Error checking video file:", error);
      return false;
    }
  };

  const uploadAllScans = async () => {
    uploadLaterScanData.forEach(async (item: IUploadLaterScan) => {
      // Check if file exists or not
      const exists = await fileDoesExists(item.videoUrl.path);

      if (!exists) {
        dispatch(removeUploadLaterScan(item.videoUrl));
        return;
      }
      const fileName = item.videoUrl?.path.substring(
        item.videoUrl?.path.lastIndexOf("/") + 1
      );
      let payload = {
        ...item.videoUrl,
        name: fileName,
        type: mime.lookup(item.videoUrl.path),
        uri: item.videoUrl?.path,
      };
      uploadUppyFile(payload, item.scanData).finally(() => {
        dispatch(removeUploadLaterScan(item.videoUrl));
      });
    });
  };

  const handleUploadLaterScanData = () => {
    if (uploadLaterScanData.length > 0) {
      Alert.alert(
        "Upload Pending Videos",
        "Your pending videos from the last session will be uploaded now.",
        [
          {
            text: "Submit Scans",
            style: "cancel", // Default button style
            onPress: uploadAllScans,
          },
          {
            text: "Upload Later",
            style: "default", // Blue cancel button style
          },
        ]
      );
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      handleUploadLaterScanData();
    }
  }, []);

  const showBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: tabBarStyles,
    });
  };

  const hideBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  };

  const selectLibraryType = (type: ScansSections) => {
    setlibraryType(type);
  };

  const onClick = (id: string) => {
    if (libraryType === ScansSections.MY_SCANS) {
      navigate("Scans", {
        scans: scans[ScansSections.MY_SCANS],
        activeScanId: id,
        activeRoute: "Videos",
      });
    } else if (libraryType === ScansSections.MY_POST) {
      navigate("Posts", {
        posts: myPersonalPosts,
        activePostId: id,
      });
    } else {
      navigate("Posts", {
        posts: myStarredPosts,
        activePostId: id,
      });
    }
  };

  useEffect(() => {
    const unsubscribeShowTab = navigation.addListener("focus", showBottomTab);
    const unsubscribeHideTab = navigation.addListener("blur", hideBottomTab);

    return () => {
      unsubscribeShowTab();
      unsubscribeHideTab();
    };
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchMyPosts();
      refetchStarredPosts();
    }
  }, [navigation, isFocused]);

  return {
    selectLibraryType,
    libraryType,
    onClick,
    scans: scans[libraryType],
    ScansSections,
  };
};

export default useLibraryScreen;
