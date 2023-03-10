import React from 'react';
import './App.scss';
// import { Labyrinth } from './components/Labyrinth';
import { Labyrinth2 } from './components/Labyrinth2';

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Labyrinth
        </h1>
      </header>
      {/* <Labyrinth /> */}
      <Labyrinth2 />
    </div>
  );
}

export default App;
