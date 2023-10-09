import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MY_SERVER_URL } from "shared/utils/helpers";
import { RootState } from "store/index";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: MY_SERVER_URL,
    prepareHeaders: async (headers, { getState }) => {
      const states = getState() as RootState;
      const token = states.auth.token;
      headers.set("Authorization", `Bearer ${token ?? ""}`);

      return headers;
    },
    async responseHandler(response) {
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    },
  }),
  tagTypes: [
    "Projects",
    "MyScans",
    "ProjectsById",
    "PublicPosts",
    "PersonalPosts",
    "StarredPosts",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;
