import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILevels } from "../../models/ILevels";

interface levelsState {
  levels: ILevels[] | null,
  isLoading: boolean,
  error: boolean,
}

const initialState: levelsState = {
  levels: null,
  isLoading: false,
  error: false,
}

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    levelsFetching(state) {
      state.isLoading = true;
    },
    levelsFetchingSuccsess(state, action: PayloadAction<ILevels[]>) {
      state.levels = action.payload
      state.isLoading = false;
      state.error = false;
    },
    levelsFetchingFailure(state, action: PayloadAction<boolean>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});