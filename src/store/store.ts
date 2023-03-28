import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { levelsAPI } from "../services/LevelsService";
import { cellsSlice } from "./reducers/CellsSlice";
import { levelsSlice } from "./reducers/LevelsSlice";

const rootReducer = combineReducers({
  levelsReducer: levelsSlice.reducer,
  cellsReducer: cellsSlice.reducer,
  [levelsAPI.reducerPath]: levelsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(levelsAPI.middleware),
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];