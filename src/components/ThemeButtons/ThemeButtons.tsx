import React from 'react'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { GREEN_TITLE_COLOR, LOOSER_COLOR, MILK_COLOR, NAVAJOWHITE_COLOR, WINNER_COLOR } from '../../constants';
import "./ThemeButtons.scss";
import { useTranslation } from '../../hooks/useTranslations';
import { setTheme } from '../../store/actions/GeneralActions';

export const ThemeButtons = () => {
  const dispatch = useAppDispatch();
  const { isLevelFinished, isGameFinished, error: { active } } = useAppSelector(state => state.levelsReducer);
  const { wellcomePage, blackTheme } = useAppSelector(state => state.generalReducer);

  const lightThemeText = useTranslation("LIGHT_THEME");
  const darkThemeText = useTranslation("DARK_THEME");

  const handleTheme = () => {
    dispatch(setTheme(blackTheme ? false : true));
    localStorage.setItem("theme", blackTheme ? "light" : "dark");
  }
  const chooseColor = (disabled: boolean): string => {
    if (!blackTheme && !wellcomePage && !disabled){
      return MILK_COLOR;
    }
    if (!blackTheme && (isLevelFinished || isGameFinished)) {
      return GREEN_TITLE_COLOR;
    }
    if (!blackTheme && active && disabled) {
      return MILK_COLOR;
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
          style={{color: chooseColor(!blackTheme), backgroundColor: !blackTheme && wellcomePage ? NAVAJOWHITE_COLOR : ""}}
        >
          {lightThemeText}
        </button>
        <button
          disabled={blackTheme}
          onClick={handleTheme}
          style={{color: chooseColor(blackTheme)}}
        >
          {darkThemeText}
        </button>
      </div>
  )
}
