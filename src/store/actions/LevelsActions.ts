import axios from "axios";
import { ILevel } from "../../models/ILevel";
import { levelsSlice } from "../reducers/LevelsSlice";
import { AppDispatch } from "../store";

export const fetchAllLevelsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(levelsSlice.actions.levelsFetching());
    const response = await axios.get<ILevel[]>("http://localhost:5000/levels");
    await dispatch(levelsSlice.actions.levelsFetchingSuccsess(response.data));
  } catch (err) {
    dispatch(levelsSlice.actions.levelsFetchingFailure(true));
  }
}