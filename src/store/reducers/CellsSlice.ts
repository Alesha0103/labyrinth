import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellsState, ICell, Warning } from "../../models/ICells";

const initialState: CellsState = {
  cells: [],
  rightWay: [],
  chosenCells: [],
  warning: "",
  warningType: Warning.clear,
  attempts: 0,
}

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setCells(state, action: PayloadAction<ICell[]>) {
      state.cells = action.payload;
    },
    setRightWay(state, action: PayloadAction<number[]>) {
      state.rightWay = action.payload;
    },
    setWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    setWarningType(state, action: PayloadAction<Warning>) {
      state.warningType = action.payload;
    },
    chooseCell(state, action: PayloadAction<ICell>) {
      state.chosenCells = [...state.chosenCells, action.payload];
    },
    clearChosenCells(state) {
      state.chosenCells = [];
    },
    setAttempts(state, action: PayloadAction<number>) {
      state.attempts = action.payload
    },
  }
});

export const cellsReducer = cellsSlice.reducer;
export const cellsActions = cellsSlice.actions;