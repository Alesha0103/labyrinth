import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { Overlay } from './components/Overlay';

const App = () => {

  return (
    <div className="App">
      <h1>
        Labyrinth
      </h1>
      <Labyrinth />
      <Overlay />
    </div>
  );
}

export default App;
