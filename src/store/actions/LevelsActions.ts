import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStage } from "../../models/ILevel";
import { AppDispatch, RootState } from "../store";
import { levelsActions } from "../reducers/LevelsSlice";
import { PayloadType, getRandomStageId } from "../../helpers";

export const fetchStages = createAsyncThunk(
  "levels/fetchLevel",
  async (_, thunckAPI) => {
    const state = thunckAPI.getState() as RootState;
    const levelID = state.levelsReducer.level;
    try {
      const response = await axios.get<IStage[]>(`http://localhost:5000/levels/${levelID}`);
      if (!response.data.length) {
        thunckAPI.dispatch(finishGame());
      }
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
      axios.put<IStage>(`http://localhost:5000/stages/${stageID}`);
    } catch (error) {
      if (error instanceof Error) {
        return thunckAPI.rejectWithValue(error.message)
       } else {
         return thunckAPI.rejectWithValue("unknown error")
       }
    }
  }
);

export const getRandomStage = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const {level, activeStageID, stages} = getState().levelsReducer;
  const payload: PayloadType = {
    id: activeStageID,
    possibleId: stages.map(stage => stage.id),
    forbiddenId: stages.filter(stage => stage.done).map(stage => stage.id)
  }
  const stageID = getRandomStageId(payload);
  if (stageID) {
    dispatch(setActiveStage(stageID));
  } else {
    dispatch(finishLevel(true));
  }
};

export const setActiveLevel = (levelID: number) => levelsActions.setActiveLevel(levelID);
export const setActiveStage = (stageID: number) => levelsActions.setActiveStage(stageID);
export const setLoserOverlay = (loserOverlay: boolean) => levelsActions.setLoserOverlay(loserOverlay);
export const setWinnerOverlay = (winnerOverlay: boolean) => levelsActions.setWinnerOverlay(winnerOverlay);
export const hideOverlay = () => levelsActions.hideOverlay();
export const finishLevel = (finish: boolean) => levelsActions.finishLevel(finish);
export const finishGame = () => levelsActions.finishGame();
