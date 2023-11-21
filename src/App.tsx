import React from 'react';
import './App.scss';

import { Labyrinth } from './components/Labyrinth/Labyrinth';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';
import { setActiveLevel, setDefaultDataBase, setLoader } from './store/actions/LevelsActions';
import { setLanguage, setTheme, setTrainingLevel } from './store/actions/GeneralActions';
import { Loader } from './components/Loader/Loader';
import Confetti from "react-confetti";
import classNames from 'classnames';
import { useTranslation } from './hooks/useTranslations';
import { Header } from './components/Header/Header';
import { Languages } from './models/IGeneral';
import { Training } from './components/Training/Training';

const App = () => {
  const dispatch = useAppDispatch();
  const {
    isLevelFinished,
    isGameFinished,
    error,
    isLoading,
  } = useAppSelector(state => state.levelsReducer);

  const { wellcomePage, blackTheme, training } = useAppSelector(state => state.generalReducer);

  const savedLevel = localStorage.getItem("level");
  const trainingDone = localStorage.getItem("training");
  const savedTheme = localStorage.getItem("theme");
  const savedLanguage = localStorage.getItem("language") as Languages;

  const labyrinthText = useTranslation("LABYRINTH");

  const updateData = () => {
    if (trainingDone) {
      dispatch(setTrainingLevel(false));
    }
    if (savedLanguage) {
      dispatch(setLanguage(savedLanguage));
    }
    if (savedTheme && savedTheme === "dark") {
      dispatch(setTheme(true));
    }
    if (savedLevel) {
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

  const renderComponent = () => {
    if (training) {
      return <Training/>
    }
    if (isGameFinished) {
      return <FinishedGame/>
    } else {
      return <Labyrinth/>
    }
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
      <Header />
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
        {renderComponent()}
      </div>

      <Modal>
        {wellcomePage && !error.active && <Wellcome/>}
        {isLevelFinished && <FinishedLevel/>}
      </Modal>
    </>
  );
}

export default App;
