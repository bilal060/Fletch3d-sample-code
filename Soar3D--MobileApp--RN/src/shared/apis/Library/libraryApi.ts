import { setUserSignInInfo } from "store/slices/auth/authSlice";
import { setLoggedIn } from "store/slices/auth/userSignInfo";
import apiSlice from "../apiSlice/apiSlice";
import { IPost } from "shared/types/feed/post.type";
import { IMyScansList } from "shared/types/myScans/myScans.type";

const libraryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // All Scans
    getAllScan: builder.query({
      query: () => ({
        url: "/scans",
        method: "GET",
      }),
      providesTags: (res) => {
        return res?.data.length
          ? [
              ...res?.data.map(({ _id }: IMyScansList) => ({
                type: "MyScans" as const,
                id: _id,
              })),
              "MyScans",
            ]
          : ["MyScans"];
      },
    }),

    // All Scans
    getPersonalPost: builder.query({
      query: () => ({
        url: "/feed/posts/personal",
        method: "GET",
      }),
      providesTags: (res) => {
        return res?.data.posts.length
          ? [
              ...res?.data.posts
                .filter((post: any) => post != null)
                .map(({ _id }: IPost) => ({
                  type: "PersonalPosts" as const,
                  id: _id,
                })),
              "PersonalPosts",
            ]
          : ["PersonalPosts"];
      },
    }),

    getStarredPost: builder.query({
      query: () => ({
        url: "/feed/posts/starred",
        method: "GET",
      }),
      providesTags: (res) => {
        return res?.data.posts.length
          ? [
              ...res?.data.posts
                .filter((post: any) => post != null)
                .map(({ _id }: IPost) => ({
                  type: "StarredPosts" as const,
                  id: _id,
                })),
              "StarredPosts",
            ]
          : ["StarredPosts"];
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllScanQuery,
  useGetPersonalPostQuery,
  useGetStarredPostQuery,
} = libraryApi;
export default libraryApi;
