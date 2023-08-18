import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { Overlay } from './components/Overlay';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';
import { FinishedGame } from './components/FinishedGame/FinishedGame';

const App = () => {
  const { isLevelFinished, isGameFinished } = useAppSelector(state => state.levelsReducer);

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      {!isGameFinished && <Labyrinth/>}
      <Overlay />
      <Modal>
        <Wellcome/>
        {isLevelFinished && <FinishedLevel/>}
        {isGameFinished && <FinishedGame/>}
      </Modal>
    </div>
  );
}

export default App;
