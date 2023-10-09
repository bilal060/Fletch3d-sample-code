import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAppSelector } from "shared/hooks/useRedux";
import { tabBarStyles } from "shared/navigators/BottomStack";
import { LibraryStackNavigatorProps } from "shared/navigators/LibraryStackNavigator";
import { MainStackNavigatorProps } from "shared/navigators/MainNavigator";
import { IUserData } from "shared/types/auth/user.type";
import { IPost } from "shared/types/feed/post.type";

const usePosts = (posts: IPost[], activeId: string) => {
  const initialIndex = posts.findIndex((item) => item._id === activeId);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<LibraryStackNavigatorProps>();
  const { navigate } = useNavigation<MainStackNavigatorProps>();
  const scanCredits = useAppSelector(
    (state) => (state.auth.user as IUserData).scan_credit
  );
  const [myPosts, setMyPosts] = useState<IPost[]>(posts);

  const hideBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  };

  const showBottomTab = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: tabBarStyles,
      },
    });
  };

  const bottomNavigation = (screen: string) => {
    if (screen !== "AddScan") navigate("BottomTab", { screen });
    else {
      if (scanCredits > 0) navigate("AddScanStack");
      else Alert.alert("You don't have enough scan credits");
    }
  };

  const removePostsFromList = (id: string) => {
    const newPosts = myPosts.filter((item) => item._id !== id);
    setMyPosts(newPosts);
  };

  useEffect(() => {
    const unsubscribeHideTab = navigation.addListener("focus", hideBottomTab);
    const unsubscribeShowTab = navigation.addListener("blur", showBottomTab);

    return () => {
      unsubscribeHideTab();
      unsubscribeShowTab();
    };
  }, [navigation]);

  return {
    initialIndex: initialIndex !== -1 ? initialIndex : 0,
    activeIndex,
    setActiveIndex,
    handleGoBack: navigation.goBack,
    bottomNavigation,
    myPosts,
    removePostsFromList,
  };
};

export default usePosts;
