import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import './FinishedGame.scss';

export const FinishedGame = () => {
  console.log('FinishedGame is rendered');
  const { isGameFinished } = useAppSelector(state => state.levelsReducer);

  if (!isGameFinished) {
    return null;
  }

  return (
    <div className="finished-game-page">
    <span>Congratulations!</span>
    <span>You have escaped the Labyrinth</span>
  </div>
  )
}
