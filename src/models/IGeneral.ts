import { IStage } from "./ILevel";

export enum Languages {
  USA = "usa",
  UA = "ua",
}

export interface GeneralAppState {
  blackTheme: boolean,
  wellcomePage: boolean,
  translation: { [key:string]: string },
  language: Languages,
  languagesOpened: boolean,
  trainingLevel: IStage,
  training: boolean,
  chosenWrongCells: number[],
}