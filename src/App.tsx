import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth/Labyrinth';
import { Overlay } from './components/Overlay/Overlay';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';
import axios from 'axios';
import { setActiveLevel } from './store/actions/LevelsActions';
import { Loader } from './components/Loader/Loader';
import Confetti from "react-confetti";

const App = () => {
  const [isReady, setReady] = React.useState(false);
  const dispatch = useAppDispatch();
  const { isLevelFinished, isGameFinished } = useAppSelector(state => state.levelsReducer);

  const savedLevel = localStorage.getItem("level");

  const updateDate = async() => {
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
    return <Loader />
  }

  // TODO: модалку стейджа і завершення гри зробити зеленою для розуміння а також фон Арр в цілому

  return (
    <>
      <div className="app-overlay">
        {isGameFinished && <Confetti height={2000}/>}
      </div>
      <div className={isLevelFinished || isGameFinished ? "App winnerBg" : "App"}>
        <h1>
          Labyrinth
        </h1>
        {!isGameFinished ? <Labyrinth/> : <FinishedGame/>}
        <Overlay />
        <Modal>
          {!isGameFinished && <Wellcome/>}
          {isLevelFinished && <FinishedLevel/>}
        </Modal>
      </div>
    </>
  );
}

export default App;
