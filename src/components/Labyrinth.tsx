import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchLevel } from '../store/actions/LevelsActions';
import { Stage } from './Stage';

import './Labyrinth.scss';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, isLoading, error, winerOverlay } = useAppSelector(state => state.levelsReducer);
  const chosenCells = useAppSelector(state => state.cellsReducer.chosenCells);

  React.useEffect(() => {
    dispatch(fetchLevel(level));
  }, [winerOverlay])

  if (error) {
    return <h2>Error Page</h2>
  }
  
  if (!level || isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <React.Fragment>
      <h2>Level №{level}</h2>
      <Stage />
    </React.Fragment>
  )
}
