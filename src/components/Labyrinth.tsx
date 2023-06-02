import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchStages } from '../store/actions/LevelsActions';
import { Stage } from './Stage';

import './Labyrinth.scss';

export const Labyrinth = () => {
  const dispatch = useAppDispatch();
  const { level, isLoading, error } = useAppSelector(state => state.levelsReducer);

  React.useEffect(() => {
    dispatch(fetchStages());
  }, [level])

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
