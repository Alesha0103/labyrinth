import { ICell, Warning } from "../../models/ICells";
import { cellsActions } from "../reducers/CellsSlice";
import { AppDispatch, RootState } from "../store";

export const setCells = (cells: ICell[]) => cellsActions.setCells(cells);
export const setRightWay = (ids: number[]) => cellsActions.setRightWay(ids);

export const chooseCell = (cell: ICell) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const cellsState = getState().cellsReducer;
  const duplicatedCell = cellsState.chosenCells.find(el => el.id === cell.id);

  if(!duplicatedCell) {
    dispatch(cellsActions.chooseCell(cell));
  }
}

export const setWarning = (warning: Warning) => (dispatch: AppDispatch) => {
  let warningText: string = "";

  if(warning === Warning.ERROR) {
    warningText = "WARNING_ERROR"
  }
  if(warning === Warning.WARNING) {
    warningText = "WARNING"
  }
  if(warning === Warning.LAST_STAGE) {
    warningText = "WARNING_LAST_STAGE"
  }
  dispatch(cellsActions.setWarning(warningText));
  dispatch(cellsActions.setWarningType(warning));
}

export const clearChosenCells = () => cellsActions.clearChosenCells();
export const setAttempts = (attempts: number) => cellsActions.setAttempts(attempts);