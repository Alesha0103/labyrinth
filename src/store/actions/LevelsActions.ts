import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IError, IStage } from "../../models/ILevel";
import { AppDispatch, RootState } from "../store";
import { levelsActions } from "../reducers/LevelsSlice";
import { PayloadType, getRandomStageId } from "../../helpers";

export const fetchStages = createAsyncThunk(
  "levels/fetchStages",
  async (levelID: number, thunckAPI) => {
    try {
      const response = await axios.get<IStage[]>(`http://localhost:5000/levels/${levelID}`);
      if (!response.data.length) {
        thunckAPI.dispatch(finishGame(true));
      }
      thunckAPI.dispatch(setStages(response.data));
    } catch {
      thunckAPI.dispatch(setError({active: true, message: "WAS_NOT_UPDATED"}))
    }
  }
);

export const finishStage = createAsyncThunk(
  "levels/finishStage",
  async (stageID: number|string, thunckAPI) => {
    try {
      await axios.put<IStage>(`http://localhost:5000/stages/${stageID}`);
    } catch {
      thunckAPI.dispatch(setError({active: true, message: ""}))
    }
  }
);

export const checkIfGameFinished = createAsyncThunk(
  "levels/finishGame",
  async (levelID: number, thunckAPI) => {
    try {
      const res = await axios.get<boolean>(`http://localhost:5000/check-the-end`);
      if(res && !res.data) {
        thunckAPI.dispatch(finishLevelPopup(true));
      } else if (res && res.data) {
        thunckAPI.dispatch(finishGame(true));
      }
    } catch (error) {
      thunckAPI.dispatch(setError({active: true, message: ""}));
    }
  }
);

export const setDefaultDataBase = createAsyncThunk(
  "levels/setDefaultDataBase",
  async (_, thunckAPI) => {
    try {
      await axios.put<boolean>(`http://localhost:5000/defaultDataBase`);
    } catch (error) {
      thunckAPI.dispatch(setError({active: true, message: "WAS_NOT_UPDATED"}));
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
export const finishGame = (isFinished: boolean) => levelsActions.finishGame(isFinished);
export const disableHints = (isDisabled: boolean) => levelsActions.disableHints(isDisabled);
export const setHintIndicator = (indicator: boolean) => levelsActions.setHintIndicator(indicator);
export const setError = (error: IError) => levelsActions.setError(error);
export const setLoader = (loader: boolean) => levelsActions.setLoader(loader);
export const setStages = (stages: IStage[]) => levelsActions.setStages(stages);