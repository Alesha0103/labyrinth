import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellsState, ICell, Warning } from "../../models/ICells";

const initialState: CellsState = {
  cells: [],
  chosenCells: [],
  warning: "",
  warningType: Warning.clear,
}

const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setCells(state, action: PayloadAction<ICell[]>) {
      state.cells = action.payload;
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
    }
  }
});

export const cellsReducer = cellsSlice.reducer;
export const cellsActions = cellsSlice.actions;