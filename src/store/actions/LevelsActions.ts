import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IStage } from "../../models/ILevel";
import { AppDispatch, RootState } from "../store";
import { levelsActions } from "../reducers/LevelsSlice";
import { PayloadType, getRandomStageId } from "../../helpers";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export const fetchStages = createAsyncThunk(
  "levels/fetchLevel",
  async (levelID: number, thunckAPI) => {
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

export const checkIfGameFinished = createAsyncThunk(
  "levels/finishGame",
  async (levelID: number, thunckAPI) => {
    try {
      const res = await axios.get<boolean>(`http://localhost:5000/check-the-end`);
      if(res && !res.data) {
        thunckAPI.dispatch(setActiveLevel(levelID));
        thunckAPI.dispatch(finishLevelPopup(true));
      } else if (res && res.data) {
        thunckAPI.dispatch(finishGame());
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
);

export const getRandomStage = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const {activeStageID, stages} = getState().levelsReducer;
  const payload: PayloadType = {
    id: activeStageID,
    possibleId: stages.map(stage => stage.id),
    forbiddenId: stages.filter(stage => stage.done).map(stage => stage.id)
  }
  const stageID = getRandomStageId(payload);
  if (stageID) {
    dispatch(setActiveStage(stageID));
  }
};

export const setActiveLevel = (levelID: number) => levelsActions.setActiveLevel(levelID);
export const setActiveStage = (stageID: number) => levelsActions.setActiveStage(stageID);
export const setLoserOverlay = (loserOverlay: boolean) => levelsActions.setLoserOverlay(loserOverlay);
export const setWinnerOverlay = (winnerOverlay: boolean) => levelsActions.setWinnerOverlay(winnerOverlay);
export const hideOverlay = () => levelsActions.hideOverlay();
export const finishLevelPopup = (finish: boolean) => levelsActions.finishLevelPopup(finish);
export const finishGame = () => levelsActions.finishGame();
export const showHint = (hint: boolean) => levelsActions.showHint(hint);
export const disableHints = (isDisabled: boolean) => levelsActions.disableHints(isDisabled);
