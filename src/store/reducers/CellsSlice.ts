import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICell, Warning } from "../../models/ICells";

interface CellsState {
  chosenCells: ICell[],
  warning: string,
  warningType: Warning,
}

const initialState: CellsState = {
  chosenCells: [],
  warning: "",
  warningType: Warning.clear,
}

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    chooseCell(state, action: PayloadAction<ICell>) {
      state.chosenCells = [...state.chosenCells, action.payload];
    },
    setWarning(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
    setWarningType(state, action: PayloadAction<Warning>) {
      state.warningType = action.payload;
    },
    clearChosenCells(state) {
      state.chosenCells = [];
    }
  }
});