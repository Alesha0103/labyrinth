import React from 'react';
import "./LanguageButtons.scss";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  BLACK_BUTTON,
  BLACK_BUTTON_BG,
  LOOSER_COLOR,
  TRANSPARENT_BLACK,
  TRANSPARENT_YELLOW,
  WINNER_COLOR,
} from "../../constants";
import { NAVAJOWHITE_COLOR } from '../../constants';
import { MILK_TEXT_COLOR } from '../../constants';
import { GREEN_TITLE_COLOR } from '../../constants';

import UA from '../../assets/ua_flag.png';
import USA from '../../assets/usa_flag.png';
import classNames from 'classnames';
import { Languages } from '../../models/IGeneral';
import { openLanguagesButtons, setLanguage } from '../../store/actions/GeneralActions';

export const LanguageButtons = () => {
  const dispatch = useAppDispatch();
  const flagRef = React.useRef<HTMLDivElement | null>(null);

  const [initial, setInitial] = React.useState(true);

  const {
    isLevelFinished,
    isGameFinished,
    error: { active },
  } = useAppSelector((state) => state.levelsReducer);

  const { language, languagesOpened, wellcomePage,blackTheme } = useAppSelector(state => state.generalReducer);

  const chooseLanguage = (lang: Languages) => () => {
    localStorage.setItem("language", lang);
    dispatch(setLanguage(lang));
    setInitial(true);
  }

  const chooseColor = (disabled: boolean): string => {
    if (!blackTheme && !wellcomePage && !disabled){
      return MILK_TEXT_COLOR;
    }
    if (!blackTheme && (isLevelFinished || isGameFinished)) {
      return GREEN_TITLE_COLOR;
    }
    if (!blackTheme && active && disabled) {
      return MILK_TEXT_COLOR;
    }
    if (blackTheme && (isLevelFinished || isGameFinished)) {
      return WINNER_COLOR;
    }
    if (wellcomePage) {
      return LOOSER_COLOR;
    }

    return LOOSER_COLOR;
  }

  const switchBg = (disabled: boolean): string => {
    switch (disabled) {
      case false:
        return "transparent";
      case true:
        if (blackTheme) {
          return BLACK_BUTTON;
        }
        if (!blackTheme && wellcomePage) {
          return NAVAJOWHITE_COLOR;
        }
      return MILK_TEXT_COLOR;

      default:
        return "transparent";
    }
  }

  const switchFlagBg = () => {
    if (blackTheme) {
      return BLACK_BUTTON_BG;
    }
    if (!blackTheme && !wellcomePage) {
      return TRANSPARENT_BLACK;
    }
    if (!blackTheme && wellcomePage) {
      return TRANSPARENT_YELLOW;
    }
  }

  const checkFlag = () => {
    if (language === Languages.UA) {
      return <img src={UA} alt="Ukraine"/>
    }
    if (language === Languages.USA) {
      return <img src={USA} alt="USA"/>
    }
  }

  const handleButtons = () => {
    if (initial) {
      setInitial(false);
    }
    dispatch(openLanguagesButtons(!languagesOpened));
  }

  const handleClickOutside = (event: any) => {
    if (flagRef.current && !flagRef.current.contains(event.target)) {
      dispatch(openLanguagesButtons(false));
    }
  }

  const buttonsStyles = {
    "--firstButtonAnimation": !initial ? "slideFirstButton" : "",
    "--secondButtonAnimation": !initial ? "slideSecondButton" : "",
    "--buttonsOpacity": !initial ? 0 : 1,
    backgroundColor: switchFlagBg()
  }

  React.useEffect(() => {
    if (languagesOpened === true) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [languagesOpened]);

  return (
    <div className="languages-container" ref={flagRef}>
      <div className="flag" onClick={handleButtons}>
        {checkFlag()}
      </div>
      <div className={classNames("buttons", {
          ["initial-buttons"]: initial && languagesOpened,
          ["show-buttons"]: !initial && languagesOpened,
          ["hide-buttons"]: !languagesOpened && !initial,
        })}
        style={buttonsStyles}
      >
        <button
          disabled={language === Languages.USA}
          onClick={chooseLanguage(Languages.USA)}
          style={{
            color: chooseColor(language === Languages.USA),
            backgroundColor: switchBg(language === Languages.USA)
          }}
        >
          English
        </button>
        <button
          disabled={language === Languages.UA}
          onClick={chooseLanguage(Languages.UA)}
          style={{
            color: chooseColor(language === Languages.UA),
            backgroundColor: switchBg(language === Languages.UA)
          }}
        >
          Українська
        </button>
      </div>
    </div>
  );
}
