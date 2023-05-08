export enum Warning {
  warning = "warning",
  error = "error",
  clear = "",
}

export interface ICell {
  id: number,
  toVictory: boolean,
  neighbor: number[],
}

export interface CellsState {
  cells: ICell[],
  chosenCells: ICell[],
  warning: string,
  warningType: Warning,
}