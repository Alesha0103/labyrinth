export enum Languages {
  USA = "usa",
  UA = "ua",
}

export interface GeneralAppState {
  blackTheme: boolean,
  wellcomePage: boolean,
  translation: { [key:string]: string },
  language: Languages,
  firstLevel: any,
}