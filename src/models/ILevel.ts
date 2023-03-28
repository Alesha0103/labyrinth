export interface ICell {
  id: number,
  toVictory: boolean,
  neighbor: number[],
}

export interface IVariant {
  id: number,
  cells: ICell[],
}

export interface ILevel {
  id: number,
  isLevelActive: boolean,
  variants: IVariant[]
}