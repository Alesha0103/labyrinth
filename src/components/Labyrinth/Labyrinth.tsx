import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStages } from '../../store/actions/LevelsActions';

import './Labyrinth.scss';
import { Stage } from '../Stage/Stage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { NotifyOverlay } from '../NotifyOverlay/NotifyOverlay';
import { useTranslation } from '../../hooks/useTranslations';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, error } = useAppSelector(state => state.levelsReducer);

  const levelText = useTranslation("LEVEL");

  React.useEffect(() => {
    dispatch(fetchStages(level));
    localStorage.setItem("level", level.toString());
  }, [level]);

  if (error.active) {
    return <ErrorPage />
  }

  return (
    <>
      <h2>{levelText}{level}</h2>
      <Stage />
      <NotifyOverlay />
    </>
  )
}
