import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from '../../hooks/useTranslations';
import { Training } from '../Training/Training';
import { Labyrinth } from '../Labyrinth/Labyrinth';
import { Wellcome } from '../Wellcome/Wellcome';
import classNames from 'classnames';
import "./Pages.scss";

export const Pages = () => {
  const {
    isLevelFinished,
    isGameFinished,
  } = useAppSelector(state => state.levelsReducer);

  const { wellcomePage, blackTheme, training } = useAppSelector(state => state.generalReducer);

  const labyrinthText = useTranslation("LABYRINTH");

  const renderPage = () => {
    if (training) {
      return <Training/>
    }
    if (isGameFinished) {
      return null;
    } 
    return <Labyrinth/>
  }

  return (
    <>
      {wellcomePage && <Wellcome/>}
      {!wellcomePage && (
        <div className={classNames("app", {
            "black-app": blackTheme,
            "winner-bg": isLevelFinished || isGameFinished,
            "black-winner-bg": (isLevelFinished || isGameFinished) && blackTheme,
          })}>
          <h1>
            {labyrinthText}
          </h1>
          {renderPage()}
        </div>
      )}
    </>
  )
}
