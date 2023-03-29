import React from 'react';
import './App.scss';
import { Labyrinth } from './components/Labyrinth';
import { LoserOverlay } from './components/LoserOverlay';

function App() {
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
