import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILevel, levelsState } from "../../models/ILevel";
import { fetchLevel } from "../actions/LevelsActions";

const initialState: levelsState = {
  level: null,
  isLoading: false,
  error: false,
  loserOverlay: false,
  winerOverlay: false,
}

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    setLoserOverlay(state, action: PayloadAction<boolean>) {
      state.loserOverlay = action.payload;
    },
    setWinnerOverlay(state, action: PayloadAction<boolean>) {
      state.winerOverlay = action.payload;
    },
    hideOverlay(state) {
      state.loserOverlay = false;
      state.winerOverlay = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLevel.fulfilled, (state, action: PayloadAction<ILevel>) => {
        state.level = action.payload
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchLevel.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  }
});

export const levelsReducer = levelsSlice.reducer;
export const levelsActions = levelsSlice.actions;