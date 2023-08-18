import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILevel, IStage, levelsState } from "../../models/ILevel";
import { fetchStages } from "../actions/LevelsActions";

const initialState: levelsState = {
  level: 1,
  isLoading: false,
  error: false,
  stages: [],
  activeStageID: 1,
  loserOverlay: false,
  winerOverlay: false,
  isLevelFinished: false,
  isGameFinished: false,
  hint: false,
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
    setActiveLevel(state, action: PayloadAction<number>) {
      state.level = action.payload;
    },
    setActiveStage(state, action: PayloadAction<number>) {
      state.activeStageID = action.payload;
    },
    finishLevelPopup(state, action: PayloadAction<boolean>) {
      state.isLevelFinished = action.payload
    },
    finishGame(state) {
      state.isGameFinished = true;
    },
    showHint(state, action: PayloadAction<boolean>) {
      state.hint = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStages.fulfilled, (state, action: PayloadAction<IStage[]>) => {
        state.stages = action.payload || [];
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchStages.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  }
});

export const levelsReducer = levelsSlice.reducer;
export const levelsActions = levelsSlice.actions;