import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { disableHints, finishLevelPopup, setActiveLevel } from '../../store/actions/LevelsActions';

import { setWarning } from '../../store/actions/CellsAction';
import { Warning } from '../../models/ICells';
import classNames from 'classnames';
import { useTranslation } from '../../hooks/useTranslations';
import { setTrainingLevel } from '../../store/actions/GeneralActions';

export const FinishedLevel = () => {
  const dispatch = useAppDispatch();
  const { training, blackTheme } = useAppSelector(state => state.generalReducer);
  const { level } = useAppSelector(state => state.levelsReducer);

  const congratulations = useTranslation("CONGRATULATIONS");
  const completedLevelText = useTranslation("COMPLETED_LEVEL");
  const buttonText = useTranslation("NEXT_LEVEL");

  const onClickHandler = () => {
    dispatch(finishLevelPopup(false));
    dispatch(disableHints(false));
    dispatch(setTrainingLevel(false));
    dispatch(setActiveLevel(training? 1 : level+1));
  }

  React.useEffect(() => {
    dispatch(disableHints(true));
    dispatch(setWarning(Warning.CLEAR));
  }, [])

  return (
    <div className={classNames("finished-level-page", {"finished-level-black": blackTheme})}>
      <span>{congratulations}</span>
      <span>{completedLevelText}</span>
      <button onClick={onClickHandler}>{buttonText}</button>
    </div>
  )
}
