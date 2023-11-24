import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError, IStage, levelsState } from "../../models/ILevel";

const initialState: levelsState = {
  level: 1,
  isLoading: true,
  error: {
    active: false,
    message: ""
  },
  stages: [],
  activeStageID: 1,
  loserOverlay: false,
  winerOverlay: false,
  isLevelFinished: false,
  isGameFinished: false,
  disableHints: false,
  hintIndicator: false,
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
    finishGame(state, action: PayloadAction<boolean>) {
      state.isGameFinished = action.payload;
    },
    disableHints(state, action: PayloadAction<boolean>) {
      state.disableHints = action.payload
    },
    setHintIndicator(state, action: PayloadAction<boolean>) {
      state.hintIndicator = action.payload
    },
    setError(state, action: PayloadAction<IError>) {
      state.error = action.payload;
    },
    setStages(state, action: PayloadAction<IStage[]>) {
      state.stages = action.payload || [];
      state.isLoading = false;
      state.error.active = false;
    },
    setLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const levelsReducer = levelsSlice.reducer;
export const levelsActions = levelsSlice.actions;