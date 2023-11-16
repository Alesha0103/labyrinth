export enum Warning {
  LAST_STAGE = "lastStage",
  WARNING = "warning",
  ERROR = "error",
  CLEAR = "",
}

export interface ICell {
  id: number,
  firstStep?: boolean,
  neighbor: number[],
}

export interface CellsState {
  cells: ICell[],
  rightWay: number[],
  chosenCells: ICell[],
  warning: string,
  warningType: Warning,
  attempts: number,
}