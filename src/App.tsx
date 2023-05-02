import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { LoserOverlay } from './components/LoserOverlay';
import { defaultDataBase, getLevel, finishStage } from './services/TestLibrary';

const App = () => {
  // const activeLevel = getLevel(1);
  // finishStage(1);
  // console.log('activeLevel :>> ', activeLevel);
  
  // console.log('defaultDataBase :>> ', defaultDataBase);

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      <Labyrinth />
      <LoserOverlay />
    </div>
  );
}

export default App;
