import React from 'react'
import { LanguageButtons } from '../LanguageButtons/LanguageButtons';
import { ThemeButtons } from '../ThemeButtons/ThemeButtons';
import { useAppSelector } from '../../hooks/redux';
import {
  BLACK_BUTTON,
  GREY_DIVIDER,
  MILK_COLOR,
  PINK_DIVIDER,
  RED_TEXT_COLOR,
  WINNER_COLOR,
} from "../../constants";
import "./Header.scss"

export const Header = () => {
  const { wellcomePage, blackTheme } = useAppSelector(state => state.generalReducer);
  const { isLevelFinished, isGameFinished } = useAppSelector(state => state.levelsReducer);

  const switchBgColor = () =>{
    switch(blackTheme) {
      case true:
        return BLACK_BUTTON;
      case false:
        if (wellcomePage) {
          return MILK_COLOR;
        }
        return GREY_DIVIDER;
    }
  }
  const switchDividerColor = () => {
    switch(blackTheme) {
      case false:
        if (wellcomePage) {
          return PINK_DIVIDER;
        }
        return MILK_COLOR;
      case true:
        if (isLevelFinished || isGameFinished) {
          return WINNER_COLOR;
        }
        return RED_TEXT_COLOR;
    }
  }

  const styles: object = {
    backgroundColor: switchBgColor(),
    "--dividerColor": switchDividerColor(),
  }

  return (
    <div className="header-wrapper"
      style={styles}
    >
      <div className="header">
        <LanguageButtons />
        <ThemeButtons />
      </div>
    </div>
  )
}
