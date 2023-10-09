import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { PostsRouteProp } from "shared/navigators/LibraryStackNavigator";
import usePosts from "./usePosts";
import PostsVideo from "shared/components/Post/PostsVideo";

const Posts = (): JSX.Element => {
  const {
    params: { activePostId, posts },
  } = useRoute<PostsRouteProp>();
  const {
    initialIndex,
    activeIndex,
    setActiveIndex,
    bottomNavigation,
    handleGoBack,
    myPosts,
    removePostsFromList,
  } = usePosts(posts, activePostId);

  return (
    <View style={{ flex: 1 }}>
      <PostsVideo
        posts={myPosts}
        activeIndex={activeIndex}
        initialIndex={initialIndex}
        setActiveIndex={setActiveIndex}
        activeIconName="VideoCamera"
        bottomNavigation={bottomNavigation}
        handleGoBack={handleGoBack}
        removePostFromList={removePostsFromList}
      />
    </View>
  );
};

export default Posts;
