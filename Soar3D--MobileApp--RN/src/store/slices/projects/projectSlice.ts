import { createSlice } from "@reduxjs/toolkit";
import { IProjectsListResponse } from "shared/types/projects/projects.type";

interface Props {
  selected: IProjectsListResponse | null;
}

const initialState: Props = {
  selected: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selected = action.payload;
    },
  },
});

export default projectsSlice.reducer;

export const { setSelectedProject } = projectsSlice.actions;
