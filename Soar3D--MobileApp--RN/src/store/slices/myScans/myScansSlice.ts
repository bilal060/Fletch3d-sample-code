import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { VideoFile } from "react-native-vision-camera";
import {
  IMyScansList,
  IUploadLaterScan,
} from "shared/types/myScans/myScans.type";

interface Props {
  selected: IMyScansList | null;
  uploadLaterScanData: IUploadLaterScan[];
}

interface IVideoUrl {
  path: string;
}

const initialState: Props = {
  selected: null,
  uploadLaterScanData: [],
};

const myScansSlice = createSlice({
  name: "myScan",
  initialState,
  reducers: {
    setSelectedMyScan(state, action: PayloadAction<IMyScansList | null>) {
      state.selected = action.payload;
    },
    setUploadLaterScan(state, { payload }: PayloadAction<IUploadLaterScan>) {
      state.uploadLaterScanData = [...state.uploadLaterScanData, payload];
    },
    removeUploadLaterScan(state, { payload }: PayloadAction<VideoFile>) {
      state.uploadLaterScanData = state.uploadLaterScanData.filter(
        (item) => item.videoUrl.path !== payload.path
      );
    },
    dummyRemoveAllItems(state) {
      state.uploadLaterScanData = [];
    },
  },
});

export default myScansSlice.reducer;

export const {
  setSelectedMyScan,
  setUploadLaterScan,
  removeUploadLaterScan,
  dummyRemoveAllItems,
} = myScansSlice.actions;
