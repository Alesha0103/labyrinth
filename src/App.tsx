import React from 'react';
import './App.scss';

import { Labyrinth } from './components/Labyrinth/Labyrinth';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';
import { setActiveLevel, setDefaultDataBase, setLoader, setTheme } from './store/actions/LevelsActions';
import { Loader } from './components/Loader/Loader';
import Confetti from "react-confetti";
import classNames from 'classnames';
import { ThemeButtons } from './components/ThemeButtons/ThemeButtons';
import { useTranslation } from './hooks/useTranslations';

const App = () => {
  const dispatch = useAppDispatch();
  const {
    wellcomePage,
    isLevelFinished,
    isGameFinished,
    blackTheme,
    error,
    isLoading,
  } = useAppSelector(state => state.levelsReducer);

  const savedLevel = localStorage.getItem("level");
  const savedTheme = localStorage.getItem("theme");

  const labyrinthText = useTranslation("LABYRINTH");

  const updateData = () => {
    if(savedTheme && savedTheme === "dark") {
      dispatch(setTheme(true));
    }
    if(savedLevel) {
      dispatch(setActiveLevel(Number(savedLevel)));
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 1500);
      return;
    }

    dispatch(setDefaultDataBase());
    setTimeout(() => {
      dispatch(setLoader(false));
    }, 1500);
  }

  React.useEffect(() => {
    updateData();
  }, [])

  if (isLoading) {
    return (
      <div className={classNames("app-background", {"black-bg": blackTheme})}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className={classNames("app-overlay", {"black-overlay": blackTheme})}>
        {isGameFinished && <Confetti height={2000}/>}
      </div>
      <div className={classNames("app-background", {"black-bg": blackTheme})} />

      <div className={classNames("app", {
          "black-app": blackTheme,
          "winner-bg": isLevelFinished || isGameFinished,
          "black-winner-bg": (isLevelFinished || isGameFinished) && blackTheme,
        })}>
        <h1>
          {labyrinthText}
        </h1>
        {!isGameFinished ? <Labyrinth/> : <FinishedGame/>}
      </div>

      <ThemeButtons />

      <Modal>
        {wellcomePage && !error.active && <Wellcome/>}
        {isLevelFinished && <FinishedLevel/>}
      </Modal>
    </>
  );
}

export default App;
