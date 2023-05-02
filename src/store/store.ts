import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cellsSlice } from "./reducers/CellsSlice";
import { levelsSlice } from "./reducers/LevelsSlice";

const rootReducer = combineReducers({
  levelsReducer: levelsSlice.reducer,
  cellsReducer: cellsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];