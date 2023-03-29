import { ICell } from "./ICells";

interface IStage {
  id: number,
  cells: ICell[],
}

export interface ILevel {
  id: number,
  isLevelActive: boolean,
  stages: IStage[]
}