import { defaultTranslation } from "../assets/defaultTranslations";
import { useAppSelector } from "./redux";

export function useTranslation(key: string) {
  return useAppSelector(state => state.generalReducer.translation[key])
    || defaultTranslation[key]
    || null
}