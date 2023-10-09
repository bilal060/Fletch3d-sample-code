import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";
import { Alert, FlatList, Linking, useWindowDimensions } from "react-native";
import { IPost, PostActionTypes } from "shared/types/feed/post.type";
import HomeScreenPost from "../Home/HomeScreenPost";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeImages from "assets/images";
import { useAppSelector } from "shared/hooks/useRedux";
import { IUserData } from "shared/types/auth/user.type";
import { IScanListModel } from "shared/types/myScans/myScans.type";
import {
  useActOnPostMutation,
  useDeletePostMutation,
} from "shared/apis/post/postApi";

type PostsProps = {
  activeIndex: number;
  posts: IPost[];
  setActiveIndex: Dispatch<SetStateAction<number>>;
  loadMore?: () => void;
  initialIndex: number;
  activeIconName: string;
  handleGoBack: () => void;
  bottomNavigation: (screen: string) => void;
  removePostFromList: (id: string) => void;
};

const PostsVideo = (props: PostsProps): JSX.Element => {
  const {
    activeIndex,
    posts,
    setActiveIndex,
    loadMore,
    initialIndex,
    handleGoBack,
    bottomNavigation,
    removePostFromList,
  } = props;

  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const user = useAppSelector((state) => state.auth.user as IUserData);
  const [deletePost, { error }] = useDeletePostMutation();
  const { LibraryOverLayFrame } = useThemeImages();
  const [actOnPost, { error: actionError }] = useActOnPostMutation();

  const onViewCallBack = useCallback((viewableItems: any) => {
    setActiveIndex(viewableItems.changed[0].index);
  }, []);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const handleActOnPost = (action: PostActionTypes, post_id: string) => {
    actOnPost({
      params: {
        action: action,
      },
      body: {
        post_id,
      },
    });
  };

  if (error) {
    Alert.alert("Error deleting the post");
  }

  const handleDeletePost = async (id: string) => {
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
            removePostFromList(id);
            await deletePost({ id });
            Alert.alert("Post Deleted");
            // goBack();
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleViewModel = async (model: IScanListModel) => {
    if (model.status.toLowerCase() !== "completed")
      return Alert.alert(
        `Cannot view a ${model.status.toLowerCase()} scan model`
      );
    await Linking.openURL(
      `https://viewer.xspada.com/?model_id=${model._id}&user_id=${user._id}&user_email=${user.email}`
    );
  };

  const defaultProps = useMemo(
    () => ({
      LibraryOverLayFrame: LibraryOverLayFrame,
      top,
      bottom,
      width,
      height,
      bottomNavigation,
      activeIconName: props.activeIconName,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IPost; index: number }) => (
      <HomeScreenPost
        {...item}
        defaultProps={defaultProps}
        activeIndex={activeIndex}
        currentIndex={index}
        handleGoBack={handleGoBack}
        handleViewModel={handleViewModel}
        canDelete={user._id === item?.user_id?._id}
        handleDelete={handleDeletePost}
        actionOnPost={handleActOnPost}
        userId={user._id}
      />
    ),
    [activeIndex]
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      pagingEnabled={true}
      onEndReached={loadMore ?? null}
      onEndReachedThreshold={2}
      initialNumToRender={4}
      maxToRenderPerBatch={7}
      onViewableItemsChanged={onViewCallBack}
      viewabilityConfig={viewConfigRef.current}
      initialScrollIndex={initialIndex}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
      extraData={true}
    />
  );
};

export default PostsVideo;
