import { ICell } from "./ICells";

interface IStage {
  id: number,
  cells: ICell[],
  done?: boolean,
}

export interface ILevel {
  id: number,
  isLevelActive: boolean,
  stages: IStage[]
}