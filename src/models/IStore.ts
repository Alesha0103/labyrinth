import { ICell, Warning } from "./ICells";
import { ILevel } from "./ILevel";

export interface levelsState {
  level: ILevel | null,
  isLoading: boolean,
  error: boolean,
  loserOverlay: boolean,
}

export interface CellsState {
  chosenCells: ICell[],
  warning: string,
  warningType: Warning,
}

export interface RootInterface {
  levels: levelsState,
  cells: CellsState,
}