import {
  MyScanPayloadFilterInterface,
  IMyScansList,
  ISubmitMyScanPayload,
  IUpdateMyScanPayload,
} from "shared/types/myScans/myScans.type";
import { setSelectedMyScan } from "store/slices/myScans/myScansSlice";
import apiSlice from "../apiSlice/apiSlice";

const myScansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all my scans
    getMyScans: builder.query({
      query: (params: MyScanPayloadFilterInterface) => ({
        url: `/scans`,
        params,
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

    // get my scan by id
    getMyScanById: builder.query({
      query: (id) => `/scans/${id}`,
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(setSelectedMyScan(data));
        } catch (err) {
          return;
        }
      },
    }),

    // submit my scan
    submitMyScan: builder.mutation({
      query: (body: ISubmitMyScanPayload) => ({
        url: `/scans`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyScans", "Projects", "ProjectsById"],
    }),

    // update my scan
    updateMyScan: builder.mutation({
      query: ({ id, ...body }: IUpdateMyScanPayload) => ({
        url: `/scans/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["MyScans"],
    }),

    // get scans by profiles
    getScansByProfiles: builder.query({
      query: () => `/scans/all-profiles`,
    }),

    // import my scan
    importMyScan: builder.query({
      query: () => `/scans/import`,
    }),

    // change my scan visibility
    changeMyScanVisibility: builder.mutation({
      query: ({ id, body }) => ({
        url: `/scans/visibility/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // delete my scan
    deleteMyScan: builder.mutation({
      query: ({ id, type }) => ({
        url: `/scans/${id}`,
        method: "DELETE",
        params: { type },
      }),
      invalidatesTags: ["MyScans", "ProjectsById"],
    }),

    downloadScan: builder.query({
      query: (id) => `model/download-files/${id}`,
    }),

    getScanCredits: builder.query({
      query: () => `account/scan-credit`,
      // providesTags: ["Credits"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyScansQuery,
  useGetMyScanByIdQuery,
  useSubmitMyScanMutation,
  useUpdateMyScanMutation,
  useGetScansByProfilesQuery,
  useImportMyScanQuery,
  useChangeMyScanVisibilityMutation,
  useDeleteMyScanMutation,
  useDownloadScanQuery,
  useGetScanCreditsQuery,
} = myScansApi;

export default myScansApi;
