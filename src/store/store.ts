import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cellsReducer } from "./reducers/CellsSlice";
import { levelsReducer } from "./reducers/LevelsSlice";
import { generalAppReducer } from "./reducers/GeneralAppSlice";

const rootReducer = combineReducers({
  levelsReducer: levelsReducer,
  cellsReducer: cellsReducer,
  generalReducer: generalAppReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];