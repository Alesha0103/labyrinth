import React from 'react'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTheme } from '../../store/actions/LevelsActions';
import { GREEN_TITLE_COLOR, LOOSER_COLOR, MILK_TEXT_COLOR, NAVAJOWHITE_COLOR, WINNER_COLOR } from '../../constants';
import "./ThemeButtons.scss";
import { useTranslation } from '../../hooks/useTranslations';

export const ThemeButtons = () => {
  const dispatch = useAppDispatch();
  const { wellcomePage, isLevelFinished, isGameFinished, blackTheme } = useAppSelector(state => state.levelsReducer);

  const lightThemeText = useTranslation("LIGHT_THEME");
  const darkThemeText = useTranslation("DARK_THEME");

  const handleTheme = () => {
    dispatch(setTheme(blackTheme ? false : true));
    localStorage.setItem("theme", blackTheme ? "light" : "dark");
  }

  const chooseColor = (disabled: boolean): string => {
    if (!blackTheme && !wellcomePage && disabled){
      return MILK_TEXT_COLOR;
    }
    if (!blackTheme && (isLevelFinished || isGameFinished)) {
      return GREEN_TITLE_COLOR;
    }
    if (blackTheme && (isLevelFinished || isGameFinished)) {
      return WINNER_COLOR;
    }
    if (wellcomePage) {
      return LOOSER_COLOR;
    }

    return LOOSER_COLOR;
  }

  return (
    <div className={classNames("handle-theme", { "handle-theme-black": blackTheme })} >
        <button
          disabled={!blackTheme}
          onClick={handleTheme}
          style={{color: chooseColor(!blackTheme)}}
        >
          {lightThemeText}
        </button>
        <button
          disabled={blackTheme}
          onClick={handleTheme}
          style={{color: chooseColor(blackTheme), backgroundColor: !blackTheme && wellcomePage ? NAVAJOWHITE_COLOR : ""}}
        >
          {darkThemeText}
        </button>
      </div>
  )
}
