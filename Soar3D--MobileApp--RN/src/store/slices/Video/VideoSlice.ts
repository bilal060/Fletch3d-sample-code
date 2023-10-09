import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calculateOverallPercentage } from "shared/utils/helpers";

interface IPayload {
  videoId: string;
  payload: any;
}

interface IUpload {
  uploadStatus: "idle";
  progress: number;
}

interface IUploads {
  uploads: {
    [videoId: string]: IUpload;
  };
}

const initialUploadState: IUpload = {
  uploadStatus: "idle",
  progress: 0,
};

const initialState: IUploads = {
  uploads: {},
};

const uploadVideoSlice = createSlice({
  name: "uploadVideo",
  initialState: initialState,
  reducers: {
    setInitialUpload: (state, action: PayloadAction<IPayload>) => {
      const { videoId, payload } = action.payload;

      if (!(videoId in state.uploads)) {
        const newUpload: IUpload = {
          ...initialUploadState,
          ...payload,
        };

        state.uploads[videoId] = newUpload;
      }
    },
    setUploadStatus: (state, action: PayloadAction<IPayload>) => {
      const { videoId, payload } = action.payload;

      state.uploads[videoId].uploadStatus = payload;
    },
    setUploadProgress: (state, action: PayloadAction<IPayload>) => {
      const { videoId, payload } = action.payload;

      state.uploads[videoId].progress = payload["progress"];
    },
    removeVideoFromUploads: (state, action: PayloadAction<IPayload>) => {
      const { videoId } = action.payload;

      if (videoId in state.uploads) {
        delete state.uploads[videoId];
      }
    },
  },
});

export const {
  setInitialUpload,
  setUploadStatus,
  setUploadProgress,
  removeVideoFromUploads,
} = uploadVideoSlice.actions;

export default uploadVideoSlice.reducer;
