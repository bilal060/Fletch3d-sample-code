import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { useGetFeedPostsQuery } from "shared/apis/feed/feedApi";
import { useAppSelector } from "shared/hooks/useRedux";
import {
  MainStackNavigatorProps,
  MainStackScreen,
} from "shared/navigators/MainNavigator";
import { IUserData } from "shared/types/auth/user.type";
import {
  IFeedFilterPayloadInterface,
  IPost,
} from "shared/types/feed/post.type";

const useHomeScreen = () => {
  const bottomSheet = useRef<BottomSheetModal>(null);
  const { navigate } = useNavigation<MainStackNavigatorProps>();
  const [params, setParams] = useState<IFeedFilterPayloadInterface>({
    page: 1,
    limit: 7,
  });
  const { data, isError, isLoading, refetch } = useGetFeedPostsQuery(params, {
    skip: false,
  });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scanCredits = useAppSelector(
    (state) => (state.auth.user as IUserData).scan_credit
  );
  const posts = useRef<IPost[]>([]);

  useEffect(() => {
    if (!data) return;
    if (data.data.current_page !== params.page) return;
    posts.current.push(...data.data.posts);
  }, [data]);

  const showScanDetails = () => {
    bottomSheet.current?.present();
  };

  const bottomNavigation = (screen: string) => {
    if (screen !== "AddScan") navigate("BottomTab", { screen });
    else {
      if (scanCredits > 0) navigate("AddScanStack");
      else Alert.alert("You don't have enough scan credits");
    }
  };

  const loadMorePosts = () => {
    setParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
  };

  const onViewCallBack = useCallback((viewableItems: any) => {
    setActiveIndex(viewableItems.changed[0].index);
  }, []);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  return {
    bottomSheet,
    showScanDetails,
    bottomNavigation,
    posts: posts.current,
    loadMorePosts,
    refetch,
    activeIndex,
    setActiveIndex,
    onViewCallBack,
    viewConfigRef,
  };
};

export default useHomeScreen;
