import React from 'react'
import { useAppDispatch } from '../../hooks/redux';
import { finishLevelPopup } from '../../store/actions/LevelsActions';

import './FinishedLevel.scss'

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(finishLevelPopup(false));
  }

  return (
    <div className="finished-level-page">
      <span>Congratulations!</span>
      <span>You have completed the level</span>
      <button onClick={onClickHandler}>Move to the next level</button>
    </div>
  )
}
