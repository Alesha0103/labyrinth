import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import Confetti from "react-confetti";
import classNames from 'classnames';

import "./AppConfetti.scss";

export const AppConfetti = () => {
  const { isGameFinished } = useAppSelector(state => state.levelsReducer);

  const { blackTheme } = useAppSelector(state => state.generalReducer);
  return (
    <>
      <div className={classNames("app-overlay", {"black-overlay": blackTheme})}>
        {isGameFinished && <Confetti height={2000}/>}
      </div>
      <div className={classNames("app-background", {"black-bg": blackTheme})} />
    </>
  )
}
