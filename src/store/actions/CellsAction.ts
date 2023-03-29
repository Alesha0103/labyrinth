import { ICell, Warning } from "../../models/ICells";
import { cellsSlice } from "../reducers/CellsSlice";
import { AppDispatch, RootState } from "../store";

export const chooseCell = (cell: ICell) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const cellsState = getState().cellsReducer;
  const duplicatedCell = cellsState.chosenCells.find(el => el.id === cell.id);

  if(!duplicatedCell) {
    dispatch(cellsSlice.actions.chooseCell(cell));
  }
}

export const clearChosenCells = () => (dispatch: AppDispatch) => {
  dispatch(cellsSlice.actions.clearChosenCells());
}

export const setWarning = (warning: Warning) => (dispatch: AppDispatch) => {
  let warningText: string = "";

  if(warning === Warning.error) {
    warningText = "Follow the rools!"
  }
  if(warning === Warning.warning) {
    warningText = "Cell is already selected"
  }
  dispatch(cellsSlice.actions.setWarning(warningText));
  dispatch(cellsSlice.actions.setWarningType(warning));
}