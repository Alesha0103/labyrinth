import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { Overlay } from './components/Overlay';
import { Modal } from './components/Modal/Modal';
import { Wellcome } from './components/Wellcome/Wellcome';
import { useAppSelector } from './hooks/redux';
import { FinishedGame } from './components/FinishedGame/FinishedGame';

const App = () => {
  const { isGameFinished } = useAppSelector(state => state.levelsReducer);

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      <Labyrinth />
      <Overlay />
      <Modal>
        {isGameFinished ? <FinishedGame/> : <Wellcome/>}
      </Modal>
    </div>
  );
}

export default App;
