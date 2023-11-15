import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { disableHints, finishLevelPopup } from '../../store/actions/LevelsActions';

import { setWarning } from '../../store/actions/CellsAction';
import { Warning } from '../../models/ICells';
import classNames from 'classnames';
import { useTranslation } from '../../hooks/useTranslations';

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();
  const { blackTheme } = useAppSelector(state => state.levelsReducer);

  const congratulations = useTranslation("CONGRATULATIONS");
  const completedLevelText = useTranslation("COMPLETED_LEVEL");
  const buttonText = useTranslation("NEXT_LEVEL");

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
      <span>{congratulations}</span>
      <span>{completedLevelText}</span>
      <button onClick={onClickHandler}>{buttonText}</button>
    </div>
  )
}
