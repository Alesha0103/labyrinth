import React from 'react'
import './FinishedGame.scss';
import { useTranslation } from '../../hooks/useTranslations';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import classNames from 'classnames';
import { finishGame, setActiveLevel, setDefaultDataBase } from '../../store/actions/LevelsActions';

export const FinishedGame = () => {
  const dispatch = useAppDispatch();

  const congratulations = useTranslation("CONGRATULATIONS");
  const finishGameText = useTranslation("FINISH_GAME_LABEL");
  const playText = useTranslation("PLAY_AGAIN");

  const { blackTheme } = useAppSelector(state => state.generalReducer);

  const onclickHandle = () => {
    dispatch(setDefaultDataBase());
    dispatch(setActiveLevel(1));
    dispatch(finishGame(false));
  }

  React.useEffect(() => {
    localStorage.removeItem("level");
  }, [])

  return (
    <div className={classNames("finished-game-page", {"finished-game__black": blackTheme})}>
      <span>{congratulations}</span>
      <span>{finishGameText}</span>
      <button onClick={onclickHandle}>{playText}</button>
    </div>
  )
}
