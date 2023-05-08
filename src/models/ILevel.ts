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
  level: number,
  isLoading: boolean,
  error: boolean,
  stages: IStage[],
  activeStageID: number,
  loserOverlay: boolean,
  winerOverlay: boolean
}