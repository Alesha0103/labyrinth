import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILevel } from "../../models/ILevel";

interface levelsState {
  level: ILevel | null,
  isLoading: boolean,
  error: boolean,
  loserOverlay: boolean,
}

const initialState: levelsState = {
  level: null,
  isLoading: false,
  error: false,
  loserOverlay: false,
}

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    levelsFetching(state) {
      state.isLoading = true;
    },
    levelsFetchingSuccsess(state, action: PayloadAction<ILevel>) {
      state.level = action.payload
      state.isLoading = false;
      state.error = false;
    },
    levelsFetchingFailure(state, action: PayloadAction<boolean>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setOverlay(state, action: PayloadAction<boolean>) {
      state.loserOverlay = action.payload;
    },
  },
});