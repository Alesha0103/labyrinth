import axios from "axios";
import { ILevels } from "../../models/ILevels";
import { levelsSlice } from "../reducers/LevelsSlice";
import { AppDispatch } from "../store";

export const fetchAllLevels = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(levelsSlice.actions.levelsFetching());
    const response = await axios.get<ILevels[]>("http://localhost:5000/levels");
    await dispatch(levelsSlice.actions.levelsFetchingSuccsess(response.data));
  } catch (err) {
    dispatch(levelsSlice.actions.levelsFetchingFailure(true));
  }
}