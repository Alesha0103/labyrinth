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

const App = () => {
  const [isReady, setReady] = React.useState(false);
  const dispatch = useAppDispatch();
  const { isLevelFinished, isGameFinished } = useAppSelector(state => state.levelsReducer);

  const savedLevel = localStorage.getItem("level");

  const updateDate = async() => {
    try {
      if(savedLevel) {
        dispatch(setActiveLevel(Number(savedLevel)));
        setReady(true);
        return;
      }
      await axios.put("http://localhost:5000/defaultDataBase");
      setReady(true);
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

  return (
    <>
      <div className="app-overlay"></div>
      <div className="App">
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
