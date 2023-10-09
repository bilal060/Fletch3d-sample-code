import apiSlice from "shared/apis/apiSlice/apiSlice";
import {
  IFeedFilterPayloadInterface,
  IPost,
} from "shared/types/feed/post.type";

const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPosts: builder.query({
      query: (params: IFeedFilterPayloadInterface) => ({
        url: `/feed/posts`,
        params,
      }),
      providesTags: (res) => {
        return res?.data.posts.length
          ? [
              ...res?.data.posts
                .filter((post: any) => post != null)
                .map(({ _id }: IPost) => ({
                  type: "PublicPosts" as const,
                  id: _id,
                })),
              "PublicPosts",
            ]
          : ["PublicPosts"];
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetFeedPostsQuery } = feedApi;

export default feedApi;
