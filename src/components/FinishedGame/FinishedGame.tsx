import React from 'react'
import './FinishedGame.scss';

export const FinishedGame = () => {
  console.log('FinishedGame is rendered');

  return (
    <div className="finished-game-page">
    <span>Congratulations!</span>
    <span>You have escaped the Labyrinth</span>
  </div>
  )
}
