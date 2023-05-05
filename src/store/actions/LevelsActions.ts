import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILevel, IStage } from "../../models/ILevel";
import { RootState } from "../store";
import { levelsActions } from "../reducers/LevelsSlice";

export const fetchLevel = createAsyncThunk(
  "levels/fetchLevel",
  async (levelID: number|string|undefined, thunckAPI) => {
    const state = thunckAPI.getState() as RootState;
    const checkLevelId = levelID ? levelID : state.levelsReducer.level?.id;
    try {
      const response = await axios.get<ILevel>(`http://localhost:5000/levels/${checkLevelId}`);
      return response.data
    } catch (err) {
      if (err instanceof Error) {
       return thunckAPI.rejectWithValue(err.message)
      } else {
        return thunckAPI.rejectWithValue("unknown error")
      }
    }
  }
);

export const finishStage = createAsyncThunk(
  "levels/finishStage",
  async (stageID: number|string, thunckAPI) => {
    try {
      thunckAPI.dispatch(setWinnerOverlay(true));
      axios.put<IStage>(`http://localhost:5000/stages/${stageID}`);
      thunckAPI.dispatch(fetchLevel());
    } catch (error) {
      if (error instanceof Error) {
        return thunckAPI.rejectWithValue(error.message)
       } else {
         return thunckAPI.rejectWithValue("unknown error")
       }
    }
  }
);

export const setLoserOverlay = (loserOverlay: boolean) => levelsActions.setLoserOverlay(loserOverlay);
export const setWinnerOverlay = (winnerOverlay: boolean) => levelsActions.setWinnerOverlay(winnerOverlay);
export const hideOverlay = () => levelsActions.hideOverlay();
