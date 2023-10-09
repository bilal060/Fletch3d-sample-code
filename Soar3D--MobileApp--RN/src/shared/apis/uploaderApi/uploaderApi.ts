import { IFinishVideoUploading } from "shared/types/uploadFile/uploadFile";
import apiSlice from "../apiSlice/apiSlice";

const uploaderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // upload large video start
        startVideoUpload: builder.mutation({
            query: (body) => ({
                url: "/video-upload/start",
                method: "POST",
                body,
            }),
        }),
        // upload large video start
        uploadVideoChunk: builder.mutation({
            query: ({ id, body }) => ({
                url: `/video-upload/upload/${id}`,
                method: "POST",
                body,
            }),
        }),
        // upload large video end
        finishVideoUpload: builder.mutation({
            query: ({ id, body }) => ({
                url: `/video-upload/finish/${id}`,
                method: "POST",
                body,
            }),
        }),

        // upload videos
        uploadVideo: builder.mutation({
            query: (body) => ({
                url: "/upload/video",
                method: "POST",
                body,
            }),
        }),
        // upload Image
        uploadImage: builder.mutation({
            query: (body) => ({
                url: "/upload/image",
                method: "POST",
                body,
            }),
        }),

        finishUploadingVideo: builder.mutation({
            query: ({ id, ...body }: IFinishVideoUploading) => ({
                url: `/video-upload/finish/${id}`,
                method: "POST",
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useStartVideoUploadMutation,
    useUploadVideoChunkMutation,
    useFinishVideoUploadMutation,
    useUploadVideoMutation,
    useUploadImageMutation,
    useFinishUploadingVideoMutation,
} = uploaderApi;

export default uploaderApi;
