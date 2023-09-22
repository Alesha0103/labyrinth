import { ICell } from "./ICells";

export interface IStage {
  id: number,
  rightWay: number[],
  cells: ICell[],
  done?: boolean,
  geometry: {
    columns: number,
    rows: number,
  }
}

export interface ILevel {
  id: number,
  isLevelActive: boolean,
  stages: IStage[],
  rightWay: number[],
}

export interface levelsState {
  level: number,
  isLoading: boolean,
  error: boolean,
  stages: IStage[],
  activeStageID: number,
  loserOverlay: boolean,
  winerOverlay: boolean,
  isLevelFinished: boolean,
  isGameFinished: boolean,
  disableHints: boolean,
  hintIndicator: boolean,
  blackTheme: boolean,
}