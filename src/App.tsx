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
      console.log("can not update level");
    }
  }

  React.useEffect(() => {
    updateDate();
  }, [])

  if (!isReady) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      {!isGameFinished && <Labyrinth/>}
      <Overlay />
      <Modal>
        {!isGameFinished && <Wellcome/>}
        {isLevelFinished && <FinishedLevel/>}
        {isGameFinished && <FinishedGame/>}
      </Modal>
    </div>
  );
}

export default App;
