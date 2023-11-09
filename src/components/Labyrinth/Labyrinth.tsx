import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStages } from '../../store/actions/LevelsActions';

import './Labyrinth.scss';
import { Stage } from '../Stage/Stage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { NotifyOverlay } from '../NotifyOverlay/NotifyOverlay';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, error } = useAppSelector(state => state.levelsReducer);

  React.useEffect(() => {
    dispatch(fetchStages(level));
    localStorage.setItem("level", level.toString())
  }, [level]);

  if (error.active) {
    return <ErrorPage />
  }

  return (
    <React.Fragment>
      <h2>Level №{level}</h2>
      <Stage />
      <NotifyOverlay />
    </React.Fragment>
  )
}
