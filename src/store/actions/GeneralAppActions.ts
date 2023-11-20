import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultTranslation } from "../../assets/defaultTranslations";
import { Languages } from "../../models/IGeneral";
import { generalAppActions } from "../reducers/GeneralAppSlice";

export const setLanguage = createAsyncThunk(
  "levels/setLanguage",
  async (language: Languages, thunckAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/translations/${language}`);
      thunckAPI.dispatch(setTranslation({language, translation: response.data}))
    } catch {
      thunckAPI.dispatch(setTranslation({language: Languages.USA, translation: defaultTranslation}))
    }
  }
);

export const setTheme = (blackTheme: boolean) => generalAppActions.setTheme(blackTheme);
export const hideWellcomePage = () => generalAppActions.hideWellcomePage();
export const setTranslation = ({language, translation}: { language: Languages, translation: { [key:string]: string } }) => 
  generalAppActions.setTranslation({language, translation});