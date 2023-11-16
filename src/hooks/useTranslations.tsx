import { defaultTranslation } from "../assets/defaultTranslations";
import { useAppSelector } from "./redux";

export function useTranslation(key: string) {
  return useAppSelector(state => state.levelsReducer.translation[key])
    || defaultTranslation[key]
    || null
}