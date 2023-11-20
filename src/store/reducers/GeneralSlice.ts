import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralAppState, Languages } from "../../models/IGeneral";

const initialState: GeneralAppState = {
  blackTheme: false,
  wellcomePage: true,
  translation: {},
  language: Languages.USA,

  training: true,
  trainingLevel: {
    id: 999,
    rightWay: [1, 4, 5, 6, 9],
    geometry: {
      columns: 3,
      rows: 3,
    },
    cells: [
      { id: 1, neighbor: [2, 4], firstStep: true },
      { id: 2, neighbor: [1, 3, 5] },
      { id: 3, neighbor: [2, 6] },
      { id: 4, neighbor: [5, 7, 1] },
      { id: 5, neighbor: [2, 4, 6, 8] },
      { id: 6, neighbor: [3, 5, 9] },
      { id: 7, neighbor: [4, 8] },
      { id: 8, neighbor: [5, 7, 9] },
      { id: 9, neighbor: [6, 8] }
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
  }
});

export const generalAppReducer = generalSlice.reducer;
export const generalAppActions = generalSlice.actions;