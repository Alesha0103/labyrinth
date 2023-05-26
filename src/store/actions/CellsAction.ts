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

  if(warning === Warning.error) {
    warningText = "Follow the rools!"
  }
  if(warning === Warning.warning) {
    warningText = "Cell is already selected"
  }
  if(warning === Warning.lastStage) {
    warningText = "You are close! Don't give up!"
  }
  dispatch(cellsActions.setWarning(warningText));
  dispatch(cellsActions.setWarningType(warning));
}

export const clearChosenCells = () => cellsActions.clearChosenCells();