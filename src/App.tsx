import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { Overlay } from './components/Overlay';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppSelector } from './hooks/redux';
import { FinishedLevel } from './components/FinishedLevel/FinishedLevel';

const App = () => {
  const { isLevelFinished } = useAppSelector(state => state.levelsReducer);

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      <Labyrinth />
      <Overlay />
      <Modal>
        <Wellcome/>
        {isLevelFinished && <FinishedLevel/>}
      </Modal>
    </div>
  );
}

export default App;
