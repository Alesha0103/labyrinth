import axios from "axios";
import { ILevel } from "../../models/ILevel";
import { levelsSlice } from "../reducers/LevelsSlice";
import { AppDispatch, AppStore } from "../store";

export const fetchLevelAction = (levleID: number|string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(levelsSlice.actions.levelsFetching());
    const response = await axios.get<ILevel>(`http://localhost:5000/levels/${levleID}`);
    await dispatch(levelsSlice.actions.levelsFetchingSuccsess(response.data));
  } catch (err) {
    dispatch(levelsSlice.actions.levelsFetchingFailure(true));
  }
}

export const finishStageAction = (stageID: number|string) => async (dispatch: AppDispatch) => {
  try {
   const response = await axios.put<any>(`http://localhost:5000/stages/${stageID}`);
   console.log('response :>> ', response.data);

  } catch (err) {
    console.log('err :>> ', err);
  }
};

export const setLoserOverlay = (state: boolean) => async (dispatch: AppDispatch) => {
  dispatch(levelsSlice.actions.setOverlay(state));
}