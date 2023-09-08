import React from 'react'
import { useAppDispatch } from '../../hooks/redux';
import { disableHints, finishLevelPopup } from '../../store/actions/LevelsActions';

import { setWarning } from '../../store/actions/CellsAction';
import { Warning } from '../../models/ICells';

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(finishLevelPopup(false));
    dispatch(disableHints(false));
  }

  React.useEffect(() => {
    dispatch(disableHints(true));
    dispatch(setWarning(Warning.clear));
  }, [])

  return (
    <div className="finished-level-page">
      <span>Congratulations!</span>
      <span>You have completed the level</span>
      <button onClick={onClickHandler}>Move to the next level</button>
    </div>
  )
}
