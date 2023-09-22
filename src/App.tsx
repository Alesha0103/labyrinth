import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth/Labyrinth';
import { NotifyOverlay } from './components/NotifyOverlay/NotifyOverlay';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';
import axios from 'axios';
import { setActiveLevel, setTheme } from './store/actions/LevelsActions';
import { Loader } from './components/Loader/Loader';
import Confetti from "react-confetti";
import classNames from 'classnames';
import { LOOSER_COLOR, WINNER_COLOR } from './constants';
import { ThemeButtons } from './components/ThemeButtons/ThemeButtons';

const App = () => {
  const [isReady, setReady] = React.useState(false);
  const dispatch = useAppDispatch();
  const { isLevelFinished, isGameFinished, blackTheme } = useAppSelector(state => state.levelsReducer);

  const savedLevel = localStorage.getItem("level");
  const savedTheme = localStorage.getItem("theme");

  const updateDate = async() => {
    if(savedTheme && savedTheme === "dark") {
      dispatch(setTheme(true));
    }
    try {
      if(savedLevel) {
        dispatch(setActiveLevel(Number(savedLevel)));
        setTimeout(() => {
          setReady(true);
        }, 1500);
        return;
      }
      await axios.put("http://localhost:5000/defaultDataBase");
      setTimeout(() => {
        setReady(true);
      }, 1500);
    } catch {
      console.log("Level wasn't updated");
    }
  }

  React.useEffect(() => {
    updateDate();
  }, [])

  if (!isReady) {
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
          Labyrinth
        </h1>
        {!isGameFinished ? <Labyrinth/> : <FinishedGame/>}
        <NotifyOverlay />
      </div>

      <ThemeButtons />

      <Modal>
          {!isGameFinished && <Wellcome/>}
          {isLevelFinished && <FinishedLevel/>}
        </Modal>
    </>
  );
}

export default App;
