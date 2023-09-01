export enum Warning {
  lastStage = "lastStage",
  warning = "warning",
  error = "error",
  clear = "",
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