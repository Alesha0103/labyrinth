import React from 'react';
import './App.scss';

import { Modal } from './components/Modal/Modal';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';
import { setActiveLevel, setDefaultDataBase, setLoader } from './store/actions/LevelsActions';
import { setLanguage, setTheme, setTrainingLevel } from './store/actions/GeneralActions';
import { Loader } from './components/Loader/Loader';
import { Header } from './components/Header/Header';
import { Languages } from './models/IGeneral';
import { AppConfetti } from './components/AppConfetti/AppConfetti';
import { Pages } from './components/Pages/Pages';

const App = () => {
  const dispatch = useAppDispatch();
  const {
    isLevelFinished,
    isGameFinished,
    isLoading,
  } = useAppSelector(state => state.levelsReducer);

  const savedLevel = localStorage.getItem("level");
  const trainingDone = localStorage.getItem("training");
  const savedTheme = localStorage.getItem("theme");
  const savedLanguage = localStorage.getItem("language") as Languages;

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

  React.useEffect(() => {
    updateData();
  }, [])

  if (isLoading) {
    return <Loader appLoader={true}/>
  }

  return (
    <>
      <Header />
      <AppConfetti />
      <Pages/>

      <Modal>
        {isGameFinished && <FinishedGame/>}
        {isLevelFinished && <FinishedLevel/>}
      </Modal>
    </>
  );
}

export default App;
