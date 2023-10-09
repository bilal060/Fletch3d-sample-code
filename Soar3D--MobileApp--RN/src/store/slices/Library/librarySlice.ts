import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthSliceStates } from "shared/types/auth/authSlice.type";
import { IMyScansList } from "shared/types/myScans/myScans.type";

const initialState = {
  // _id: "",
  // user_id: null,
  // scan_name: "",
  // profile_id: null,
  // input_videos: [],
  // location: undefined,
  // status: "",
  // answers: [],
  // scan_capture_intent: "",
  // category: "",
  // space_used: 0,
  // created_at: "",
  // updated_at: "",
  // __v: 0,
  // project_id: undefined,
  // model_id: undefined,
  allScans: [],
  personalPost: [],
  starredPost: [],
};

const librarySlice = createSlice({
  name: "librarySlice",
  initialState,
  reducers: {
    setAllScans(state, action) {
      state.allScans = action.payload;
    },

    setAllPresonalPost(state, action) {
      state.personalPost = action.payload;
    },

    setAllStarredPost(state, action) {
      state.starredPost = action.payload;
    },

    setUserDetailInfo(
      state,
      { payload }: PayloadAction<IAuthSliceStates["user"]>
    ) {
      // state.user = {
      //   ...state.user,
      //   ...payload,
      // } as any;
    },
  },
});

export default librarySlice.reducer;

export const {
  setAllScans,
  setAllPresonalPost,
  setUserDetailInfo,
  setAllStarredPost,
} = librarySlice.actions;
