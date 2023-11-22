import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralAppState, Languages } from "../../models/IGeneral";

const initialState: GeneralAppState = {
  blackTheme: false,
  wellcomePage: true,
  translation: {},
  language: Languages.USA,
  languagesOpened: false,

  chosenWrongCells: [],
  training: true,
  trainingLevel: {
    id: 999,
    rightWay: [3, 7, 6, 10, 9],
    geometry: {
      columns: 3,
      rows: 3,
    },
    cells: [
      { id: 1, neighbor: [2, 5] },
      { id: 2, neighbor: [1, 3, 6] },
      { id: 3, neighbor: [2, 4, 7], firstStep: true },
      { id: 4, neighbor: [3, 8] },
      { id: 5, neighbor: [1, 6, 9] },
      { id: 6, neighbor: [2, 5, 7 ,10] },
      { id: 7, neighbor: [3, 6, 8, 11] },
      { id: 8, neighbor: [4, 7, 12] },
      { id: 9, neighbor: [5, 10] },
      { id: 10, neighbor: [6, 9, 11] },
      { id: 11, neighbor: [7, 10, 12] },
      { id: 12, neighbor: [8, 11] },
    ]
  },
}

const generalSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<boolean>) {
      state.blackTheme = action.payload
    },
    hideWellcomePage(state) {
      state.wellcomePage = false;
    },
    setTranslation(state, action: PayloadAction<{ language: Languages, translation: { [key:string]: string } }>) {
      state.language = action.payload.language;
      state.translation = action.payload.translation;
    },
    setTrainingLevel(state, action: PayloadAction<boolean>) {
      state.training = action.payload;
    },
    chooseCell(state, action: PayloadAction<number>) {
      state.chosenWrongCells = [...state.chosenWrongCells, action.payload];
    },
    resetWrongCells(state) {
      state.chosenWrongCells = [];
    },
    openLanguagesButtons(state, action: PayloadAction<boolean>) {
      state.languagesOpened = action.payload;
    }
  }
});

export const generalAppReducer = generalSlice.reducer;
export const generalAppActions = generalSlice.actions;