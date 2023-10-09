import {
  IFeedFilterPayloadInterface,
  IPost,
  IPostActionPayloadInterface,
  ISpecificPostPayloadInterface,
} from "shared/types/feed/post.type";
import apiSlice from "../apiSlice/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postToFeed: builder.mutation({
      query: (body) => ({
        url: "/feed/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "PublicPosts",
        "PersonalPosts",
        "StarredPosts",
        // "Credits",
      ],
    }),
    getCategory: builder.query({
      query: () => "/feed/categories",
    }),
    actOnPost: builder.mutation({
      query: ({ params, body }: IPostActionPayloadInterface) => ({
        url: "/feed/posts/action",
        method: "POST",
        params,
        body,
      }),
      invalidatesTags: ["PublicPosts", "PersonalPosts", "StarredPosts"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/feed/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "PublicPosts",
        "PersonalPosts",
        "StarredPosts",
        // "Credits",
      ],
    }),
    requestNewTag: builder.mutation({
      query: (body: { name: string }) => ({
        url: "/feed/tag-requests",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  usePostToFeedMutation,
  useGetCategoryQuery,
  useActOnPostMutation,
  useDeletePostMutation,
  useRequestNewTagMutation,
} = postApi;
export default postApi;
