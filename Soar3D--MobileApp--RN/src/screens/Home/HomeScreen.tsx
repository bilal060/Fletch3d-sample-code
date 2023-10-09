import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  useWindowDimensions,
} from "react-native";
import useHomeScreen from "./useHomeScreen";
import useThemeImages from "assets/images";
import { fontSize, scalableheight } from "shared/constants/resposnevaraiable";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IPost } from "shared/types/feed/post.type";
import { useCallback, useMemo, useRef } from "react";
import HomeScreenPost, {
  PostItems,
} from "shared/components/Home/HomeScreenPost";
import Video from "react-native-video";
import PostsVideo from "shared/components/Post/PostsVideo";

const HomeScreen = () => {
  const {
    showScanDetails,
    bottomSheet,
    bottomNavigation,
    posts,
    loadMorePosts,
    viewConfigRef,
    onViewCallBack,
    activeIndex,
    setActiveIndex,
  } = useHomeScreen();
  // const { top, bottom } = useSafeAreaInsets();
  // const { width, height } = useWindowDimensions();

  // const themeImages = useThemeImages();

  // const defaultProps = useMemo(
  //   () => ({
  //     LibrarySearch: themeImages.LibrarySearch,
  //     LibraryFireflameimage: themeImages.LibraryFireflameimage,
  //     LibraryOverLayFrame: themeImages.LibraryOverLayFrame,
  //     LibrarymessageSquare: themeImages.LibrarymessageSquare,
  //     LibraryShare: themeImages.LibraryShare,
  //     LibraryDownload: themeImages.LibraryDownload,
  //     LibraryStar1: themeImages.LibraryStar1,
  //     Libraryhome: themeImages.Libraryhome,
  //     Librarygroup: themeImages.Librarygroup,
  //     Libraryvideo: themeImages.Libraryvideo,
  //     Librarypeople: themeImages.Librarypeople,
  //     Libraryadd: themeImages.Libraryadd,
  //     top,
  //     bottom,
  //     width,
  //     height,
  //     showScanDetails,
  //     bottomNavigation,
  //     bottomSheet,
  //   }),
  //   []
  // );

  // const renderItem = useCallback(
  //   ({ item, index }: { item: IPost; index: number }) => (
  //     <HomeScreenPost
  //       {...item}
  //       defaultProps={defaultProps}
  //       activeIndex={activeIndex}
  //       currentIndex={index}
  //     />
  //   ),
  //   [activeIndex]
  // );

  return (
    <View style={style.parentContainer}>
      <StatusBar hidden={true} />
      {/* <FlatList
        data={posts}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        onEndReached={loadMorePosts}
        onEndReachedThreshold={2}
        initialNumToRender={4}
        maxToRenderPerBatch={7}
        onViewableItemsChanged={onViewCallBack}
        viewabilityConfig={viewConfigRef.current}
      /> */}

      <PostsVideo
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        posts={posts}
        initialIndex={0}
      />
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
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
    height: scalableheight.fifty,
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
    width: "94%",
    height: "8%",
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
});
