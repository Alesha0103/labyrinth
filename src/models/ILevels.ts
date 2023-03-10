export interface ICell {
  id: number,
  toVictory: boolean
}

export interface ILevels {
  id: number,
  isLevelActive: boolean,
  variants: ICell[]
}