import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICell } from "../../models/ILevel";

interface CellsState {
  chosenCells: ICell[],
}

const initialState: CellsState = {
  chosenCells: [],
}

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    chooseCell(state, action: PayloadAction<ICell>) {
      const duplicatedCell = state.chosenCells.find(cell => cell.id === action.payload.id);

      if(!duplicatedCell) {
        state.chosenCells = [...state.chosenCells, action.payload];
      }
    }
  }
});