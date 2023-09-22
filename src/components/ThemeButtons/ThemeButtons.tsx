import React from 'react'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTheme } from '../../store/actions/LevelsActions';
import { LOOSER_COLOR, WINNER_COLOR } from '../../constants';
import "./ThemeButtons.scss";

export const ThemeButtons = () => {
  const dispatch = useAppDispatch();
  const { isLevelFinished, isGameFinished, blackTheme } = useAppSelector(state => state.levelsReducer);

  const handleTheme = () => {
    dispatch(setTheme(blackTheme ? false : true));
    localStorage.setItem("theme", blackTheme ? "light" : "dark");
  }

  return (
    <div className={classNames("handle-theme", { "handle-theme-black": blackTheme })} >
        <button
          disabled={!blackTheme}
          onClick={handleTheme}
          style={{
            color:
              blackTheme && (isLevelFinished || isGameFinished)
                ? WINNER_COLOR
                : LOOSER_COLOR,
          }}>
          light
        </button>
        <button
          disabled={blackTheme}
          onClick={handleTheme}
          style={{
            color:
              blackTheme && (isLevelFinished || isGameFinished)
                ? WINNER_COLOR
                : LOOSER_COLOR,
          }}>
          dark
        </button>
      </div>
  )
}
