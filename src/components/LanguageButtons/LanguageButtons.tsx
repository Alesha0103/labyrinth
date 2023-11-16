import React from 'react';
import "./LanguageButtons.scss";
import { useAppDispatch } from '../../hooks/redux';
import { Languages } from '../../models/ILevel';
import { setLanguage } from '../../store/actions/LevelsActions';

export const LanguageButtons = () => {
  const dispatch = useAppDispatch();

  const choseLanguage = (lang: Languages) => () => {
    localStorage.setItem("language", lang);
    dispatch(setLanguage(lang));
  }

  return (
    <div className="languages-container">
      <button onClick={choseLanguage(Languages.USA)}>English</button>
      <button onClick={choseLanguage(Languages.UA)}>Українська</button>
    </div>
  )
}
