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
  disableHints: false,
  hintIndicator: false,

  blackTheme: true,
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
    disableHints(state, action: PayloadAction<boolean>) {
      state.disableHints = action.payload
    },
    setHintIndicator(state, action: PayloadAction<boolean>) {
      state.hintIndicator = action.payload
    }
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