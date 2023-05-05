import { ICell } from "./ICells";

export interface IStage {
  id: number,
  cells: ICell[],
  done?: boolean,
}

export interface ILevel {
  id: number,
  isLevelActive: boolean,
  stages: IStage[]
}

export interface levelsState {
  level: ILevel | null,
  isLoading: boolean,
  error: boolean,
  loserOverlay: boolean,
  winerOverlay: boolean
}