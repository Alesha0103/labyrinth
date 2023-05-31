import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { finishLevel, setActiveLevel } from '../../store/actions/LevelsActions';

import './FinishedLevel.scss'

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();
  const { level, isLevelFinished } = useAppSelector(state => state.levelsReducer);

  const onClickHandler = () => {
    dispatch(setActiveLevel(level+1));
    dispatch(finishLevel(false));
  }

  if(!isLevelFinished) {
    return null;
  }

  return (
    <div className="finished-level-page">
      <span>Congratulations!</span>
      <span>You have completed the level</span>
      <button onClick={onClickHandler}>Move to the next level</button>
    </div>
  )
}
