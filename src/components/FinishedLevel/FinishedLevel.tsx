import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { disableHints, finishLevelPopup } from '../../store/actions/LevelsActions';

import { setWarning } from '../../store/actions/CellsAction';
import { Warning } from '../../models/ICells';
import classNames from 'classnames';

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();
  const { blackTheme } = useAppSelector(state => state.levelsReducer);

  const onClickHandler = () => {
    dispatch(finishLevelPopup(false));
    dispatch(disableHints(false));
  }

  React.useEffect(() => {
    dispatch(disableHints(true));
    dispatch(setWarning(Warning.clear));
  }, [])

  return (
    <div className={classNames("finished-level-page", {"finished-level-black": blackTheme})}>
      <span>Congratulations!</span>
      <span>You have completed the level</span>
      <button onClick={onClickHandler}>Move to the next level</button>
    </div>
  )
}
