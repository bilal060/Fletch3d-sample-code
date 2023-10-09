import apiSlice from "shared/apis/apiSlice/apiSlice";
import { IProjectsListResponse } from "shared/types/projects/projects.type";
import { setSelectedProject } from "store/slices/projects/projectSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
      providesTags: ({ data }) => {
        return data.length
          ? [
              ...data.map(({ _id }: IProjectsListResponse) => ({
                type: "Projects" as const,
                id: _id,
              })),
              "Projects",
            ]
          : ["Projects"];
      },
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: ["ProjectsById"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setSelectedProject(data));
        } catch (err) {
          return;
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetProjectsQuery, useGetProjectByIdQuery } = projectsApi;

export default projectsApi;
